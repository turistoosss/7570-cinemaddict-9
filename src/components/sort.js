import {createElement} from "./utils";

export class MainSort {
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<ul class="sort">
                <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
                <li><a href="#" class="sort__button">Sort by date</a></li>
                <li><a href="#" class="sort__button">Sort by rating</a></li>
            </ul>
`;
  }
}
