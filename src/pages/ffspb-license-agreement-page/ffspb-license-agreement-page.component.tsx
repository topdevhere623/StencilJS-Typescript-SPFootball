import { Component, Host, h, State } from '@stencil/core';
import { CookiePolicy, envState, Language, LicenseAgreementService } from 'ftb-models';

@Component({
  tag: 'ffspb-license-agreement-page',
  styleUrl: 'ffspb-license-agreement-page.component.scss',
  shadow: false,
})
export class FfspbLicenseAgreementPage {
  @State() agreement: CookiePolicy;
  @State() loading: boolean = true;

  componentWillLoad() {
    new LicenseAgreementService().loadLicenseAgreement(envState.appKey, Language.ru).then(agreement => {
      this.agreement = agreement;
      this.loading = false;
    });
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>{this.loading ? <fbw-page-loader /> : <ftb-license-agreement license={this.agreement} />}</ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderMobile() {
    return [
      <ffspb-header />,
      <ion-content>
        COOKIE POLICY
        <ffspb-footer />
      </ion-content>,
    ];
  }
}
