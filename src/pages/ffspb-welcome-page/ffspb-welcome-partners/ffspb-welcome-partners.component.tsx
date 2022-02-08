import { Component, Host, h } from '@stencil/core';
import { envState } from 'ftb-models';
import Swiper from 'swiper';

@Component({
  tag: 'ffspb-welcome-partners',
  styleUrl: 'ffspb-welcome-partners.component.scss',
  shadow: false,
})
export class FfspbWelcomePartners {
  partners = [
    { link: 'https://kfis.gov.spb.ru/', _id: 1, title: 'Комитет по физической культуре и спорту' },
    { link: 'https://www.radiozenit.ru/', _id: 2, title: 'Радио Зенит' },
    { link: 'https://rfs.ru/', _id: 3, title: 'Российский футбольный союз' },
  ];
  swiper: Swiper;
  swiperRootEl: HTMLDivElement;

  componentDidRender() {
    if (!this.swiper && this.swiperRootEl) {
      this.swiper ??= new Swiper(this.swiperRootEl, {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
      });
      setInterval(() => {
        this.swiper.slideNext();
      }, 3000);
    }
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    const partners = [];
    while (partners.length < 24) {
      partners.push(...this.partners);
    }

    return (
      <Host>
        <div class="desktop-wrapper">
          <div class="block">
            <div class="block-inner">
              <h2>Партнёры</h2>
            </div>
          </div>

          <div class="partners-line swiper-container" ref={el => (this.swiperRootEl = el)}>
            <div class="swiper-wrapper">
              {partners.map(p => (
                <a href={p.link} title={p.title} class="partner swiper-slide">
                  <img src={`/assets/demo/img/partners/${p._id}.png`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }

  renderMobile() {
    const partners = this.partners;

    return (
      <Host>
        <div class="mobile-wrapper">
          <h2>Партнёры</h2>

          <div class="partners-line">
            {partners.map(p => (
              <a href={p.link} title={p.title} class="partner">
                <img src={`/assets/demo/img/partners/${p._id}.png`} />
              </a>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
