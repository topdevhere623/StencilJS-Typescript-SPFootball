import { Component, Host, h, Element } from '@stencil/core';
import { envState } from 'ftb-models';
import { AsyncSubject } from 'rxjs';
// import { fromEvent } from 'rxjs';
@Component({
  tag: 'ffspb-welcome-banners',
  styleUrl: 'ffspb-welcome-banners.component.scss',
  shadow: false,
})
export class FfspbWelcomeBanners {
  @Element() element;
  banners = [
    {
      title: 'Отдать ребёнка в футбол',
      text:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt\n' +
        '                  nostrud amet.',
      _id: 1,
    },
    {
      title: 'Стать тренером по футболу',
      text:
        ' Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt\n' +
        '                  nostrud amet.',
      _id: 2,
    },
    {
      title: 'Стать футбольным арбитром',
      text:
        ' Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt\n' +
        '                  nostrud amet.',
      _id: 3,
    },
    {
      title: 'Стать лидером массового футбола',
      text:
        ' Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt\n' +
        '                  nostrud amet.',
      _id: 4,
    },
    {
      title: 'Играть в футбол',
      text:
        ' Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt\n' +
        '                  nostrud amet.',
      _id: 5,
    },
  ];

  onDestroyed$ = new AsyncSubject();

  disconnectedCallback() {
    this.onDestroyed$.next(true);
    this.onDestroyed$.complete();
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <div class="desktop-wrapper">
          {this.banners.map((b, idx) => (
            <ffspb-welcome-banner bannerTitle={b.title} _id={b._id} text={b.text} mode={idx % 2 ? 'dark' : 'light'} />
          ))}
        </div>
      </Host>
    );
  }

  renderMobile() {
    return (
      <div class="mobile-wrapper">
        {this.banners.map((b, idx) => (
          <div class="swiper-slide">
            <ffspb-welcome-banner
              bannerTitle={b.title}
              _id={b._id}
              text={b.text}
              mode={idx % 2 ? 'dark' : 'light'}
              isFirstBanner={idx == 0}
              isLastBanner={idx == this.banners.length - 1}
            />
          </div>
        ))}
      </div>
    );
  }
}
