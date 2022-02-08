import { Component, Host, h, Prop, State } from '@stencil/core';
import { envState, Player } from 'ftb-models';
@Component({
  tag: 'ffspb-player-games-page',
  styleUrl: 'ffspb-player-games-page.component.scss',
  shadow: false,
})
export class FfspbPlayerGamesPage {
  @Prop() playerId: number;
  @Prop() playerName: string;
  @State() player: Player;

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'mobile' : 'desktop'}>
        <ffspb-card>
          <ffspb-card-header>Последние матчи</ffspb-card-header>
          <ffspb-card-content></ffspb-card-content>
        </ffspb-card>
      </Host>
    );
  }
}
