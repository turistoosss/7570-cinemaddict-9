import {render, Position, unrender} from "../components/utils";

export class SearchController {
  constructor(container, searchResult, dataFilms, onDataChange) {
    this._container = container;
    this._searchResult = searchResult;
    this._films = dataFilms;
    this._onDataChange = onDataChange;
    // this._onBackButtonClick = onBackButtonClick;

    // this._init();
  }
  init() {
    this.hide();
    const mainContent = document.querySelector(`.main`);

    render(this._container, this._searchResult, Position.BEFOREEND);

    const search = document.querySelector(`.header__search`);
    search.addEventListener(`keyup`, (evt) => {
      const {value} = evt.target;
      console.log(value);
      const films = this._films.filter((movie) => {
        return movie.titles.includes(value);
      });

      console.log(films);

      this._showSearchResult(value, films);
    });
  }

  hide() {
    this._searchResult.classList.add(`visually-hidden`);
  }

  _showSearchResult(text, films) {
    this._onDataChange(films);
  }
}
