import {AbstractComponent} from "./absctract-component";
import moment from "moment";

export class FilmCard extends AbstractComponent {
  constructor({titles, comments, dueDate, rating, genre, description, img, isWatchlist, isHistory, isFavorite}) {
    super();
    this._titles = titles;
    this._comments = comments;
    this._dueDate = dueDate;
    this._rating = rating;
    this._genre = genre;
    this._description = description;
    this._img = img;
    this._isWatchlist = isWatchlist;
    this._isHistory = isHistory;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `<article class="film-card">
            <h3 class="film-card__title">${this._titles}</h3>
            <p class="film-card__rating">${this._rating}</p>
            <p class="film-card__info">
                <span class="film-card__year">${moment(this._dueDate).format('DD.MM.YYYY')}</span>
                <span class="film-card__duration">1h 55m</span>
                <span class="film-card__genre">${this._genre}</span>
            </p>
            <img src="${this._img}" alt="" class="film-card__poster">
            <p class="film-card__description">
             ${Array.from(this._description).map((item) => `${item}`)}
            </p>
            <a class="film-card__comments">${this._comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlist ? `film-card__controls-item--active` : ``}" data-film-type="watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isHistory ? `film-card__controls-item--active` : ``}" data-film-type="watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}" data-film-type="favorite">Mark as favorite</button>
             </form>
        </article>
`;
  }
}
