import { Component, h, State } from '@stencil/core';
// import Swiper from 'swiper';
import { menuController } from '@ionic/core';
import HeaderIcon from '../../../assets/icons/close.svg';
import ChevronIcon from '../../../assets/icons/chevron-down-outline.svg';
// import ArrowIcon from '../../../assets/icons/arrow-back.svg';
import dayjs from 'dayjs';
import { environment } from '@src/environments/environment';
import { routes } from '@src/utils/routes';

@Component({
  tag: 'ffspb-side-menu',
  styleUrl: 'ffspb-side-menu.component.scss',
  shadow: false,
})
export class FfspbSideMenu {
  @State() openMenuIdx: number = -1;
  @State() searchMode: boolean = false;
  menuEl: HTMLIonMenuElement;
  menuItems = [
    { title: 'Новости', link: routes.news },
    { title: 'Федерация', dropdowns: [{ title: 'О Федерации футбола', link: '' }] },
    {
      title: 'Судейство',
      link: routes.referees,
    },
    { title: 'Стадионы', link: routes.stadiums },
    { title: 'Информация', dropdowns: [{ title: 'Информация', link: '' }] },
    { title: 'Документы', link: routes.docs },
  ];

  lastOpenMenuIdx: number = -1;
  // swiper: Swiper;
  swiperRootEl: HTMLDivElement;

  componentDidLoad() {
    const menuInnerEl = this.menuEl.shadowRoot.querySelector('.menu-inner');
    if (menuInnerEl) {
      menuInnerEl['style']['transition'] = 'width 0.2s ease-in-out';
    }
    // if (!this.swiper && this.swiperRootEl) {
    //   console.log('here');
    //   this.swiper = new Swiper(this.swiperRootEl, {
    //     allowTouchMove: false,
    //   });
    // }
  }

  onMenuRowClick(menuRow, idx) {
    menuRow;
    idx;
    // if (menuRow.dropdowns) {
    //   this.openMenuIdx = idx;
    //   this.lastOpenMenuIdx = idx;
    //   this.swiper.slideTo(1);
    // }
  }
  //
  // onMenuClick() {
  //   console.log('clicked');
  //   // this.swiper.slideNext();
  //   this.swiper.slideNext();
  //   console.log('done');
  // }

  render() {
    return (
      <div class={this.searchMode ? 'search-on' : ''}>
        <ion-menu side="end" content-id="main-content" swipeGesture={false} ref={el => (this.menuEl = el)}>
          <ion-content>
            <div class="content">
              <div class="title-line">
                <div class="title">{this.searchMode ? 'ПОИСК' : 'МЕНЮ'}</div>
                <ion-button fill="clear" onClick={() => menuController.close()}>
                  <ftb-icon svg={HeaderIcon} />
                </ion-button>
              </div>
              <ion-searchbar placeholder="Поиск по сайту" mode="ios" class="searchbar" onIonFocus={() => (this.searchMode = true)} onIonBlur={() => (this.searchMode = false)} />
              {!this.searchMode ? (
                <div class="menu-list">
                  {this.menuItems.map((i, idx) => (
                    <div class="menu-line" onClick={() => this.onMenuRowClick(i, idx)}>
                      {i.title}
                      {i.dropdowns?.length ? <ftb-icon svg={ChevronIcon} /> : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div class="search-list">
                  <div class="description">Введите запрос, чтобы найти игроков, команды, турниры и игры.</div>
                </div>
              )}

              {/*<div class="swiper-container menu-slider" ref={el => (this.swiperRootEl = el)}>*/}
              {/*  <div class="swiper-wrapper">*/}
              {/*    <div class="swiper-slide">*/}
              {/*      {this.menuItems.map((i, idx) => (*/}
              {/*        <div class="menu-line" onClick={() => this.onMenuRowClick(i, idx)}>*/}
              {/*          {i.title}*/}
              {/*          {i.dropdowns?.length ? <ftb-icon svg={ChevronIcon} /> : null}*/}
              {/*        </div>*/}
              {/*      ))}*/}
              {/*    </div>*/}
              {/*    <div class="swiper-slide">*/}
              {/*      <div class="back-button-line">*/}
              {/*        <ion-button fill="clear" onClick={() => this.swiper.slidePrev()} class="slide-back-button">*/}
              {/*          <ftb-icon svg={ArrowIcon} />*/}
              {/*          МЕНЮ*/}
              {/*        </ion-button>*/}
              {/*      </div>*/}
              {/*      {this.menuItems[this.lastOpenMenuIdx]?.dropdowns.map(d => (*/}
              {/*        <div class="menu-line">{d.title}</div>*/}
              {/*      ))}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div class="bottom-info">
                <div class="version">Версия сайта: {environment.versionNumber}</div>
                <div class="version-date">Последнее обновление: {dayjs.unix(parseInt(environment.versionDate)).format('DD.MM.YYYY')}</div>
              </div>
            </div>
          </ion-content>
        </ion-menu>
      </div>
    );
  }
}
