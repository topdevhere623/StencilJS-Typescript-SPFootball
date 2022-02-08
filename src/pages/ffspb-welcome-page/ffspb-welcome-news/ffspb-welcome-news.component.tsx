import { Component, Host, h, Prop } from '@stencil/core';
import { createEntityRoute, envState, Post } from 'ftb-models';
import { routes } from '@src/utils/routes';
@Component({
  tag: 'ffspb-welcome-news',
  styleUrl: 'ffspb-welcome-news.component.scss',
  shadow: false,
})
export class FfspbWelcomeNews {
  @Prop() news: Post[];

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <div class="desktop-wrapper">
          <div class="block">
            <div class="block-inner">
              <h2>Новости</h2>
              <div class="news-lines grid">
                {this.news.map(post => (
                  <ffspb-card href={createEntityRoute(post)} class="post-card">
                    <ftb-post-photo post={post} mode="min" />
                    <div class="img-border" />
                    <div class="date">{post.date.format('DD MMMM YYYY')}</div>
                    <div class="title">{post.title}</div>
                    <div class="preview">{post.preview}</div>
                  </ffspb-card>
                ))}
              </div>
              <div class="button-line">
                <ffspb-button color="steel" href={routes.news}>
                  Все новости
                </ffspb-button>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

  renderMobile() {
    return (
      <Host>
        <div class="mobile-wrapper">
          <h2>Новости</h2>
          <div class="news-list">
            {this.news.slice(0, 3).map(p => (
              <div class="post">
                <ftb-improving-img sources={[`/assets/demo/img/news/${p._id}.png`]} />
                <div class="info">
                  <div class="date">30 сентября 2021</div>
                  <div class="title">{p.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div class="button-line">
            <button class="steel">Все новости</button>
          </div>
        </div>
      </Host>
    );
  }
}
