import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-season-page',
  styleUrl: 'ffspb-season-page.component.scss',
  shadow: false,
})
export class FfspbSeasonPage {
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
