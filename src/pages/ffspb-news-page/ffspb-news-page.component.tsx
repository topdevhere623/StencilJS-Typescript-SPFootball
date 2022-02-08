import { Component, Host, h, State } from '@stencil/core';
import { Collection, createEntityRoute, envState, NewsService, Post, Tag } from 'ftb-models';
import orderBy from 'lodash-es/orderBy';

@Component({
  tag: 'ffspb-news-page',
  styleUrl: 'ffspb-news-page.component.scss',
  shadow: false,
})
export class FfspbNewsPage {
  @State() news: Collection<Post>;
  @State() loadingMoreNews = false;

  async componentWillLoad() {
    this.news = await this.loadNews(0, 11);
  }

  async loadNews(offset: number = 0, limit: number = 10) {
    const tags = [new Tag({ key: 'FFSPB' })];
    const news = await new NewsService().loadArticles(tags, offset, limit);
    news.items = orderBy(news.items, ['date'], ['desc']);
    return news;
  }

  async loadMoreNews() {
    this.loadingMoreNews = true;
    try {
      const news = await this.loadNews(this.news.items.length);
      this.news.items.push(...news.items);
    } finally {
      this.loadingMoreNews = false;
    }
  }

  render() {
    const firstPost = this.news.items[0];

    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-header />
        <ffspb-content>
          <ffspb-page-head>
            <div slot="head">{firstPost.title}</div>
            <div slot="text">{firstPost.preview}</div>
            <ffspb-button color="steel" href={createEntityRoute(firstPost)} slot="button">
              Подробнее
            </ffspb-button>
            <ftb-post-photo post={firstPost} mode="max" slot="img" />
          </ffspb-page-head>

          <h3 class="section-header">Последние новости</h3>

          <ffspb-content-inner>
            <ftb-searchable-content
              items={this.news.items}
              key={JSON.stringify(this.news.items)}
              filterFn={(items, query) => this.searchContent(items, query)}
              placeholder="Поиск по заголовку или тексту новоти"
              categories={[]}
              renderItems={items =>
                items.length ? (
                  [<div class="tiles-container grid">{items.map(i => this.renderRow(i))}</div>, this.renderMoreButton()]
                ) : (
                  <p class="nothing-found">Ничего не найдено</p>
                )
              }
            />
          </ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderRow(post: Post) {
    if (envState.platform == 'web') {
      return (
        <ffspb-card href={createEntityRoute(post)} class="post-card">
          <ftb-post-photo post={post} mode="min" />
          <div class="img-border" />
          <div class="date">{post.date.format('DD MMMM YYYY')}</div>
          <div class="title">{post.title}</div>
          <div class="preview">{post.preview}</div>
        </ffspb-card>
      );
    } else {
      return <div>row</div>;
    }
  }

  renderMoreButton() {
    if (this.news.items.length == this.news.total) return null;
    if (this.loadingMoreNews) {
      return <ftb-spinner class="load-more-spinner" />;
    }

    return (
      <ffspb-button color="steel" class="load-more-button" onClick={() => this.loadMoreNews()}>
        Загрузить ещё
      </ffspb-button>
    );
  }

  async searchContent(_, query) {
    if (!query) return this.news.items.slice(1);

    return [];
  }
}
