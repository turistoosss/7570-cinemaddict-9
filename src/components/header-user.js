import {AbstractComponent} from "./absctract-component";

export class HeaderUser extends AbstractComponent {
  constructor(userRatingName) {
    super();
    this._userRatingName = userRatingName;

    if (userRatingName > 0 && userRatingName <= 10) {
      this._userRatingName = `novice`;
    } else if (userRatingName > 10 && userRatingName <= 20) {
      this._userRatingName = `fan`;
    } else if (userRatingName > 20) {
      this._userRatingName = `movie buff`;
    }
  }

  getTemplate() {
    return `<section class="header__profile profile">
                <p class="profile__rating">${this._userRatingName}</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            </section>
          `;
  }
}
