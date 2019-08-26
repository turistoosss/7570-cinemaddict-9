import {Position, render, unrender} from "./components/utils";
import {HeaderUser} from "./components/header-user";
import {HeaderSearch} from "./components/header-search";
import {MainNavigation} from "./components/main-navigation";
import {MainSort} from "./components/sort";
import {FilmsWrapper} from "./components/films-wrapper";
import {NoFilms} from "./components/no-films";
import {ShowMoreButton} from "./components/show-more-button";
import {getFilm} from "./components/data";
import {Footer} from "./components/footer";
import {BoardController} from "./controllers/board";

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
//renderFilmsWrapper();

const filmsWrapperMain = mainContent.querySelector(`.films-main`);
const films = mainContent.querySelector(`.films`);
const filmsWrapper = mainContent.querySelectorAll(`.films-list__container`);

const sliceFilms = (elFirst, elLast) => {
  return dataFilms.slice(elFirst, elLast);
};


const renderFilmsRow = (array, elementFrom, elementTo, place) => {
  const arraySlice = array.slice(elementFrom, elementTo);
  //arraySlice.forEach((filmMock) => renderFilm(filmMock, place));
};

const renderNoFilms = () => {
  const noFilms = new NoFilms();

  //render(filmsWrapperMain, noFilms.getElement(), Position.BEFOREEND);
};

if (dataFilms) {
  renderFilmsRow(dataFilms, 0, 5, filmsWrapperMain);
} else {
  renderNoFilms();
}

const boardController = new BoardController(mainContent, dataFilms);
boardController.init();

const filmsListWrapper = mainContent.querySelector(`.films-list`);

//renderFilmsRow(getFilmsSort(`rating`), 0, 2, filmsWrapper[1]);
//renderFilmsRow(getFilmsSort(`comments`), 0, 2, filmsWrapper[2]);

let elementFrom = 0;

const renderShowMoreButton = () => {
  const showMoreButton = new ShowMoreButton();

  const onButtonShowMore = () => {
    elementFrom += FILM_ROW;
    let elementTo = elementFrom + FILM_ROW;
    const arraySliced = sliceFilms(elementFrom, elementTo);

    renderFilmsRow(dataFilms, elementFrom, elementTo, filmsWrapperMain);

    if (arraySliced.length <= FILM_ROW - 1) {
      showMoreButton.getElement().style.display = `none`;
    }
  };

  showMoreButton.getElement().addEventListener(`click`, onButtonShowMore);
  render(filmsListWrapper, showMoreButton.getElement(), Position.BEFOREEND);
};
//renderShowMoreButton();

const renderFooter = (films) => {
  const footer = new Footer(films);

  render(mainContent, footer.getElement(), Position.BEFOREEND);
};
renderFooter(dataFilms.length);
