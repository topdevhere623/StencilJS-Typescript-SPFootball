import { Component, Host, h } from '@stencil/core';
import { envState, Post } from 'ftb-models';
@Component({
  tag: 'ffspb-referees-training-page',
  styleUrl: 'ffspb-referees-training-page.component.scss',
  shadow: false,
})
export class FfspbRefereesTrainingPage {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host class="desktop">
        <ffspb-header />
        <ffspb-content>
          <ffspb-page-head>
            <div slot="head">РЕГИОНАЛЬНЫЙ ЦЕНТР ПОДГОТОВКИ СУДЕЙ И ИНСПЕКТОРОВ ФЕДЕРАЦИИ ФУТБОЛА САНКТ-ПЕТЕРБУРГА </div>
            <div slot="text" class="email">
              email:
              <a href="mailto:referee@ffspb.org" target="_blank">
                referee@ffspb.org
              </a>
            </div>
            <ffspb-button href="https://forms.gle/3mzrJp3M4XMuSPy67" slot="button">
              Подать заявку
            </ffspb-button>
          </ffspb-page-head>
          <ffspb-content-inner>
            <ftb-post-body post={new Post({ body: 'текст статьи' })}></ftb-post-body>
          </ffspb-content-inner>
        </ffspb-content>
      </Host>
    );
  }

  renderMobile() {
    return <Host></Host>;
  }
}
