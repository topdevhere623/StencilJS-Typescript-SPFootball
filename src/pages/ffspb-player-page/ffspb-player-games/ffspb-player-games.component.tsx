import { Component, h, Host, Prop } from '@stencil/core';
import { envState, Player } from 'ftb-models';
import ArrowForwardIcon from '../../../assets/icons/arrow-back.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
@Component({
  tag: 'ffspb-player-games',
  styleUrl: 'ffspb-player-games.component.scss',
  shadow: false,
})
export class FfspbPlayerGames {
  @Prop() player: Player;

  games = [
    {
      date: '28.11.2021 Вс',
      time: '10:00',
      team1: 'Горный университет',
      team2: 'Кредо-Транс-д',
      score1: 7,
      score2: 2,
      g: 'x 1',
      p: 'x 2',
      type: 'Студенты. Футбол. Кубок. Мужчины',
    },
    {
      date: '14.10.2021 Пн',
      time: '15:00',
      team1: 'ГУМРФ',
      team2: 'Петербург 04',
      score1: 3,
      score2: 1,
      g: 'x 2',
      p: 'x 3',
      type: 'Студенты. Футбол. Кубок. Женщины',
    },
    {
      date: '30.09.2021 Ср',
      time: '18:00',
      team1: 'ВКА им. Можа',
      team2: 'Нейтрон',
      score1: 4,
      score2: 3,
      g: 'x 2',
      p: 'x 1',
      type: 'Студенты. Футбол. Кубок. Мужчины',
    },
  ];

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'mobile' : 'desktop'}>
        <ffspb-card>
          <ffspb-card-head>
            Матчи
            <a>
              Смотреть все
              <ftb-icon svg={ArrowForwardIcon} class="arrow-icon" />
            </a>
          </ffspb-card-head>
          <ffspb-card-content>
          {this.games.map((game) => {
            return (
            <div class="match">
              <div class="game-header">
                <div class="game-date">
                  <ftb-icon svg={CalendarIcon} />
                  <span>
                    {game.date}
                  </span>
                </div>
                <span class="game-time">
                  {game.time}
                </span>
              </div>
              <div class="game-content">
                <div class="game-teams">
                  <div class="game-team">
                    <ftb-team-logo team={this.player.teams[0]}/>
                    <span>
                      {game.team1}
                    </span>
                  </div>
                  <div class="game-team">
                    <ftb-team-logo team={this.player.teams[0]}/>
                    <span>
                    {game.team2}
                    </span>
                  </div>
                </div>
                <div class="game-result">
                  <div class="game-score">
                    {game.score1}
                    <hr />
                    {game.score2}
                  </div>
                  <div class="game-detail">
                    <div>
                      <h4 class="goals">Г</h4>
                      <h4>{game.g}</h4>
                    </div>
                    <div>
                      <h4 class="goals">П</h4>
                      <h4>{game.p}</h4>
                    </div>
                    <div class="card">
                      <div class="red-card"/>
                      <div class="yellow-card"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="game-footer">
                <div class="game-type">
                  {game.type}
                </div>
              </div>
            </div>
            )
          })}
          </ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }
}
