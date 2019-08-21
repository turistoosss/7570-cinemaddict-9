import {createElement} from "./utils";

export class Footer {
  constructor(filmsAmount) {
    this._filmsAmount = filmsAmount;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<footer class="footer">
              <section class="footer__logo logo logo--smaller">Cinemaddict</section>
              <section class="footer__statistics">
              <p>${this._filmsAmount} movies inside</p>
             </section>
           </footer>
`;
  }
}
