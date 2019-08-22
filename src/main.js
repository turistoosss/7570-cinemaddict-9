import {Position, render, unrender} from "./components/utils";
import {HeaderUser} from "./components/header-user";
import {HeaderSearch} from "./components/header-search";
import {MainNavigation} from "./components/main-navigation";
import {MainSort} from "./components/sort";
import {FilmsWrapper} from "./components/films-wrapper";
import {FilmCard} from "./components/card-template";
import {ShowMoreButton} from "./components/show-more-button";
import {getFilm} from "./components/data";
import {Footer} from "./components/footer";
import {PopUpFilm} from "./components/films-details-popup";

const siteMainHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const FILM_COUNT = 19;
const FILM_ROW = 5;

const getDataFilms = () => {
  let arrayFilms = [];
  new Array(FILM_COUNT).fill(``).forEach(() => arrayFilms.push(getFilm()));
  return arrayFilms;
};

const dataFilms = getDataFilms();

console.log(dataFilms);

const getFilmsSort = (attribute) => {
  const arraySort = dataFilms.sort((a, b) => b[attribute] - a[attribute]);
  return arraySort.slice(0, 2);
};

const renderHeaderSearch = () => {
  const search = new HeaderSearch();

  render(siteMainHeader, search.getElement(), Position.BEFOREEND);
};
renderHeaderSearch();

const renderHeaderUser = (userFilms) => {
  const search = new HeaderUser(userFilms);

  render(siteMainHeader, search.getElement(), Position.BEFOREEND);
};
renderHeaderUser(11);

const countNavFilms = (attribute) => {
  let countWatchlist = 0;

  dataFilms.forEach((item) => {
    if (item[attribute]) {
      countWatchlist += 1;
    }
  });

  return countWatchlist;
};

const navAmountHistory = countNavFilms(`isHistory`);
const navAmountWatchlist = countNavFilms(`isWatchlist`);
const navAmountFavorite = countNavFilms(`isFavorite`);

const renderMainNavigation = (navCountHistory, navCountWatchlist, navCountFavorite) => {
  const search = new MainNavigation(navCountHistory, navCountWatchlist, navCountFavorite);

  render(mainContent, search.getElement(), Position.BEFOREEND);
};
renderMainNavigation(navAmountHistory, navAmountWatchlist, navAmountFavorite);

const renderMainSort = () => {
  const search = new MainSort();

  render(mainContent, search.getElement(), Position.BEFOREEND);
};
renderMainSort();

const renderFilmsWrapper = () => {
  const search = new FilmsWrapper();

  render(mainContent, search.getElement(), Position.BEFOREEND);
};
renderFilmsWrapper();

const filmsWrapperMain = mainContent.querySelector(`.films-main`);
const filmsListWrapper = mainContent.querySelector(`.films-list`);
const filmsWrapper = mainContent.querySelectorAll(`.films-list__container`);

const sliceFilms = (elFirst, elLast) => {
  return dataFilms.slice(elFirst, elLast);
};

const renderFilm = (filmMock, place) => {
  const task = new FilmCard(filmMock);
  const popUpFilm = new PopUpFilm(filmMock);

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

  popUpFilm.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseClick);

  const onFilmClick = () => {
    render(mainContent, popUpFilm.getElement(), Position.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  task.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmClick);
  task.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmClick);
  task.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmClick);
  render(place, task.getElement(), Position.BEFOREEND);
};

const renderFilmsRow = (array, elFirst, elLast, place) => {
  const arraySlice = array.slice(elFirst, elLast);
  arraySlice.forEach((filmMock) => renderFilm(filmMock, place));
};

renderFilmsRow(dataFilms, 0, 5, filmsWrapperMain);
renderFilmsRow(getFilmsSort(`rating`), 0, 2, filmsWrapper[1]);
renderFilmsRow(getFilmsSort(`comments`), 0, 2, filmsWrapper[2]);

let elFirst = 0;

const renderShowMoreButton = () => {
  const showMoreButton = new ShowMoreButton();

  const onButtonShowMore = () => {
    elFirst += FILM_ROW;
    let elLast = elFirst + FILM_ROW;
    const arraySliced = sliceFilms(elFirst, elLast);

    renderFilmsRow(dataFilms, elFirst, elLast, filmsWrapperMain);

    if (arraySliced.length <= FILM_ROW - 1) {
      showMoreButton.getElement().style.display = `none`;
    }
  };

  showMoreButton.getElement().addEventListener(`click`, onButtonShowMore);
  render(filmsListWrapper, showMoreButton.getElement(), Position.BEFOREEND);
};
renderShowMoreButton();

const renderFooter = (films) => {
  const footer = new Footer(films);

  render(mainContent, footer.getElement(), Position.BEFOREEND);
};
renderFooter(dataFilms.length);
