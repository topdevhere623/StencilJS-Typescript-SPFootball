import { Component, h, Host, Prop } from '@stencil/core';
import { envState, Player } from 'ftb-models';
@Component({
  tag: 'ffspb-player-params',
  styleUrl: 'ffspb-player-params.component.scss',
  shadow: false,
})
export class FfspbPlayerParams {
  @Prop() player: Player;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-card class="params">
          <ffspb-card-head>Характеристики</ffspb-card-head>
          <ffspb-card-content>
            <table>
              <tr>
                <td>Возраст:</td>
                <td>
                  27 лет
                </td>
              </tr>
              <tr>
                <td>Гражданство:</td>
                <td>
                  Россия
                </td>
              </tr>
              <tr>
                <td>Статус:</td>
                <td>
                  Профессионал
                </td>
              </tr>
              <tr>
                <td>№ в РФС:</td>
                <td>
                  14525870
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>Рост:</td>
                <td>
                  170 см
                </td>
              </tr>
              <tr>
                <td>Вес:</td>
                <td>
                  70 кг
                </td>
              </tr>
              <tr>
                <td>Нога:</td>
                <td>
                  Правая
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </table>
          </ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }
}
