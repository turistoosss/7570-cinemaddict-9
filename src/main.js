import {creatHeaderTemplate} from "./components/saite-header";
import {creatHeaderProfileTemplate} from "./components/header-profile";
import {creatMainNavigationTemplate} from "./components/main-navigation";
import {creatMainSort} from "./components/sort";
import {creatFilmsWrapper} from "./components/films-wrapper";
import {creatFilmCardTemplate} from "./components/card-template";
import {creatShowMoreButtonTempate} from "./components/show-more-button";
import {getFilm} from "./components/data";
import {creatFilmDetailsPopupTempate} from "./components/films-details-popup";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);
const FILM_COUNT = 10;

const getDataFilms = () => {
  let arrayFilms = [];
  console.log(getFilm());

  new Array(FILM_COUNT).fill(``).forEach(() => arrayFilms.push(getFilm()));
  return arrayFilms;
};

const dataFilms = getDataFilms();

console.log(dataFilms);

const getFilmCommeted = () => {
  return dataFilms.slice(0, 2).sort((a, b) => a.rating - b.rating);
};

console.log(getFilmCommeted());

render(siteMainHeader, creatHeaderProfileTemplate(), `beforeend`);
render(siteMainHeader, creatHeaderTemplate(), `beforeend`);

const countNavWatchlist = () => {
  let countWatchlist = 0;

  dataFilms.forEach((item) => {
    if (item.isWatchlist) {
      countWatchlist += 1;
    }
  });

  return countWatchlist;
};

console.log(countNavWatchlist());

const countNavHistory = (atr) => {
  let countWatchlist = 0;

  dataFilms.forEach((item) => {
    if (item[atr]) {
      countWatchlist += 1;
    }
  });

  return countWatchlist;
};

console.log(`isHistory ` + countNavHistory(`isHistory`));

render(mainContent, creatMainNavigationTemplate(), `beforeend`);
render(mainContent, creatMainSort(), `beforeend`);
render(mainContent, creatFilmsWrapper(), `beforeend`);

const filmsWrapper = mainContent.querySelectorAll(`.films-list__container`);
const filmsWrapperMain = mainContent.querySelector(`.films-main`);
const filmsListWrapper = mainContent.querySelector(`.films-list`);

const renderFilms = (container, array) => {
  container.insertAdjacentHTML(`beforeend`, array.map(creatFilmCardTemplate).join(``));
};

renderFilms(filmsWrapperMain, dataFilms);

renderFilms(filmsWrapper[1], dataFilms);
renderFilms(filmsWrapper[2], dataFilms);

render(filmsListWrapper, creatShowMoreButtonTempate(), `beforeend`);
//render(mainContent, creatFilmDetailsPopupTempate(), `beforeend`);
