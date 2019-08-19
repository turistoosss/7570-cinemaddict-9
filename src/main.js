import {creatHeaderTemplate} from "./components/saite-header";
import {creatHeaderProfileTemplate} from "./components/header-profile";
import {creatMainNavigationTemplate} from "./components/main-navigation";
import {creatMainSort} from "./components/sort";
import {creatFilmsWrapper} from "./components/films-wrapper";
import {creatFilmCardTemplate} from "./components/card-template";
import {creatShowMoreButtonTempate} from "./components/show-more-button";
import {getFilm} from "./components/data";
import {footer} from "./components/footer";
import {creatFilmDetailsPopupTempate} from "./components/films-details-popup";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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
console.log(dataFilms[0].commentsArray);

const getFilmsSort = (attribute) => {
  const arraySort = dataFilms.sort((a, b) => b[attribute] - a[attribute]);
  const arraySlice = arraySort.slice(0, 2);
  return arraySlice;
};

render(siteMainHeader, creatHeaderProfileTemplate(), `beforeend`);
render(siteMainHeader, creatHeaderTemplate(12), `beforeend`);

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

render(mainContent, creatMainNavigationTemplate(navAmountHistory, navAmountWatchlist, navAmountFavorite), `beforeend`);
render(mainContent, creatMainSort(), `beforeend`);
render(mainContent, creatFilmsWrapper(), `beforeend`);

const filmsWrapper = mainContent.querySelectorAll(`.films-list__container`);
const filmsWrapperMain = mainContent.querySelector(`.films-main`);
const filmsListWrapper = mainContent.querySelector(`.films-list`);

const renderFilms = (container, array) => {
  container.insertAdjacentHTML(`beforeend`, array.map(creatFilmCardTemplate).join(``));
};

const sliceFilms = (elFirst, elLast) => {
  return dataFilms.slice(elFirst, elLast);
};

renderFilms(filmsWrapperMain, sliceFilms(0, 5));

renderFilms(filmsWrapper[1], getFilmsSort(`rating`));
renderFilms(filmsWrapper[2], getFilmsSort(`comments`));

render(filmsListWrapper, creatShowMoreButtonTempate(), `beforeend`);

const filmsShowMore = mainContent.querySelector(`.films-list__show-more`);

let elFirst = 0;

const onButtonShowMore = () => {
  elFirst += FILM_ROW;
  let elLast = elFirst + FILM_ROW;
  const arraySliced = sliceFilms(elFirst, elLast);

  renderFilms(filmsWrapperMain, arraySliced);

  if (arraySliced.length <= FILM_ROW - 1) {
    filmsShowMore.style.display = `none`;
  }
};

filmsShowMore.addEventListener(`click`, onButtonShowMore);

render(mainContent, footer(dataFilms.length), `beforeend`);

render(mainContent, creatFilmDetailsPopupTempate(dataFilms[0]), `beforeend`);
