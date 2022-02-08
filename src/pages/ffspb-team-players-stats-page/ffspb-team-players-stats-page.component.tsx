import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-team-players-stats-page',
  styleUrl: 'ffspb-team-players-stats-page.component.scss',
  shadow: false,
})
export class FfspbTeamPlayersStatsPage {
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
