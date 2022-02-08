import { Component, Host, h } from '@stencil/core';
import { envState, filter, Player } from 'ftb-models';
import range from 'lodash-es/range';
import ArrowIcon from '../../assets/icons/arrow-back.svg';

@Component({
  tag: 'ffspb-components-demo-page',
  styleUrl: 'ffspb-components-demo-page.component.scss',
  shadow: false,
})
export class FfspbComponentsDemoPage {
  categoriesDemo = [
    {
      key: 'color',
      placeholder: 'поиск',
      filterFn: (query, options) => filter(options, query, ['text']),
      renderItem: i => i.text,
      options: [
        { key: 'all', text: 'первый' },
        { key: 'all', text: 'второй' },
      ],
    },
  ];

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>{this.renderElements()}</ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderElements() {
    return [
      <section>
        <h3 class="section-header">Заголовки</h3>
        <h1>H1 главный заголовок</h1>
        <h2>H2 дополнительный банер</h2>
        <h3>H3 заголовок раздела</h3>
      </section>,
      <section>
        <h3 class="section-header">Кнопки</h3>
        <ffspb-button color="steel">Стальная кнопка</ffspb-button>
        <ffspb-button color="black" onClick={() => console.log('im clicked')}>
          Чёрная кнопка
        </ffspb-button>
        <ffspb-button color="outline" href={'/'}>
          Прозрачная кнопка
        </ffspb-button>
        <ffspb-switch
          options={[
            { key: 'referees', text: 'Судьи' },
            { key: 'inspectors', text: 'Инспекторы' },
          ]}
        />
      </section>,
      <section>
        <h3 class="section-header">Контент с поиском</h3>
        <ftb-searchable-content
          items={[]}
          filterFn={async () => []}
          renderItems={() => (
            <div class="grid top-grid">
              {range(3).map(() => (
                <ffspb-card href={'/'} class="player-card">
                  <ffspb-card-head>
                    Карточка игрока
                    <ftb-icon svg={ArrowIcon} class="arrow-icon" />
                  </ffspb-card-head>
                  <ffspb-card-content>
                    <ftb-player-photo player={new Player({ _id: 1 })} />
                    <table>
                      <tbody>
                        <tr>
                          <td>Фамилия:</td>
                          <td>Иванов</td>
                        </tr>
                        <tr>
                          <td>Имя:</td>
                          <td>Иван</td>
                        </tr>
                        <tr>
                          <td>Отчество:</td>
                          <td>Иванович</td>
                        </tr>
                      </tbody>
                    </table>
                  </ffspb-card-content>
                </ffspb-card>
              ))}
            </div>
          )}
          categories={this.categoriesDemo}
          placeholder={'Search'}
          debounce={1000}
        />
      </section>,
      <section>
        <h3 class="section-header">Контент в карточках</h3>,
        <div class="grid bottom-grid">
          <ffspb-card>
            <ffspb-card-head>Карточка с таблицей</ffspb-card-head>
            <ffspb-card-content>
              <table>
                <tbody>
                  <tr>
                    <td>Цвет:</td>
                    <td>Чёрный</td>
                  </tr>
                  <tr>
                    <td>Город:</td>
                    <td>Санкт-Петербург</td>
                  </tr>
                  <tr>
                    <td>Животное:</td>
                    <td>Пёс</td>
                  </tr>
                </tbody>
              </table>
            </ffspb-card-content>
          </ffspb-card>
          <ffspb-card>
            <ffspb-card-head>Карточка с поиском</ffspb-card-head>
            <ffspb-card-content>
              <ftb-searchable-content
                items={[]}
                filterFn={async () => []}
                renderItems={() => <ftb-virtual-scroll items={range(30)} itemHeight={50} renderItem={i => <div class="item">{i}</div>} />}
                categories={this.categoriesDemo}
                placeholder={'Search'}
                debounce={1000}
              />
            </ffspb-card-content>
          </ffspb-card>
        </div>
      </section>,
    ];
  }
}
