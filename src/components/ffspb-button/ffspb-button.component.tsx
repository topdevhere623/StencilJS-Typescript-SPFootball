import { Component, h, Host, Prop } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-button',
  styleUrl: 'ffspb-button.component.scss',
  shadow: false,
})
export class FfspbButton {
  @Prop() color: 'steel' | 'black' | 'outline' = 'steel';
  @Prop() href?: string;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <button class={'ion-activatable ripple-parent ' + this.color}>
          <ion-router-link href={this.href}>
            <slot />
          </ion-router-link>
          <ion-ripple-effect />
        </button>
      </Host>
    );
  }
}
