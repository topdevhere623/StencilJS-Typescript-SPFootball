import { Component, Host, h, State } from '@stencil/core';
import ChevronIcon from '../../assets/icons/chevron-down.svg';
import SearchIcon from '../../assets/icons/search.svg';
// import FfspbLogo from '../../assets/icons/ffspb-logo.svg';
import { envState } from 'ftb-models';
import { AsyncSubject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { routes } from '@src/utils/routes';

@Component({
  tag: 'ffspb-header',
  styleUrl: 'ffspb-header.component.scss',
  shadow: false,
})
export class FfspbHeader {
  @State() searchOpen: boolean = false;
  @State() openMenuIdx: number = -1;
  lastOpenMenuIdx: number = -1;
  searchEl: HTMLInputElement;
  onDestroyed$ = new AsyncSubject();

  menuItems = [
    { title: 'Новости', link: routes.news, dropdowns: [] },
    { title: 'Федерация', dropdowns: [{ title: 'О Федерации футбола', link: '' }] },
    {
      title: 'Судейство',
      link: routes.referees,
    },
    { title: 'Стадионы', link: routes.stadiums },
    { title: 'Информация', dropdowns: [{ title: 'Информация', link: '' }] },
    { title: 'Документы', link: routes.docs },
  ];

  componentWillLoad() {
    fromEvent(window, 'click')
      .pipe(takeUntil(this.onDestroyed$))
      .subscribe(() => (this.openMenuIdx = -1));
  }

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
          <div class="logo-wrapper">
            <div class="left-margin" />
            {/*<ftb-icon svg={FfspbLogo} class="main-logo" title="Футбол Петербурга" />*/}
            <ion-router-link href={'/'}>
              <img src="/assets/img/logo-silver.png" class="main-logo" />
            </ion-router-link>

            {/*<div class="logo-text">*/}
            {/*  <div>Футбол</div>*/}
            {/*  <div>Петербурга</div>*/}
            {/*</div>*/}
          </div>

          <div class={'menu' + (this.searchOpen ? ' hidden' : '')}>
            {this.menuItems.map((i, idx) => (
              <a class={'menu-item' + (this.openMenuIdx == idx ? ' open' : '')} href={i.link} onClick={e => i.dropdowns?.length && this.toggleMenu(idx, e)}>
                {i.title}
                {!i.dropdowns?.length
                  ? null
                  : [
                      <ftb-icon svg={ChevronIcon} />,
                      // <div class="dropdown">
                      //   {i.dropdowns.map(d => (
                      //     <a class="dropdown-item" href={d.link}>
                      //       {d.title}
                      //     </a>
                      //   ))}
                      // </div>,
                    ]}
              </a>
            ))}
          </div>
          {this.renderMenuDropdown()}

          <div class={'searchbar' + (this.searchOpen ? ' open' : '')} onClick={() => this.openSearchbar()}>
            <ftb-icon svg={SearchIcon} class="search-icon" />
            <input
              placeholder="Поиск (игроки, команды, турниры, поля)"
              onBlur={() => (this.searchOpen = false)}
              ref={el => (this.searchEl = el)}
              onKeyDown={e => this.onSearchKeyDown(e)}
            />
          </div>
        </div>
      </Host>
    );
  }

  renderMenuDropdown() {
    return (
      <div class="menu-dropdown">
        <div class={'menu-dropdown__content' + (this.openMenuIdx > -1 ? ' open' : '')}>
          {this.menuItems[this.lastOpenMenuIdx] ? (
            <div class="dropdown-column">
              {this.menuItems[this.lastOpenMenuIdx]?.dropdowns.map(d => (
                <a class="dropdown-item" href={d.link}>
                  {d.title}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  onSearchKeyDown(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.searchOpen = false;
    }
  }

  toggleMenu(idx: number, e: MouseEvent) {
    if (this.openMenuIdx == idx) {
      this.openMenuIdx = -1;
    } else if (this.openMenuIdx != -1) {
      this.openMenuIdx = -1;
      setTimeout(() => {
        this.openMenuIdx = idx;
        this.lastOpenMenuIdx = idx;
      }, 250);
    } else {
      this.openMenuIdx = idx;
      this.lastOpenMenuIdx = idx;
    }
    e.stopPropagation();
  }

  openSearchbar() {
    this.searchOpen = true;
    setTimeout(() => this.searchEl.focus(), 300);
  }

  renderMobile() {
    return (
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            {/*<ftb-icon svg={FfspbLogo} class="main-logo" />*/}
            <img src="/assets/img/ffspb-logo.png" class="main-logo" />
          </ion-buttons>

          {/*<ion-buttons slot="start">*/}
          {/*  <ion-menu-button />*/}
          {/*  <ion-back-button />*/}
          {/*</ion-buttons>*/}
          <ion-title>
            <span class="title">Футбол Петербурга</span>
          </ion-title>

          <ion-buttons slot="end">
            <ion-menu-button slot="end"></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    );
  }
}
