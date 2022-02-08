import { Component, h, Host, State } from '@stencil/core';
import { CookiePolicy, envState, Language, LicenseAgreementService } from 'ftb-models';

@Component({
  tag: 'ffspb-cookie-policy-page',
  styleUrl: 'ffspb-cookie-policy-page.component.scss',
  shadow: false,
})
export class FfspbCookiePolicyPage {
  @State() policy: CookiePolicy;
  @State() loading: boolean = true;

  componentWillLoad() {
    new LicenseAgreementService().loadCookiesPolicy(envState.appKey, Language.ru).then(policy => {
      this.policy = policy;
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
          <ffspb-content-inner>{this.loading ? <fbw-page-loader /> : <ftb-license-agreement license={this.policy} />}</ffspb-content-inner>
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
