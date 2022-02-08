import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-content-inner',
  styleUrl: 'ffspb-content-inner.component.scss',
  shadow: false,
})
export class FfspbContentInner {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host class="desktop">
        <slot />
      </Host>
    );
  }

  renderMobile() {
    return (
      <Host class="mobile">
        <slot />
      </Host>
    );
  }
}
