import {render, unrender, Position} from "../components/utils";
import {FilmCard} from "../components/card-template";
import {PopUpFilm} from "../components/films-details-popup";
import {FilmsWrapper} from "../components/films-wrapper";
import {MainSort} from "../components/sort";
import {ShowMoreButton} from "../components/show-more-button";
import {NoFilms} from "../components/no-films";

export class PageController {
  constructor(container, arrayFilms) {
    this._container = container;
    this._arrayFilms = arrayFilms;
    this._arraySorted = this._arrayFilms;
    this._filmsWrapper = new FilmsWrapper();
    this._filmsList = this._filmsWrapper.getElement().querySelector(`.films-main`);
    this._mainSort = new MainSort();
    this._showMoreButton = new ShowMoreButton();
    this._elementFrom = 0;
    this._FILM_ROW = 5;
    this._noFilms = new NoFilms();
  }

  init() {
    render(this._container, this._mainSort.getElement(), Position.BEFOREEND);
    render(this._container, this._filmsWrapper.getElement(), Position.BEFOREEND);

    const filmsMain = this._filmsWrapper.getElement().querySelector(`.films-list`);

    if (this._arraySorted.length > this._FILM_ROW) {
      render(filmsMain, this._showMoreButton.getElement(), Position.BEFOREEND);
    }

    const filmsWrapper = this._container.querySelectorAll(`.films-list__container`);

    this._renderFilmsRow(this._arrayFilms, 0, 5, this._filmsList);
    this._renderFilmsRow(this._getFilmsSort(`rating`), 0, 2, filmsWrapper[1]);
    this._renderFilmsRow(this._getFilmsSort(`comments`), 0, 2, filmsWrapper[2]);

    this._showMoreButton.getElement().addEventListener(`click`, (evt) => this._onButtonShowMore(evt, this._filmsList, this._arraySorted));
    this._mainSort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderFilm(filmMock, place) {
    const films = new FilmCard(filmMock);
    const popUpFilm = new PopUpFilm(filmMock);
    const mainContent = document.querySelector(`.main`);

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
    render(place, films.getElement(), Position.BEFOREEND);
  }

  _renderFilmsRow(array, elementFrom, elementTo, place) {
    const arraySlice = array.slice(elementFrom, elementTo);
    if (!arraySlice.length) {
      render(this._filmsList, this._noFilms.getElement(), Position.BEFOREEND);
    } else {
      arraySlice.forEach((filmMock) => this._renderFilm(filmMock, place));
    }
  }

  _getFilmsSort(attribute, elFirst, elLast) {
    const array = this._arrayFilms;
    const arraySort = array.slice().sort((a, b) => b[attribute] - a[attribute]);
    return arraySort.slice(elFirst, elLast);
  }

  _onButtonShowMore(evt, place, array) {
    evt.preventDefault();
    this._elementFrom += this._FILM_ROW;
    let elementTo = this._elementFrom + this._FILM_ROW;
    const arraySliced = array.slice(this._elementFrom, elementTo);

    this._renderFilmsRow(array, this._elementFrom, elementTo, place);

    if (arraySliced.length <= this._FILM_ROW - 1) {
      this._showMoreButton.getElement().style.display = `none`;
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    this._elementFrom = 0;

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._filmsList.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `by-rating`:
        this._arraySorted = this._arrayFilms.slice().sort((a, b) => b[`rating`] - a[`rating`]);
        this._renderFilmsRow(this._arraySorted, 0, 5, this._filmsList);
        break;
      case `by-default`:
        this._arraySorted = this._arrayFilms;
        this._renderFilmsRow(this._arraySorted, 0, 5, this._filmsList);
        break;
    }

    if (this._arraySorted.length <= this._FILM_ROW - 1) {
      this._showMoreButton.getElement().style.display = `none`;
    } else {
      this._showMoreButton.getElement().style.display = `block`;
    }
  }
}
