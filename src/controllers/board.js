import {render, unrender, Position} from "../components/utils";
import {FilmCard} from "../components/card-template";
import {PopUpFilm} from "../components/films-details-popup";
import {FilmsWrapper} from "../components/films-wrapper";
import {ShowMoreButton} from "../components/show-more-button";

export class BoardController {
  constructor(container, arrayFilms) {
    this._container = container;
    this._arrayFilms = arrayFilms;
    this._filmsWrapper = new FilmsWrapper();
    this._showMoreButton = new ShowMoreButton();
  }

  init() {
    render(this._container, this._filmsWrapper.getElement(), Position.BEFOREEND);
    //this._filmsList = this._filmsWrapper.querySelector(`.films-main`);

    render(this._filmsList, this._showMoreButton.getElement(), Position.BEFOREEND);
    // this._arrayFilms.forEach((arrayFilm) => this._renderFilm(arrayFilm));
    this._renderFilmsRow(this._arrayFilms, 0, 5);
  }

  _renderFilm(filmMock) {
    const films = new FilmCard(filmMock);
    const popUpFilm = new PopUpFilm(filmMock);
    const mainContent = document.querySelector(`.main`);
    const filmsList = this._filmsWrapper.getElement().querySelector(`.films-main`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onCloseClick();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCloseClick = () => {
      unrender(popUpFilm.getElement());
      popUpFilm.removeElement();
    };

    const onFilmClick = () => {
      render(mainContent, popUpFilm.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
      popUpFilm.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseClick);

      popUpFilm.getElement().querySelector(`textarea`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      popUpFilm.getElement().querySelector(`textarea`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });
    };

    films.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmClick);
    films.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmClick);
    films.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmClick);
    render(filmsList, films.getElement(), Position.BEFOREEND);
  }

  _renderFilmsRow(array, elementFrom, elementTo, place) {
    const arraySlice = array.slice(elementFrom, elementTo);
    arraySlice.forEach((filmMock) => this._renderFilm(filmMock));
  }
}
