import { Component, h, Host } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-card-content',
  styleUrl: 'ffspb-card-content.component.scss',
  shadow: false,
})
export class FfspbCardContent {
  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <slot />
      </Host>
    );
  }
}
