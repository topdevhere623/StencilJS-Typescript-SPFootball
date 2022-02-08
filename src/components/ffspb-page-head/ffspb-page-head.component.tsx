import { Component, h, Host } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-page-head',
  styleUrl: 'ffspb-page-head.component.scss',
  shadow: false,
})
export class FfspbPageHead {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host class="desktop">
        <div class="content">
          <div class="content-inner">
            <h3 class="head-wrapper">
              <slot name="head" />
            </h3>
            <div class="text-wrapper">
              <slot name="text" />
            </div>
            <div class="button-wrapper">
              <slot name="button" />
            </div>
          </div>
        </div>
        <div class="img-wrapper">
          <slot name="img" />
        </div>
      </Host>
    );
  }

  renderMobile() {
    return (
      <Host class="mobile">
        <div class="img-wrapper">
          <slot name="img" />
        </div>
        <div class="content-wrapper">
          <div class="head-wrapper">
            <slot name="head" />
          </div>
          <p class="text-wrapper">
            <slot name="text" />
          </p>
          <div class="button-wrapper">
            <slot name="button" />
          </div>
        </div>
      </Host>
    );
  }
}
