import {render, Position, unrender} from "../components/utils";
import {FilmCard} from "../components/card-template";
import {PopUpFilm} from "../components/films-details-popup";

export class MovieController {
  constructor(container, filmItem, onChangeView, onDataChange) {
    this._filmList = container;
    this._filmItem = filmItem;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._filmkCard = new FilmCard(filmItem);
    this._popUpFilm = new PopUpFilm(filmItem);

    this.create();
  }

  create() {
    const mainContent = document.querySelector(`.main`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onCloseClick();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCloseClick = () => {
      unrender(this._popUpFilm.getElement());
      this._popUpFilm.removeElement();
    };

    const onFilmClick = () => {
      render(mainContent, this._popUpFilm.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
      this._popUpFilm.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseClick);

      this._popUpFilm.getElement().querySelector(`textarea`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      this._popUpFilm.getElement().querySelector(`textarea`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });
    };

    this._filmkCard .getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmClick);
    this._filmkCard .getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmClick);
    this._filmkCard .getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmClick);

    render(this._filmList, this._filmkCard .getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._filmList.getElement().contains(this._popUpFilm.getElement())) {
      this._filmList.getElement().replaceChild(this._filmkCard.getElement(), this._popUpFilm.getElement());
    }
  }
}
