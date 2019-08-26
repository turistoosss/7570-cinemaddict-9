import {AbstractComponent} from "./absctract-component";

export class Footer extends AbstractComponent {
  constructor(filmsAmount) {
    super();
    this._filmsAmount = filmsAmount;
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
