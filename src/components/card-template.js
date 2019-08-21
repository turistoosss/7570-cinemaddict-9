import {createElement} from "./utils";

export class FilmCard {
  constructor({titles, comments, rating, genre, description, img}) {
    this._titles = titles;
    this._comments = comments;
    this._rating = rating;
    this._genre = genre;
    this._description = description;
    this._img = img;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<article class="film-card">
            <h3 class="film-card__title">${this._titles}</h3>
            <p class="film-card__rating">${this._rating}</p>
            <p class="film-card__info">
                <span class="film-card__year">1929</span>
                <span class="film-card__duration">1h 55m</span>
                <span class="film-card__genre">${this._genre}</span>
            </p>
            <img src="${this._img}" alt="" class="film-card__poster">
            <p class="film-card__description">
             ${Array.from(this._description).map((item) => `${item}`)}
            </p>
            <a class="film-card__comments">${this._comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
             </form>
        </article>
`;
  }
}
