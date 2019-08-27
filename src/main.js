import {Position, render} from "./components/utils";
import {HeaderUser} from "./components/header-user";
import {HeaderSearch} from "./components/header-search";
import {MainNavigation} from "./components/main-navigation";
import {getFilm} from "./components/data";
import {Footer} from "./components/footer";
import {PageController} from "./controllers/films-controller";

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
  const search = new MainNavigation(navCountHistory, navCountWatchlist, navCountFavorite);

  render(mainContent, search.getElement(), Position.BEFOREEND);
};
renderMainNavigation(navAmountHistory, navAmountWatchlist, navAmountFavorite);


const pageController = new PageController(mainContent, dataFilms);
pageController.init();


const renderFooter = (films) => {
  const footer = new Footer(films);

  render(mainContent, footer.getElement(), Position.BEFOREEND);
};
renderFooter(dataFilms.length);
