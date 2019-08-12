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

const filmsWrapper = mainContent.querySelectorAll(`.films-list__container`);
const filmsListWrapper = mainContent.querySelector(`.films-list`);

new Array(5).fill(``).forEach(() => render(filmsWrapper[0], creatFilmCardTemplate(), `beforeend`));
new Array(2).fill(``).forEach(() => render(filmsWrapper[1], creatFilmCardTemplate(), `beforeend`));
new Array(2).fill(``).forEach(() => render(filmsWrapper[2], creatFilmCardTemplate(), `beforeend`));


render(filmsListWrapper, creatShowMoreButtonTempate(), `beforeend`);
render(mainContent, creatFilmDetailsPopupTempate(), `beforeend`);
