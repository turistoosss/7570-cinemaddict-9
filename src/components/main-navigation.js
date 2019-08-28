import {AbstractComponent} from "./absctract-component";

export class MainNavigation extends AbstractComponent {
  constructor(navCountHistory, navCountWatchlist, navCountFavorite) {
    super();
    this._navCountHistory = navCountHistory;
    this._navCountWatchlist = navCountWatchlist;
    this._navCountFavorite = navCountFavorite;

  }

  getTemplate() {
    return `<nav class="main-navigation">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._navCountWatchlist }</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._navCountHistory}</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._navCountFavorite}</span></a>
          <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
        </nav>
`;
  }
}
