import {AbstractComponent} from "./absctract-component";

export class MainSort extends AbstractComponent {

  getTemplate() {
    return `<ul class="sort">
                <li><a href="#" class="sort__button sort__button--active" data-sort-type="by-default">Sort by default</a></li>
                <li><a href="#" class="sort__button" data-sort-type="by-date">Sort by date</a></li>
                <li><a href="#" class="sort__button" data-sort-type="by-rating">Sort by rating</a></li>
            </ul>
`;
  }
}
