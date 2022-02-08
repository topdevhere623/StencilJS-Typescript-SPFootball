import { Component, Host, h, State } from '@stencil/core';
import { Collection, createEntityRoute, envState, filter, LeagueService, Stadium } from 'ftb-models';
import LocationIcon from '../../assets/icons/location.svg';

@Component({
  tag: 'ffspb-stadiums-page',
  styleUrl: 'ffspb-stadiums-page.component.scss',
  shadow: false,
})
export class FfspbStadiumsPage {
  @State() stadiums: Collection<Stadium>;
  @State() mapCreated: boolean;

  async componentWillLoad() {
    const league = await new LeagueService().loadLeagueStadiums(544);
    this.stadiums = league.stadiums;
  }

  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <ffspb-header />
        <ffspb-content>
          <ffspb-content-inner>
            <h3 class="section-header">Стадионы</h3>
            <div class="grid">
              <ffspb-card ref={el => this.createMap(el)} class="map-card" />
              <ffspb-card class="stadiums-card">
                <ffspb-card-head>Список стадионов</ffspb-card-head>
                <ffspb-card-content>{this.renderStadiumsList()}</ffspb-card-content>
              </ffspb-card>
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

  renderStadiumsList() {
    let filtersOn = false;
    const filterFn = async (_, query: string) => {
      let items = this.stadiums.items;
      filtersOn = Boolean(query);
      if (!filtersOn) return items;
      return filter(items, query, ['name']);
    };

    return (
      <ftb-searchable-content
        items={this.stadiums.items}
        filterFn={filterFn}
        placeholder={'Поиск'}
        categories={[]}
        renderItems={items =>
          items.length ? <ftb-virtual-scroll items={items} renderItem={e => this.renderStadiumRow(e)} itemHeight={80} /> : <p class="nothing-found">Ничего не найдено</p>
        }
      />
    );
  }

  renderStadiumRow(s: Stadium) {
    return (
      <ion-router-link href={createEntityRoute(s)}>
        <div class="stadium-row">
          <ftb-stadium-photo stadium={s} />
          <div class="info">
            <div class="name">{s.name}</div>
            <div class="city">
              <ftb-icon svg={LocationIcon} class="location-icon" />
              {/*{s.league?.city?.name}*/}
              Санкт-Петербург
            </div>
          </div>
        </div>
      </ion-router-link>
    );
  }

  createMap(el: HTMLFfspbCardElement) {
    if (!this.mapCreated) {
      const ymaps = window['ymaps'];
      ymaps.ready(() => {
        const map = new ymaps.Map(el, {
          center: [59.934308, 30.340171],
          zoom: 9,
        });
        this.stadiums.items.forEach(s => {
          map.geoObjects.add(
            new ymaps.Placemark([s.lat, s.long], {
              balloonContent: `<a href="${createEntityRoute(s)}">${s.name}</a>`,
            }),
          );
        });
      });
    }
  }
}
