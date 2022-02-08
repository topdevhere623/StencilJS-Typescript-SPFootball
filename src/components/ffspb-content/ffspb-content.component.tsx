import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-content',
  styleUrl: 'ffspb-content.component.scss',
  shadow: false,
})
export class FfspbContent {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <div class="ffspb-content__desktop-wrapper">
          <slot />
        </div>
      </Host>
    );
  }

  renderMobile() {
    return (
      <ion-content scrollEvents={true}>
        <slot />
      </ion-content>
    );
  }
}
