import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-game-page',
  styleUrl: 'ffspb-game-page.component.scss',
  shadow: false,
})
export class FfspbGamePage {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>GAME PAGE</ffspb-content-inner>
        </ffspb-content>
      </Host>
    );
  }

  renderMobile() {
    return <Host></Host>;
  }
}
