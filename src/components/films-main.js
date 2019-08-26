import {AbstractComponent} from "./absctract-component";

export class FilmsMain extends AbstractComponent {
  getTemplate() {

    return `<section class="films-list">
                <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>     
                 <div class="films-list__container films-main"></div>
            </section>

`;
  }
}
