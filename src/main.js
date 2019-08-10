import {creatHeaderTemplate} from "./components/saite-header";
import {creatHeaderProfileTemplate} from "./components/header-profile";
import {creatMainNavigationTemplate} from "./components/main-navigation";
import {creatMainSort} from "./components/sort";
import {creatFilmsWrapper} from "./components/films-wrapper";
import {creatFilmCardTemplate} from "./components/card-template";
import {creatShowMoreButtonTempate} from "./components/show-more-button";
import {creatFilmDetailsPopupTempate} from "./components/films-details-popup";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainHeader = document.querySelector(`.header`);
const mainContent = document.querySelector(`.main`);

render(siteMainHeader, creatHeaderProfileTemplate(), `beforeend`);
render(siteMainHeader, creatHeaderTemplate(), `beforeend`);
render(mainContent, creatMainNavigationTemplate(), `beforeend`);
render(mainContent, creatMainSort(), `beforeend`);
render(mainContent, creatFilmsWrapper(), `beforeend`);

const filmsWrapper = mainContent.querySelector(`.films-list__container`);
const filmsListWrapper = mainContent.querySelector(`.films-list`);
const filmsEstraWrapper = mainContent.querySelector(`.films-list--extra`);
const filmsEstraInner = filmsEstraWrapper.querySelector(`.films-list__container`);
console.log(filmsEstraWrapper);

new Array(5).fill(``).forEach(() => render(filmsWrapper, creatFilmCardTemplate(), `beforeend`));


new Array(2).fill(``).forEach(() => render(filmsEstraInner, creatFilmCardTemplate(), `beforeend`));
render(filmsListWrapper, creatShowMoreButtonTempate(), `beforeend`);
// render(mainContent, creatFilmDetailsPopupTempate(), `beforeend`);
