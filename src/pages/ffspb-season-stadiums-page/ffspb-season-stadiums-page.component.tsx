import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-season-stadiums-page',
  styleUrl: 'ffspb-season-stadiums-page.component.scss',
  shadow: false,
})
export class FfspbSeasonStadiumsPage {
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
