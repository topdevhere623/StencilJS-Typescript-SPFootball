import { Component, h, Host, Prop, State } from '@stencil/core';
import { envState, PersonService, RoleLevel, User, filter, Game, createEntityRoute } from 'ftb-models';
import { getAgePluralForm } from '@src/utils/plural-form';
import CalendarIcon from '../../assets/icons/calendar.svg';
import groupBy from 'lodash-es/groupBy';

@Component({
  tag: 'ffspb-referee-page',
  styleUrl: 'ffspb-referee-page.component.scss',
  shadow: false,
})
export class FfspbRefereePage {
  @Prop() refereeId: number;
  @Prop({ mutable: true }) refereeName: string;
  @State() referee: User;

  async componentWillLoad() {
    this.refereeName = decodeURIComponent(this.refereeName);
    const service = new PersonService();
    this.referee = await service.loadPersonGames(this.refereeId);
    console.log(this.referee.games.items[0]);
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host class="desktop">
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>
            <h3 class="section-header">{this.referee.name}</h3>
            <div class="grid">
              <div class="column left">
                <ffspb-card>
                  <ffspb-card-head>Информация</ffspb-card-head>
                  <ffspb-card-content class="person-card">
                    <ftb-user-photo user={this.referee} />
                    <table>
                      <tbody>
                        <tr>
                          <td>Город:</td>
                          <td>{this.referee.city}</td>
                        </tr>
                        <tr>
                          <td>Возраст:</td>
                          <td>{this.referee.birthday ? this.referee.getAge() + ' ' + getAgePluralForm(this.referee.getAge()) : '--'}</td>
                        </tr>
                        <tr>
                          <td>Статус:</td>
                          <td>
                            {this.referee.roles.some(r => r.level == RoleLevel.referee) ? 'Судья' : ''}
                            {this.referee.roles.some(r => r.level == RoleLevel.referee) && this.referee.roles.some(r => r.level == RoleLevel.inspector) ? ', ' : ''}
                            {this.referee.roles.some(r => r.level == RoleLevel.inspector) ? 'Инспектор' : ''}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </ffspb-card-content>
                </ffspb-card>
                <ffspb-card>
                  <ffspb-card-head>Статистика</ffspb-card-head>
                  <ffspb-card-content>
                    <table>
                      <tbody>
                        <tr>
                          <td>Всего игр:</td>
                          <td>{this.referee.games.total}</td>
                        </tr>
                        {Object.values(groupBy(this.referee.games.items, g => g.season.league._id)).map((games: Game[]) => (
                          <tr>
                            <td>{games[0].season.league.name}:</td>
                            <td>{games.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ffspb-card-content>
                </ffspb-card>
              </div>
              <div class="column right">
                <div class="card games-card">
                  <div class="card-head">Игры</div>
                  <div class="card-content">{this.renderGames()}</div>
                </div>
              </div>
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

  renderGames() {
    let filtersOn = false;
    const filterFn = async (_, query: string) => {
      let items = this.referee.games.items;
      filtersOn = Boolean(query);
      if (!filtersOn) return items;
      return filter(items, query, ['home.team.name', 'home.team.shortName', 'away.team.name', 'away.team.shortName']);
    };

    const categories = [];

    return (
      <ftb-searchable-content
        items={this.referee.games.items}
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
