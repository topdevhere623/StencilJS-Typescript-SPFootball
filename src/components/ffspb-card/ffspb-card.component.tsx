import { Component, h, Host, Prop } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-card',
  styleUrl: 'ffspb-card.component.scss',
  shadow: false,
})
export class FfspbButton {
  @Prop() href?: string;

  render() {
    return (
      <Host class={(envState.platform == 'web' ? 'desktop' : 'mobile') + ' ' + (this.href ? 'link' : '')}>
        <ion-router-link href={this.href}>
          <slot />
        </ion-router-link>
      </Host>
    );
  }
}
