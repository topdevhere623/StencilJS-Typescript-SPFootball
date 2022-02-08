import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-gane-page',
  styleUrl: 'ffspb-gane-page.component.scss',
  shadow: false,
})
export class FfspbGanePage {
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
