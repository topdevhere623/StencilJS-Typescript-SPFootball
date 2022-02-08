import { Component, h, Host, Prop, State } from '@stencil/core';
import { envState, Player, PlayerService } from 'ftb-models';

@Component({
  tag: 'ffspb-player-page',
  styleUrl: 'ffspb-player-page.component.scss',
  shadow: false,
})
export class FfspbPlayerPage {
  @Prop() playerId: number;
  @Prop() playerName: string;
  @State() player: Player;

  async componentWillLoad() {
    this.player = await new PlayerService().loadPlayerInfo(this.playerId);
  }

  render() {
    return (
      <Host class={envState.platform == 'web' ? 'desktop' : 'mobile'}>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>
            <h1 class="section-header">
              {this.player.firstName} {this.player.middleName} {this.player.lastName}
            </h1>
            <div class="grid">
              <ffspb-player-info class="info" player={this.player} />
              <ffspb-player-statics class="statics" player={this.player} />
              <ffspb-player-params class="params" player={this.player} />
              <ffspb-player-games class="games" player={this.player} />
              <ffspb-player-career class="career" player={this.player} />
            </div>
          </ffspb-content-inner>
          <ffspb-footer />
        </ffspb-content>
      </Host>
    );
  }
}
