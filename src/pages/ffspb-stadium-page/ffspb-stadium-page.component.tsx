import { Component, Host, h, Prop, State } from '@stencil/core';
import { createEntityRoute, envState, filter, Game, Stadium, StadiumService } from 'ftb-models';
import CalendarIcon from '../../assets/icons/calendar.svg';
@Component({
  tag: 'ffspb-stadium-page',
  styleUrl: 'ffspb-stadium-page.component.scss',
  shadow: false,
})
export class FfspbStadiumPage {
  @Prop() stadiumId: number;
  @State() stadium: Stadium;
  @State() mapCreated: boolean;

  async componentWillLoad() {
    const service = new StadiumService();
    this.stadium = await service.loadStadiumInfo(this.stadiumId);
    service.loadAllStadiumGames(this.stadiumId).then(s => {
      this.stadium.games = s.games;
    });
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>
            <h3 class="section-header">{this.stadium.name}</h3>
            <div class="grid">
              <ffspb-card class="info-card">
                <ffspb-card-head>Информация</ffspb-card-head>
                <ffspb-card-content>
                  <ftb-stadium-photo stadium={this.stadium} />
                  <table>
                    <tr>
                      <td class="title">Город:</td>
                      <td class="value">Санкт-Петербург</td>
                    </tr>
                    <tr>
                      <td class="title">Адрес:</td>
                      <td class="value">{this.stadium.address}</td>
                    </tr>
                    <tr>
                      <td class="title">Размер поля:</td>
                      <td class="value">{this.stadium.pitchSize}</td>
                    </tr>
                    <tr>
                      <td class="title">Покрытие:</td>
                      <td class="value">{this.stadium.pitchCover}</td>
                    </tr>
                    <tr>
                      <td class="title">Вместимость:</td>
                      <td class="value">{this.stadium.capacity}</td>
                    </tr>
                  </table>
                </ffspb-card-content>
              </ffspb-card>
              <ffspb-card ref={el => this.createMap(el)} />

              <ffspb-card>
                <ffspb-card-head>Клубы</ffspb-card-head>
                <ffspb-card-content>
                  <p class="nothing-found">Пока ни один клуб не указал стадион домашней ареной</p>
                </ffspb-card-content>
              </ffspb-card>

              <ffspb-card class="games-card">
                <ffspb-card-head>Матчи</ffspb-card-head>
                <ffspb-card-content>{this.renderStadiumGames()}</ffspb-card-content>
              </ffspb-card>
            </div>
          </ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderMobile() {
    return <Host></Host>;
  }

  createMap(el: HTMLFfspbCardElement) {
    if (!this.mapCreated) {
      const ymaps = window['ymaps'];
      ymaps.ready(() => {
        const map = new ymaps.Map(el, {
          center: [this.stadium.lat, this.stadium.long],
          zoom: 9,
        });
        map.geoObjects.add(
          new ymaps.Placemark([this.stadium.lat, this.stadium.long], {
            balloonContent: this.stadium.address,
          }),
        );
        this.mapCreated = true;
      });
    }
  }

  renderStadiumGames() {
    let filtersOn = false;

    const filterFn = async (_, query: string) => {
      let items = this.stadium.games.items;
      const pitchId = categories.find(c => c.key === 'pitch')?.options.find(o => o.selected)?.key;
      if (pitchId !== 'all') {
        items = items.filter(g => g.pitch?._id == pitchId);
      }
      filtersOn = Boolean(query);
      if (!filtersOn) return items;
      return filter(items, query, ['home.team.name', 'home.team.shortName', 'away.team.name', 'away.team.shortName']);
    };

    const categories = [];
    if (this.stadium.pitches?.length > 1) {
      categories.push(
        ...[
          {
            key: 'pitch',
            placeholder: 'Поиск',
            filterFn: (query, options) => filter(options, query, ['text']),
            renderItem: i => i.text,
            options: [
              { key: 'all', text: 'Все поля' },
              ...this.stadium.pitches.map(p => ({
                key: p._id,
                text: p.name,
              })),
            ],
          },
        ],
      );
    }

    return (
      <ftb-searchable-content
        items={this.stadium.games.items}
        filterFn={filterFn}
        placeholder={'Поиск по играм'}
        categories={categories}
        renderItems={items =>
          items.length ? <ftb-virtual-scroll items={items} renderItem={e => this.renderGameRow(e)} itemHeight={80} /> : <p class="nothing-found">Ничего не найдено</p>
        }
      />
    );
  }

  renderGameRow(game: Game) {
    return (
      <ion-router-link class="game" href={createEntityRoute(game)}>
        <div class="game-row">
          <div class="date-time-champ">
            <div class="date-time">
              <div class="date">
                <ftb-icon svg={CalendarIcon} />
                {game.date?.format('DD.MMM.YYYY ddd')}
              </div>
              <div class="time">{game.date?.format('HH:mm')}</div>
            </div>
            <div class="champ">
              {game.champ.name} - {game.season.name}
            </div>
          </div>

          <div class="teams">
            <div class="name">
              {game.home.team.name}
              <ftb-team-logo team={game.home.team} />
            </div>
            <div class="score-wrapper">
              <ftb-game-side-score game={game} side={game.home} />
              <div class="delimiter">-</div>
              <ftb-game-side-score game={game} side={game.away} />
            </div>
            <div class="name">
              <ftb-team-logo team={game.away.team} />
              {game.away.team.name}
            </div>
          </div>
        </div>
      </ion-router-link>
    );
  }
}
