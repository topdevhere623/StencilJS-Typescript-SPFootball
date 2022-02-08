import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { AsyncSubject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { envState } from 'ftb-models';
@Component({
  tag: 'ffspb-welcome-banner',
  styleUrl: 'ffspb-welcome-banner.component.scss',
  shadow: false,
})
export class FfspbWelcomeBanner {
  @Prop() _id!: number;
  @Prop() bannerTitle!: string;
  @Prop() text!: string;
  @Prop() mode: 'light' | 'dark';
  @Prop() isFirstBanner: boolean;
  @Prop() isLastBanner: boolean;
  @State() percentReleased = 100; // how much of an element was scrolled in for the first time. Required for appearance animation
  @State() scrollStartPosition: number; // checking for scroll gestures to adjust scroll position to top of the banner
  onDestroyed$ = new AsyncSubject();
  @Element() element;

  componentWillLoad() {
    function getViewportSize() {
      const object = 'innerWidth' in window ? window : document.documentElement || document.body;
      const prefix = 'innerWidth' in window ? 'inner' : 'client';
      return { width: object[prefix + 'Width'], height: object[prefix + 'Height'] };
    }

    const desktopContent = this.element.closest('.ffspb-content__desktop-wrapper');
    if (desktopContent) {
      fromEvent(desktopContent, 'scroll')
        .pipe(takeUntil(this.onDestroyed$))
        .subscribe(() => {
          const { top, height: elHeight } = this.element.getBoundingClientRect();
          const { height: wpHeight } = getViewportSize();
          const visibleHeight = wpHeight - top;
          const visiblePercent = (visibleHeight / elHeight) * 100;
          this.percentReleased = Math.min(Math.max(this.percentReleased, visiblePercent), 100);
        });
    }

    const content = this.element.closest('ion-content');
    if (content) {
      content.scrollEvents = true;
      const HEADER_HEIGHT = 56;
      fromEvent(content, 'ionScrollStart')
        .pipe(takeUntil(this.onDestroyed$))
        .subscribe(() => {
          const { top } = this.element.getBoundingClientRect();
          this.scrollStartPosition = top;
        });

      fromEvent(content, 'ionScrollEnd')
        .pipe(takeUntil(this.onDestroyed$))
        .subscribe(() => {
          const { top, height } = this.element.getBoundingClientRect();
          if (top < this.scrollStartPosition) {
            const scrollThreshold = this.isFirstBanner ? height / 2 : height - HEADER_HEIGHT;
            //scrolling down
            if (top < scrollThreshold && top > HEADER_HEIGHT) {
              content.scrollByPoint(0, top - HEADER_HEIGHT, top < height / 2 ? 200 : 300);
            } else if (top < HEADER_HEIGHT * 2 && top > -HEADER_HEIGHT && this.scrollStartPosition > HEADER_HEIGHT) {
              content.scrollByPoint(0, top - HEADER_HEIGHT, 200);
            }
          } else {
            // const scrollThreshold = this.isLastBanner ? height / 2 : height - 20;
            //
            // if (top < HEADER_HEIGHT && top > HEADER_HEIGHT - scrollThreshold) {
            //   content.scrollByPoint(0, top - HEADER_HEIGHT, top < scrollThreshold / 2 ? 200 : 300);
            // } else if (top > HEADER_HEIGHT && this.scrollStartPosition > HEADER_HEIGHT && top > 2 * HEADER_HEIGHT) {
            //   content.scrollByPoint(0, HEADER_HEIGHT - top, 200);
            // }
          }
        });
    }
  }

  componentDidLoad() {
    this.percentReleased = 0; // this code won't run if JS is disabled.
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
        <div class="banner-wrapper">
          <div class={'banner ' + this.mode} style={{ opacity: this.percentReleased / 100 + '' }}>
            <div class="side">
              <span class="content">
                <h3>{this.bannerTitle}</h3>
                <div class="text">{this.text}</div>
                <button class={this.mode == 'dark' ? 'steel' : 'black'}>Подробнее</button>
              </span>
            </div>
            <div class="side">
              <img src={`/assets/demo/img/banners/${this._id}.jpg`} />
            </div>
          </div>
        </div>
      </Host>
    );
  }

  renderMobile() {
    return (
      <Host>
        <div class={'banner ' + this.mode}>
          <div class="side  img-side">
            <img src={`/assets/demo/img/banners/${this._id}.jpg`} />
          </div>
          <div class="side text-side">
            <span class="content">
              <h3>{this.bannerTitle}</h3>
              <div class="text">{this.text}</div>
              <button class={this.mode == 'dark' ? 'steel' : 'black'}>Подробнее</button>
            </span>
          </div>
        </div>
      </Host>
    );
  }
}
