import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-welcome-tournaments',
  styleUrl: 'ffspb-welcome-tournaments.component.scss',
  shadow: false,
})
export class FfspbWelcomeTournaments {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-card>
          <ffspb-card-content>
            <div class="card-contents">
              <img class="left" src="/assets/demo/img/tournaments/0.jpg" />
              <div class="center">
                <div class="text">
                  <h3>Турнирная статистика</h3>
                  <div class="description">Для тех, кто хочет обладать всей информацией о прошедших и предстояших турнирах</div>
                </div>
                <div class="button-row">
                  <ffspb-button color="outline">Посмотреть</ffspb-button>
                </div>
              </div>
              <img class="right" src="/assets/demo/img/tournaments/1.jpg" />
            </div>
          </ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }

  renderMobile() {
    return (
      <div class="mobile-wrapper">
        <div class="tournaments-card">
          <img src="/assets/demo/img/tournaments/2.jpg" />
          <div class="center">
            <h3>Турнирная статистика</h3>
            <div class="description">Для тех, кто хочет обладать всей информацией о прошедших и предстояших турнирах</div>
            <div class="button-row">
              <ffspb-button color="outline">Посмотреть</ffspb-button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
