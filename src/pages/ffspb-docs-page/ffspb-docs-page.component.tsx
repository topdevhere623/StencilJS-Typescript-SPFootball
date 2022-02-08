import { Component, Host, h, State } from '@stencil/core';
import { Document, envState, filter } from 'ftb-models';
import DocIcon from '../../assets/icons/doc-doc.svg';
import XlsIcon from '../../assets/icons/doc-xls.svg';
import PdfIcon from '../../assets/icons/doc-pdf.svg';
import { AppClientService } from 'ftb-models/dist/services/app-client.service';
import sortBy from 'lodash-es/sortBy';
import uniqBy from 'lodash-es/uniqBy';

@Component({
  tag: 'ffspb-docs-page',
  styleUrl: 'ffspb-docs-page.component.scss',
  shadow: false,
})
export class FfspbDocsPage {
  @State() documents: Document[];

  async componentWillLoad() {
    this.documents = sortBy((await new AppClientService().loadClientDocuments('FFSPB')).documents, 'sortIdx');
  }

  defineCategories(documents: Document[]) {
    const categoriesMap = {};
    documents.forEach(d => {
      categoriesMap[d.category] ??= [];
      categoriesMap[d.category].push(d);
    });
    return Object.values(categoriesMap);
  }

  render() {
    const categories = [
      {
        key: 'category',
        placeholder: 'Поиск',
        filterFn: (query, options) => filter(options, query, ['text']),
        renderItem: i => i.text,
        options: [
          { text: 'Все категории' },
          ...uniqBy(
            this.documents.map(d => ({ text: d.category, key: d.category })),
            'text',
          ),
        ],
      },
      {
        key: 'league',
        placeholder: 'Поиск',
        filterFn: (query, options) => filter(options, query, ['text']),
        renderItem: i => i.text,
        options: [
          { text: 'Все соревнования' },
          ...uniqBy(
            this.documents.map(d => ({ text: d.league.name.slice(6), key: d.league._id })),
            'text',
          ),
        ],
      },
    ];

    const filterFn = async (items, query, categories) => {
      const category = categories.find(c => c.key === 'category')?.options.find(o => o.selected)?.key;
      if (category && category !== 'all') {
        items = items.filter(d => d.category == category);
      }
      const leagueId = categories.find(c => c.key === 'league')?.options.find(o => o.selected)?.key;
      if (leagueId && leagueId !== 'all') {
        items = items.filter(d => d.league._id == leagueId);
      }
      items = filter(items, query, ['title']);
      return this.defineCategories(items);
    };

    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>
            <h3 class="section-header">Документы</h3>
            <ffspb-card>
              <ffspb-card-content>
                <ftb-searchable-content
                  items={this.documents}
                  filterFn={filterFn}
                  renderItems={items => (items.length ? this.renderItems(items) : <p class="nothing-found">Ничего не найдено</p>)}
                  placeholder="Поиск по документам"
                  categories={categories}
                />
              </ffspb-card-content>
            </ffspb-card>
          </ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderItems(items) {
    const iconsMap = { doc: DocIcon, docx: DocIcon, xls: XlsIcon, xlsx: XlsIcon, pdf: PdfIcon };
    const result = [];
    items.forEach(cat => {
      cat[0].category && result.push(<div class="head">{cat[0].category}</div>);
      result.push(
        ...cat.map(doc => (
          <a class="document-row" href={`${envState.apiHost}/files/${doc.title}_${doc._id}.${doc.extension}`} download={doc.title} target="_blank">
            <ftb-icon svg={iconsMap[doc.extension]} />
            <div class="title">{doc.title}</div>
          </a>
        )),
      );
    });
    return result;
  }
}
