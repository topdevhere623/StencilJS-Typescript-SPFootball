import { Component, h, Host } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-card-head',
  styleUrl: 'ffspb-card-head.component.scss',
  shadow: false,
})
export class FfspbCardHead {
  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <slot />
      </Host>
    );
  }
}
