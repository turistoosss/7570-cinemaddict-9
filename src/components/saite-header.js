import {createElement} from "./utils";

export class HeaderSearch {
  constructor(userRatingName) {
    this._userRatingName = userRatingName;
  }
  /*    let userRaitingName = ``;
    if (userRaiting > 0 && userRaiting <= 10) {
      userRaitingName = `novice`;
    } else if (userRaiting > 10 && userRaiting <= 20) {
      userRaitingName = `fan`;
    } else if (userRaiting > 20) {
      userRaitingName = `movie buff`;
    }*/


  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `
  <section class="header__profile profile">
    <p class="profile__rating">${this._userRatingName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`;
  }
}
