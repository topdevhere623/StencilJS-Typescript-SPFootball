import { Component, Host, h, State, Prop } from '@stencil/core';
import { createEntityRoute, envState, GraphqlClient, NewsTiles, Post } from 'ftb-models';
import FbIcon from '../../assets/icons/footer-fb.svg';
import IgIcon from '../../assets/icons/footer-ig.svg';
import VkIcon from '../../assets/icons/footer-vk.svg';
import TwitterIcon from '../../assets/icons/footer-twitter.svg';

@Component({
  tag: 'ffspb-post-page',
  styleUrl: 'ffspb-post-page.component.scss',
  shadow: false,
})
export class FfspbPostPage {
  @Prop() postId: number;
  @Prop({ mutable: true }) postTitle: string;
  @State() post: Post;

  async componentWillLoad() {
    this.postTitle = decodeURIComponent(this.postTitle);
    this.post = new Post(
      (
        await new GraphqlClient().load(
          `Post(_id: ${this.postId}) {
        ${NewsTiles.info},
        preview
        ${NewsTiles.relatedPosts}
      }`,
          'post-info',
        )
      )['Post'],
    );
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-header />
        <ffspb-content>
          <ffspb-page-head>
            <ftb-post-photo post={this.post} mode="max" slot="img" />
            <div slot="head">{this.post.title}</div>
            <div slot="text">{this.post.preview}</div>
          </ffspb-page-head>

          <ffspb-content-inner>
            <div class="date">{this.post.date.format('DD MMMM YYYY')}</div>
            <ftb-post-body post={this.post} />

            <div class="share">
              Поделиться
              <ftb-icon svg={FbIcon} />
              <ftb-icon svg={IgIcon} />
              <ftb-icon svg={TwitterIcon} class="twitter-icon" />
              <ftb-icon svg={VkIcon} class="vk-icon" />
            </div>

            <h3 class="section-header">Рекомендуем</h3>
            <div class="related-posts">
              {this.post.relatedPosts
                .filter(p => p._id != this.post._id)
                .slice(0, 4)
                .map(post => (
                  <ffspb-card href={createEntityRoute(post)} class="post-card">
                    <ftb-post-photo post={post} mode="min" />
                    <div class="img-border" />
                    <div class="date">{post.date.format('DD MMMM YYYY')}</div>
                    <div class="title">{post.title}</div>
                    <div class="preview">{post.preview}</div>
                  </ffspb-card>
                ))}
            </div>
          </ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }

  renderMobile() {
    return <Host></Host>;
  }
}
