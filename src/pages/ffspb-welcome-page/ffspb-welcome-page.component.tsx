import { Component, Host, h, State } from '@stencil/core';
import { envState, NewsService, Post, Tag } from 'ftb-models';
import orderBy from 'lodash-es/orderBy';

@Component({
  tag: 'ffspb-welcome-page',
  styleUrl: 'ffspb-welcome-page.component.scss',
  shadow: false,
})
export class FfspbWelcomePage {
  @State() news: Post[];

  async componentWillLoad() {
    await this.loadNews();
  }

  async loadNews() {
    const tags = [new Tag({ key: 'FFSPB' })];
    const news = await new NewsService().loadArticles(tags, 0, 3);
    this.news = orderBy(news.items, ['date'], ['desc']);
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-header />
        <ffspb-content>
          <ffspb-welcome-materials />
          <ffspb-welcome-news news={this.news} />
          <ffspb-welcome-tournaments />
          <ffspb-welcome-banners />
          <ffspb-welcome-partners />
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderMobile() {
    return [
      <ffspb-header />,
      <ion-content>
        <ffspb-welcome-materials />
        <ffspb-welcome-news />
        <ffspb-welcome-tournaments />
        <ffspb-welcome-banners />
        <ffspb-welcome-partners />
        <ffspb-footer />
      </ion-content>,
    ];
  }
}
