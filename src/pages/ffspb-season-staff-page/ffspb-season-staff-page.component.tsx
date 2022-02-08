import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-season-staff-page',
  styleUrl: 'ffspb-season-staff-page.component.scss',
  shadow: false,
})
export class FfspbSeasonStaffPage {
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
