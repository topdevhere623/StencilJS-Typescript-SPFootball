import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-team-games-page',
  styleUrl: 'ffspb-team-games-page.component.scss',
  shadow: false,
})
export class FfspbTeamGamesPage {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return <Host></Host>;
  }

  renderMobile() {
    return <Host></Host>;
  }
}
