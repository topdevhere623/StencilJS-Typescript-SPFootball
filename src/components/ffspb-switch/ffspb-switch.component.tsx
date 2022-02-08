import { Component, Host, h, Prop, State, Element, Event, EventEmitter } from '@stencil/core';
import { envState } from 'ftb-models';

@Component({
  tag: 'ffspb-switch',
  styleUrl: 'ffspb-switch.component.scss',
  shadow: false,
})
export class FfspbSwitch {
  @Prop() options!: [{ key: string; text: string }, { key: string; text: string }];
  @Event() selected: EventEmitter<{ key: string; text: string }>;
  @State() currentIdx = 0;
  @State() firstRenderComplete = false;
  @State() togglerShift = -1000;
  @Element() el;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <div class="toggler" style={{ transform: `translateX(${this.togglerShift}px)` }} />
        <button onClick={() => this.onClick(0)} class={{ selected: this.currentIdx == 0 }}>
          {this.options[0].text}
        </button>
        <button onClick={() => this.onClick(1)} class={{ selected: this.currentIdx == 1 }}>
          {this.options[1].text}
        </button>
      </Host>
    );
  }

  componentDidLoad() {
    const checkSize = () => {
      const buttons = Array.from(this.el.querySelectorAll('button'));
      const buttonsWidths = buttons.map(b => b['offsetWidth']);
      if (!buttonsWidths[0]) {
        return requestAnimationFrame(checkSize);
      } else {
        if (this.currentIdx == 0) {
          this.togglerShift = -1 * buttonsWidths[1];
        } else {
          this.togglerShift = buttonsWidths[0];
        }
      }
    };
    checkSize();
  }

  componentWillRender() {
    const buttons = Array.from(this.el.querySelectorAll('button'));
    const buttonsWidths = buttons.map(b => b['offsetWidth']);
    if (this.currentIdx == 0) {
      this.togglerShift = -1 * buttonsWidths[1];
    } else {
      this.togglerShift = buttonsWidths[0];
    }
    if (buttonsWidths[0]) {
      setTimeout(() => {
        this.el.classList.add('adjusted');
      }, 300);
    }
  }

  onClick(idx: number) {
    this.currentIdx = idx;
    this.selected.emit(this.options[this.currentIdx]);
  }
}
