import { Component, Host, h, State } from '@stencil/core';
import { envState } from 'ftb-models';
import { AsyncSubject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swiper, { Pagination } from 'swiper';
Swiper.use([Pagination]);

@Component({
  tag: 'ffspb-welcome-materials',
  styleUrl: 'ffspb-welcome-materials.component.scss',
  shadow: false,
})
export class FfspbWelcomeMaterials {
  @State() selectedIdx = 0;
  autoSlideDisabled$ = new AsyncSubject<boolean>();
  swiper: Swiper;
  swiperRootEl: HTMLDivElement;

  materials = [
    {
      _id: 1,
      title: 'Приём заявок на участие в соревнованиях по футболу',
      description: 'Заявки принимаются на Зимнее Первенство среди мужских и молодежных команд, а также на Зимние Первенства среди юношеских команд 2006, 2007 и 2008 г.р.',
    },
    { _id: 2, title: 'Второй заголовок', description: 'Второй подзаголовок' },
    { _id: 3, title: 'Третий заголовок', description: 'Третий подзаголовок' },
    { _id: 4, title: 'Четвёртый заголовок', description: 'Четвёртый подзаголовок' },
  ];

  componentWillLoad() {
    interval(10000)
      .pipe(takeUntil(this.autoSlideDisabled$))
      .subscribe(() => {
        this.selectedIdx = this.selectedIdx == this.materials.length - 1 ? 0 : this.selectedIdx + 1;
      });
  }

  componentDidRender() {
    if (!this.swiper && this.swiperRootEl) {
      const autoSlideDisabled$ = this.autoSlideDisabled$;
      this.swiper ??= new Swiper(this.swiperRootEl, {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (_, className) => `<button class="${className}"><div class="underscore"/></button>`,
        },
        onAny(eventName) {
          if ('slideChange' == eventName + '') {
            autoSlideDisabled$.next(true);
            autoSlideDisabled$.complete();
          }
        },
        loop: true,
      });
    }
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  selectPart(idx: number) {
    this.autoSlideDisabled$.next(true);
    this.autoSlideDisabled$.complete();
    this.selectedIdx = idx;
  }

  renderDesktop() {
    return (
      <Host>
        <div class="ffspb-welcome-materials__desktop-wrapper">
          <div class="block">
            <div class="block-inner">
              <div class="materials-swiper-container">
                <div class="materials-swiper">
                  {this.materials.map((m, idx) => (
                    <div class={'part ' + (idx == this.selectedIdx ? ' selected' : '')} onClick={() => this.selectPart(idx)}>
                      <div class="part-inner">
                        <ftb-improving-img
                          sources={[`/assets/demo/img/materials/${idx}-micro.jpg`, `/assets/demo/img/materials/${idx}-min.jpg`, `/assets/demo/img/materials/${idx}-big.jpg`]}
                        />
                        <div class="title">
                          <div class="text">
                            <h3>{m.title}</h3>
                            <div class="description">{m.description}</div>
                            <ffspb-button color="outline">Подробнее</ffspb-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
          <div class="swiper-container" ref={el => (this.swiperRootEl = el)}>
            <div class="swiper-wrapper">
              {this.materials.map((m, idx) => (
                <div class="swiper-slide">
                  <img src={`/assets/demo/img/materials/${idx}-micro.jpg`} />
                  {/*<ftb-improving-img*/}
                  {/*  key={'improving' + idx}*/}
                  {/*  sources={[`/assets/demo/img/materials/${idx}-micro.jpg`, `/assets/demo/img/materials/${idx}-min.jpg`, `/assets/demo/img/materials/${idx}-big.jpg`]}*/}
                  {/*/>*/}
                  <div class="title">
                    <h3>{m.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </Host>
    );
  }

  slideLeft() {
    this.selectedIdx = this.selectedIdx == 0 ? this.materials.length - 1 : this.selectedIdx - 1;
    this.autoSlideDisabled$.next(true);
    this.autoSlideDisabled$.complete();
  }

  slideRight() {
    this.selectedIdx = this.selectedIdx == this.materials.length - 1 ? 0 : this.selectedIdx + 1;
    this.autoSlideDisabled$.next(true);
    this.autoSlideDisabled$.complete();
  }
}
