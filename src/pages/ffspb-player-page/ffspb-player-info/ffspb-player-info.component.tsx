import { Component, h, Host, Prop } from '@stencil/core';
import { envState, Player } from 'ftb-models';
import ChevronIcon from '../../../assets/icons/chevron-down.svg';
@Component({
  tag: 'ffspb-player-info',
  styleUrl: 'ffspb-player-info.component.scss',
  shadow: false,
})
export class FfspbPlayerInfo {
  @Prop() player: Player;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-card>
          <ffspb-card-head>Информация</ffspb-card-head>
          <ffspb-card-content class="person-card">
            <ftb-player-photo player={this.player} />
            <table>
              <tr>
                <td>Лига:</td>
                <td>
                  <a class="menu-item">
                    AFL Moscow 8x8
                    <ftb-icon svg={ChevronIcon} />
                  </a>
                </td>
                <td class="num">
                  3
                </td>
              </tr>
              <tr>
                <td>Позиция:</td>
                <td colSpan={2}>Нападающий</td>
              </tr>
              <tr class="team">
                <td>Команды:</td>
                <td>
                  <a class="menu-item">
                    <ftb-team-logo team={this.player.teams[0]}/>
                      Горный университет
                    <ftb-icon class="arrow" svg={ChevronIcon} />
                  </a>
                </td>
                <td class="num">
                  5
                </td>
              </tr>
            </table>
          </ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }
}
