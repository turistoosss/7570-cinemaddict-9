import {render, unrender, Position} from "../components/utils";
import {FilmsWrapper} from "../components/films-wrapper";
import {MainSort} from "../components/sort";
import {ShowMoreButton} from "../components/show-more-button";
import {NoFilms} from "../components/no-films";
import {FilmsMain} from "../components/films-main";
import {MovieController} from "../controllers/movie-сontroller";

export class PageController {
  constructor(container, arrayFilms) {
    this._container = container;
    this._arrayFilms = arrayFilms;
    this._arraySorted = this._arrayFilms;
    this._filmsWrapper = new FilmsWrapper();
    this._filmsList = new FilmsMain();
    this._mainSort = new MainSort();
    this._showMoreButton = new ShowMoreButton();
    this._elementFrom = 0;
    this._FILM_ROW = 5;
    this._noFilms = new NoFilms();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._mainSort.getElement(), Position.BEFOREEND);
    render(this._container, this._filmsWrapper.getElement(), Position.BEFOREEND);
    const filmsMain = this._filmsWrapper.getElement().querySelector(`.films-list`);

    render(filmsMain, this._filmsList.getElement(), Position.BEFOREEND);

    console.log(this._arraySorted);

    if (this._arraySorted.length > this._FILM_ROW) {
      render(filmsMain, this._showMoreButton.getElement(), Position.BEFOREEND);
    }

    const filmsWrapper = this._container.querySelectorAll(`.films-list__container`);

    this._renderFilmsRow(this._arrayFilms, 0, this._FILM_ROW, this._filmsList.getElement());
    this._renderFilmsRow(this._getFilmsSort(`rating`), 0, 2, filmsWrapper[1]);
    this._renderFilmsRow(this._getFilmsSort(`comments`), 0, 2, filmsWrapper[2]);

    this._showMoreButton.getElement().addEventListener(`click`, (evt) => this._onButtonShowMore(evt, this._filmsList.getElement(), this._arraySorted));
    this._mainSort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderFilm(filmMock, place) {
    const taskController = new MovieController(place, filmMock, this._onChangeView, this._onDataChange, this._arraySorted);
  }

  _renderFilmsRow(array, elementFrom, elementTo, place) {
    const arraySlice = array.slice(elementFrom, elementTo);
    if (!arraySlice.length) {
      render(this._filmsList.getTemplate(), this._noFilms.getElement(), Position.BEFOREEND);
    } else {
      arraySlice.forEach((filmMock) => this._renderFilm(filmMock, place));
    }
  }

  _getFilmsSort(attribute, elFirst, elLast) {
    const array = this._arrayFilms;
    const arraySort = array.slice().sort((a, b) => b[attribute] - a[attribute]);
    return arraySort.slice(elFirst, elLast);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(array) {
    const filmsMain = this._filmsWrapper.getElement().querySelector(`.films-list`);
    const filmsWrapper = this._container.querySelectorAll(`.films-list__container`);
    const filmsListExtra = this._container.querySelectorAll(`.films-list--extra`);

    const wrapperExtraDiv = document.createElement(`div`);
    const wrapperExtraDiv2 = document.createElement(`div`);
    wrapperExtraDiv.classList.add(`films-list__container`);
    wrapperExtraDiv2.classList.add(`films-list__container`);

    this._elementFrom = 0;
    console.log(array);
    unrender(this._filmsList.getElement());
    unrender(filmsWrapper[1]);
    unrender(filmsWrapper[2]);

    this._filmsList.removeElement();
    this._arraySorted = array;

    render(filmsMain, this._filmsList.getElement(), Position.AFTERBEGIN);
    render(filmsListExtra[0], wrapperExtraDiv, Position.BEFOREEND);
    render(filmsListExtra[1], wrapperExtraDiv2, Position.BEFOREEND);
    const filmsWrapperNew = this._container.querySelectorAll(`.films-list__container`);

    this._renderFilmsRow(this._getFilmsSort(`rating`), 0, 2, filmsWrapperNew[1]);
    this._renderFilmsRow(this._getFilmsSort(`comments`), 0, 2, filmsWrapperNew[2]);
    this._renderFilmsRow(this._arraySorted, 0, 5, this._filmsList.getElement());
    if (array.length > this._FILM_ROW) {
      this._showMoreButton.getElement().style.display = `block`;
    }
  }

  _onButtonShowMore(evt, place, array) {
    evt.preventDefault();
    this._elementFrom += this._FILM_ROW;
    let elementTo = this._elementFrom + this._FILM_ROW;
    const arraySliced = array.slice(this._elementFrom, elementTo);
    console.log(array);
    this._renderFilmsRow(array, this._elementFrom, elementTo, this._filmsList.getElement());

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

    this._filmsList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `by-rating`:
        this._arraySorted = this._arrayFilms.slice().sort((a, b) => b[`rating`] - a[`rating`]);
        this._renderFilmsRow(this._arraySorted, 0, 5, this._filmsList.getElement());
        break;
      case `by-default`:
        this._arraySorted = this._arrayFilms;
        this._renderFilmsRow(this._arraySorted, 0, 5, this._filmsList.getElement());
        break;
    }

    if (this._arraySorted.length <= this._FILM_ROW - 1) {
      this._showMoreButton.getElement().style.display = `none`;
    } else {
      this._showMoreButton.getElement().style.display = `block`;
    }
  }
}
