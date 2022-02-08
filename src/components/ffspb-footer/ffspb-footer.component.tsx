import { Component, Host, h } from '@stencil/core';
import CopyrightIcon from '../../assets/icons/copyright.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import GoogleIcon from '../../assets/icons/google-play-colored.svg';
import EmailIcon from '../../assets/icons/footer-email.svg';
import TwitterIcon from '../../assets/icons/footer-twitter.svg';
import IgIcon from '../../assets/icons/footer-ig.svg';
import FbIcon from '../../assets/icons/footer-fb.svg';
import VkIcon from '../../assets/icons/footer-vk.svg';
import { envState } from 'ftb-models';
import { routes } from '@src/utils/routes';

@Component({
  tag: 'ffspb-footer',
  styleUrl: 'ffspb-footer.component.scss',
  shadow: false,
})
export class FfspbFooter {
  render() {
    return envState.platform == 'web' ? this.renderDesktop() : this.renderMobile();
  }

  renderDesktop() {
    return (
      <Host>
        <div class="desktop-wrapper">
          <div class="footer-content">
            <div class="columns">
              <div class="column">
                <h4>Контакты</h4>
                <h5>Федерация футбола Санкт-Петербурга</h5>
                <a class="line" href="tel:+78123692431">
                  +7 (812) 369 24 31
                </a>
                <a class="line" href="mailto: ffspb@mail.ru" target="_blank">
                  ffspb@mail.ru
                </a>
              </div>
              <div class="column">
                <h4>Ссылки</h4>
                <a class="line">Календарный план соревнований</a>
                <ion-router-link href={routes.healthcheck} class="line">
                  Задать вопрос в техподдержку
                </ion-router-link>
                <ion-router-link class="line" href={routes.cookie_policy}>
                  Политика Cookies
                </ion-router-link>
                <ion-router-link class="line" href={routes.license_agreement}>
                  Пользовательское соглашение
                </ion-router-link>
              </div>
              <div class="column">
                <h4>Приложения</h4>
                <div class="stores">
                  <a class="store">
                    <ftb-icon svg={AppleIcon} class="apple-icon" />
                    <div class="text">
                      <div class="download-link">загрузите в</div>
                      <div class="store-link">App Store</div>
                    </div>
                  </a>
                  <a class="store">
                    <ftb-icon svg={GoogleIcon} class="google-icon" />
                    <div class="text">
                      <div class="download-link">загрузите в</div>
                      <div class="store-link">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="column">
                <div class="socials">
                  <a href="">
                    <ftb-icon svg={FbIcon} />
                  </a>
                  <a href="">
                    <ftb-icon svg={IgIcon} />
                  </a>
                  <a href="">
                    <ftb-icon svg={VkIcon} class="vk-icon" />
                  </a>
                  <a href="">
                    <ftb-icon svg={TwitterIcon} />
                  </a>
                </div>
                <h4>Рассылка</h4>
                <a class="line">
                  <ftb-icon svg={EmailIcon} />
                  Подписаться на новости
                </a>
              </div>
            </div>

            <div class="copyright-line">
              <ftb-icon svg={CopyrightIcon} />
              Федерация Футбола Санкт-Петербурга
            </div>
          </div>
        </div>
      </Host>
    );
  }

  renderMobile() {
    return (
      <div class="mobile-wrapper">
        <div class="side">
          <div class="column">
            <h4>Контакты</h4>
            <h5>Федерация футбола Санкт-Петербурга</h5>
            <a class="line" href="tel:+78123692431">
              +7 (812) 369 24 31
            </a>
            <a class="line" href="mailto: ffspb@mail.ru" target="_blank">
              ffspb@mail.ru
            </a>
          </div>
          <div class="column">
            <h4>Ссылки</h4>
            <a class="line">Календарный план соревнований</a>
            <a class="line">Задать вопрос в техподдержку</a>
            <a class="line" href={routes.cookie_policy}>
              Политика Cookie
            </a>
            <a class="line" href={routes.license_agreement}>
              Пользовательское соглашение
            </a>
          </div>
        </div>
        <div class="side">
          <div class="column">
            <h4>Рассылка</h4>
            <a class="line">
              <ftb-icon svg={EmailIcon} />
              Подписаться на новости
            </a>
          </div>
          <div class="column">
            <h4>Соцсети</h4>
            <div class="socials">
              <a href="">
                <ftb-icon svg={FbIcon} />
              </a>
              <a href="">
                <ftb-icon svg={IgIcon} />
              </a>
              <a href="">
                <ftb-icon svg={VkIcon} class="vk-icon" />
              </a>
              <a href="">
                <ftb-icon svg={TwitterIcon} />
              </a>
            </div>
          </div>

          <div class="column">
            <h4>Приложения</h4>
            <div class="stores">
              <a class="store">
                <ftb-icon svg={AppleIcon} class="apple-icon" />
                <div class="text">
                  <div class="download-link">загрузите в</div>
                  <div class="store-link">App Store</div>
                </div>
              </a>
              <a class="store">
                <ftb-icon svg={GoogleIcon} class="google-icon" />
                <div class="text">
                  <div class="download-link">загрузите в</div>
                  <div class="store-link">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="copyright-line">
          <ftb-icon svg={CopyrightIcon} />
          Федерация Футбола Санкт-Петербурга
        </div>
      </div>
    );
  }
}
