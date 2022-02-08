import { Component, h } from '@stencil/core';
import { routes } from '@src/utils/routes';
import { envState, Language, userState } from 'ftb-models';
import { environment } from '@src/environments/environment';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { fromEvent } from 'rxjs';

@Component({
  tag: 'ffspb-root',
  styleUrl: 'ffspb-root.component.scss',
  shadow: false,
})
export class ffspbRoot {
  componentWillLoad() {
    dayjs.locale('ru');
    userState.language = Language.ru;

    console.log(environment);
    envState.apiHost = environment.apiHost;
    envState.graphqlHost = environment.graphqlHost;
    envState.imgHost = environment.imgHost;

    function getViewportSize() {
      const object = 'innerWidth' in window ? window : document.documentElement || document.body;
      const prefix = 'innerWidth' in window ? 'inner' : 'client';
      return { width: object[prefix + 'Width'], height: object[prefix + 'Height'] };
    }

    const setVariables = () => {
      envState.platform = getViewportSize().width > 800 ? 'web' : 'ios';
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    fromEvent(window, 'resize').subscribe(() => setVariables());
    setVariables();
  }

  render() {
    return (
      <ion-app class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-side-menu />

        <div class="ion-page" id="main-content">
          <ion-router useHash={false}>
            <ion-route url={routes.home} component="ffspb-welcome-page" />
            <ion-route url={routes.license_agreement} component="ffspb-license-agreement-page" />
            <ion-route url={routes.cookie_policy} component="ffspb-cookie-policy-page" />
            <ion-route url={routes.healthcheck} component="ffspb-healthcheck-page" />

            <ion-route url={routes.team} component="ffspb-team-page" />
            <ion-route url={routes.team_games} component="ffspb-team-games-page" />
            <ion-route url={routes.team_players_stats} component="ffspb-team-players-stats-page" />
            <ion-route url={routes.team_transfers} component="ffspb-team-transfers-page" />

            <ion-route url={routes.player} component="ffspb-player-page" />
            <ion-route url={routes.player_games} component="ffspb-player-games-page" />

            <ion-route url={routes.season} component="ffspb-season-page" />
            <ion-route url={routes.season_calendar} component="ffspb-season-calendar-page" />
            <ion-route url={routes.season_players} component="ffspb-season-players-page" />
            <ion-route url={routes.season_stadiums} component="ffspb-season-stadiums-page" />
            <ion-route url={routes.season_staff} component="ffspb-season-staff-page" />

            <ion-route url={routes.stadiums} component="ffspb-stadiums-page" />
            <ion-route url={routes.stadium} component="ffspb-stadium-page" />

            <ion-route url={routes.referees} component="ffspb-referees-page" />
            <ion-route url={routes.referees_training} component="ffspb-referees-training-page" />
            <ion-route url={routes.referee} component="ffspb-referee-page" />

            <ion-route url={routes.game} component="ffspb-game-page" />

            <ion-route url={routes.news} component="ffspb-news-page" />
            <ion-route url={routes.post} component="ffspb-post-page" />

            <ion-route url={routes.docs} component="ffspb-docs-page" />

            <ion-route url={routes.demo} component="ffspb-components-demo-page" />
          </ion-router>
          <ion-nav animated={false} />
        </div>
      </ion-app>
    );
  }
}
