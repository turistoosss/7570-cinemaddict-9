export const creatFilmCardTemplate = ({titles, comments, rating, genre, description, img}) => {
  return `
        <article class="film-card">
            <h3 class="film-card__title">${titles}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
                <span class="film-card__year">1929</span>
                <span class="film-card__duration">1h 55m</span>
                <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${img}" alt="" class="film-card__poster">
            <p class="film-card__description">
             ${Array.from(description).map((item) => `${item}`)}
            </p>
            <a class="film-card__comments">${comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
             </form>
        </article>
`;
};
