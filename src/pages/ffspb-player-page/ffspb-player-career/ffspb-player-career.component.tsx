import { Component, h, Host, Prop } from '@stencil/core';
import { envState, Player } from 'ftb-models';
@Component({
  tag: 'ffspb-player-career',
  styleUrl: 'ffspb-player-career.component.scss',
  shadow: false,
})
export class FfspbPlayerCareer {
  @Prop() player: Player;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'mobile' : 'desktop'}>
        <ffspb-card>
          <ffspb-card-head>Карьера</ffspb-card-head>
          <ffspb-card-content>
            <table>
              <span class="head-year">2020</span>
              <tr>
                <th class="cell"></th>
                <th colSpan={2} class="head"></th>
                <th class="cell"></th>
              </tr>
              <tr>
                <th class="cell"></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th class="cell"></th>
                <th class="content main-team" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="text">Начал играть в <span class="title">ГОРНЫЙ УНИВЕРСИТЕТ</span></span>
                    </div>
                    <div class="details-main">
                      <span class="text">ИГРЫ - <span class="title">16</span></span>
                      <span class="text">ПЕРЕДАЧИ - <span class="title">30</span></span>
                      <span class="text">ГОЛЫ - <span class="title">41</span></span>
                    </div>
                  </div>
                </th>
                <th class="cell"></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th></th>
                <th class="content" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="title">Серия А - 2020</span>
                    </div>
                    <div class="details">
                      <span class="txt">ИГРЫ - 9</span>
                      <span class="txt">ПЕРЕДАЧИ - 18</span>
                      <span class="txt">ГОЛЫ - 18</span>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th></th>
                <th class="content" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="title">Champions League - 2020</span>
                    </div>
                    <div class="details">
                      <span class="txt">ИГРЫ - 7</span>
                      <span class="txt">ПЕРЕДАЧИ - 12</span>
                      <span class="txt">ГОЛЫ - 23</span>
                    </div>
                  </div>
                </th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th class="cell"></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th class="cell"></th>
                <th class="content main-team" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="text">Начал играть в <span class="title">ПЕТЕРБУРГ 04</span></span>
                    </div>
                    <div class="details-main">
                      <span class="text">ИГРЫ - <span class="title">25</span></span>
                      <span class="text">ПЕРЕДАЧИ - <span class="title">48</span></span>
                      <span class="text">ГОЛЫ - <span class="title">59</span></span>
                    </div>
                  </div>
                </th>
                <th class="cell"></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th></th>
                <th class="content" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="title">Серия А - 2020</span>
                    </div>
                    <div class="details">
                      <span class="txt">ИГРЫ - 9</span>
                      <span class="txt">ПЕРЕДАЧИ - 18</span>
                      <span class="txt">ГОЛЫ - 18</span>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th></th>
                <th class="content" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="title">Champions League - 2020</span>
                    </div>
                    <div class="details">
                      <span class="txt">ИГРЫ - 7</span>
                      <span class="txt">ПЕРЕДАЧИ - 12</span>
                      <span class="txt">ГОЛЫ - 23</span>
                    </div>
                  </div>
                </th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th class="right"></th>
                <th></th>
                <th class="content" rowspan={2}>
                  <div class="body">
                    <div class="team">
                      <span class="title">Серия А - 2020</span>
                    </div>
                    <div class="details">
                      <span class="txt">ИГРЫ - 9</span>
                      <span class="txt">ПЕРЕДАЧИ - 18</span>
                      <span class="txt">ГОЛЫ - 18</span>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th class="side-bar"></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th class="cell"></th>
                <th colSpan={2} class="footer"></th>
                <th class="cell"></th>
              </tr>
            </table>
          </ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }
}
