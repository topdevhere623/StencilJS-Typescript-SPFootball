import { Component, h, Host, Prop } from '@stencil/core';
import { envState, Player } from 'ftb-models';

@Component({
  tag: 'ffspb-player-statics',
  styleUrl: 'ffspb-player-statics.component.scss',
  shadow: false,
})
export class FfspbPlayerStatics {
  @Prop() player: Player;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-card>
          <ffspb-card-head>Статистика</ffspb-card-head>
          <ffspb-card-content>
            <table>
              <tr>
                <td>Игры:</td>
                <td>
                  51
                </td>
              </tr>
              <tr>
                <td>Передачи:</td>
                <td>
                  55
                </td>
              </tr>
              <tr>
                <td>Голы:</td>
                <td>
                  88
                </td>
              </tr>
              <tr>
                <td>Карточки:</td>
                <td class="cards">
                  <div class="card">
                    <div class="cd yellow-card"></div>
                    5
                  </div>
                  <div class="card">
                    <div class="cd red-card"></div>
                    1
                  </div>
                </td>
              </tr>
            </table>
            <div class="percent-col">
              Процент побед
            </div>
            <div class="percent">
              <span class="bar">
                <p>%<br />62</p>
              </span>
            </div>
          </ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }
}
