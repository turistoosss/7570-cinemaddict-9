import {render, Position, unrender} from "../components/utils";
import {FilmCard} from "../components/card-template";
import {PopUpFilm} from "../components/films-details-popup";

export class MovieController {
  constructor(container, filmItem, onChangeView, onDataChange, mainArray) {
    this._filmList = container;
    this._filmItem = filmItem;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._filmkCard = new FilmCard(filmItem);
    this._popUpFilm = new PopUpFilm(filmItem);
    this._mainArray = mainArray;

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

    const onOpenPopUp = () => {
      this._setDefaultView();
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

    this._filmkCard .getElement().querySelector(`.film-card__title`).addEventListener(`click`, onOpenPopUp);
    this._filmkCard .getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onOpenPopUp);
    this._filmkCard .getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onOpenPopUp);

    render(this._filmList, this._filmkCard .getElement(), Position.BEFOREEND);

    this._filmkCard.getElement().querySelector(`.film-card__controls`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const onFilmContoleClik = (attributeName) => {
          evt.target.classList.add(`film-card__controls-item--active`);
          console.log(attributeName);
          console.log(this._filmItem[attributeName]);
          if (!this._filmItem[attributeName]) {
            this._filmItem[attributeName] = true;
          } else {
            this._filmItem[attributeName] = false;
          }
          this._onDataChange(this._mainArray);
        };

        switch (evt.target.dataset.filmType) {
          case `watchlist`:
            onFilmContoleClik(`isWatchlist`);
            break;
          case `watched`:
            onFilmContoleClik(`isHistory`);
            break;
          case `favorite`:
            onFilmContoleClik(`isFavorite`);
            break;
        }
      });

    render(this._filmList, this._filmkCard .getElement(), Position.BEFOREEND);
  }

  _setDefaultView() {
    const mainContent = document.querySelector(`.main`);
    const filmDetails = document.querySelector(`.film-details`);

    if (mainContent.contains(filmDetails)) {
      console.log(`unrender`);

      unrender(filmDetails);
      this._popUpFilm.removeElement();
    }
    //
    // if (document.body.contains(this._moviePopup.getElement())) {
    //   unrender(this._moviePopup.getElement());
    //   this._moviePopup.removeElement()
    // }
  }
}
