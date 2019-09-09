import {render, Position, unrender} from "../components/utils";
import {FilmCard} from "../components/card-template";
import {PopUpFilm} from "../components/films-details-popup";

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class MovieController {
  constructor(container, filmItem, onChangeView, onDataChange, mainArray, mode) {
    this._filmList = container;
    this._filmItem = filmItem;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._filmkCard = new FilmCard(filmItem);
    this._popUpFilm = new PopUpFilm(filmItem);
    this._mainArray = mainArray;

    this.create(mode);
  }

  create(mode) {
    const mainContent = document.querySelector(`.main`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onCloseClick();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCloseClick = () => {
      unrender(this._popUpFilm.getElement());
      this._popUpFilm.removeElement();
    };


    const onOpenPopUp = () => {
      console.log(`popUp isHistory ` + this._filmItem.isHistory);

      render(mainContent, this._popUpFilm.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      this._popUpFilm.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseClick);

      if (this._filmItem.isHistory) {
        this._popUpFilm.getElement().querySelector(`.form-details__middle-container`).style.display = `block`;
      }

      this._popUpFilm.getElement().querySelector(`textarea`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      this._popUpFilm.getElement().querySelector(`textarea`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });

      this._popUpFilm.getElement().querySelector(`.film-details__emoji-list`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (evt.target.tagName !== `IMG`) {
            return;
          }

          const emoji = document.createElement(`img`);
          const emojiLabel = this._popUpFilm.getElement().querySelector(`.film-details__add-emoji-label`);
          if (emojiLabel.querySelector(`img`)) {
            emojiLabel.removeChild(emojiLabel.firstChild);
          }

          render(emojiLabel, emoji, Position.BEFOREEND);

          emoji.src = evt.target.src;
          emoji.width = 55;
          emoji.height = 55;
        });

      const commentsArray = [...this._popUpFilm.getElement().querySelectorAll(`.film-details__comment`)];
      console.log(commentsArray);

      this._popUpFilm.getElement().querySelector(`.film-details__comments-list`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (evt.target.className !== `film-details__comment-delete`) {
            return;
          }

          const parentElemetn = evt.target.parentElement.parentElement.parentElement;
          const index = commentsArray.indexOf(parentElemetn);
          this._filmItem.commentsArray = [...this._filmItem.commentsArray.slice(0, index), ...this._filmItem.commentsArray.slice(index + 1)];

          this._onDataChange(this._mainArray, this._filmItem);
        });
    };


    this._filmkCard .getElement().querySelector(`.film-card__title`).addEventListener(`click`, onOpenPopUp);
    this._filmkCard .getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onOpenPopUp);
    this._filmkCard .getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onOpenPopUp);

    if (mode === `adding`) {
      onOpenPopUp();
    } else {
      render(this._filmList, this._filmkCard .getElement(), Position.BEFOREEND);
    }

    this._filmkCard.getElement().querySelector(`.film-card__controls`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        let buttonName;
        evt.target.classList.add(`film-card__controls-item--active`);

        switch (evt.target.dataset.filmType) {
          case `watchlist`:
            buttonName = `isWatchlist`;
            break;
          case `watched`:
            buttonName = `isHistory`;
            break;
          case `favorite`:
            buttonName = `isFavorite`;
            break;
        }

        this._onFilmControlClick(buttonName);

      });

    this._popUpFilm.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        let inputName;

        switch (evt.target.name) {
          case `watchlist`:
            inputName = `isWatchlist`;
            this._onFilmControlClick(inputName);
            break;


          case `watched`:
            if (!this._filmItem[`isHistory`]) {
              this._filmItem[`isHistory`] = true;
            } else {
              this._filmItem[`isHistory`] = false;
            }

            console.log(this._mainArray);
            this._onDataChange(this._mainArray, this._filmItem);
            break;

          case `favorite`:
            inputName = `isFavorite`;
            this._onFilmControlClick(inputName);
            break;
        }

      });
    render(this._filmList, this._filmkCard .getElement(), Position.BEFOREEND);
  }

  _onFilmControlClick(attributeName) {
    if (!this._filmItem[attributeName]) {
      this._filmItem[attributeName] = true;
    } else {
      this._filmItem[attributeName] = false;
    }
    this._setDefaultView();
    this._onDataChange(this._mainArray);
  }

  _setDefaultView() {
    const mainContent = document.querySelector(`.main`);
    const filmDetails = document.querySelector(`.film-details`);

    if (mainContent.contains(filmDetails)) {
      unrender(filmDetails);
      this._popUpFilm.removeElement();
    }
  }
}
