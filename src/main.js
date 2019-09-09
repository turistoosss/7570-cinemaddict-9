import {Position, render} from "./components/utils";
import {HeaderUser} from "./components/header-user";
import {HeaderSearch} from "./components/header-search";
import {MainNavigation} from "./components/main-navigation";
import {getFilm} from "./components/data";
import {Footer} from "./components/footer";
import {PageController} from "./controllers/films-controller";
import {Statistic} from "./components/statistic";

const siteMainHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const FILM_COUNT = 11;


const getDataFilms = () => {
  let arrayFilms = [];
  new Array(FILM_COUNT).fill(``).forEach(() => arrayFilms.push(getFilm()));
  return arrayFilms;
};

const dataFilms = getDataFilms();

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
  const mainNavigation = new MainNavigation(navCountHistory, navCountWatchlist, navCountFavorite);

  render(mainContent, mainNavigation.getElement(), Position.BEFOREEND);
};
renderMainNavigation(navAmountHistory, navAmountWatchlist, navAmountFavorite);

const renderStatistic = (navCountHistory) => {
  const statistic = new Statistic(navCountHistory);
  render(mainContent, statistic.getElement(), Position.BEFOREEND);
  statistic.getElement().classList.add(`visually-hidden`);
};
renderStatistic(navAmountHistory);

const pageController = new PageController(mainContent, dataFilms);
pageController.init();

mainContent.querySelector(`.main-navigation`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const filmsWrapper = mainContent.querySelector(`.films`);
  const statistic = mainContent.querySelector(`.statistic`);

  if (evt.target.tagName !== `A`) {
    return;
  }

  switch (evt.target.id) {
    case `main-navigation-all-movies`:
      statistic.classList.add(`visually-hidden`);
      filmsWrapper.classList.remove(`visually-hidden`);
      break;
    case `main-navigation-all-stats`:
      statistic.classList.remove(`visually-hidden`);
      filmsWrapper.classList.add(`visually-hidden`);
      break;
  }
});

const renderFooter = (films) => {
  const footer = new Footer(films);

  render(mainContent, footer.getElement(), Position.BEFOREEND);
};
renderFooter(dataFilms.length);
