const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const arrayDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna.`,
  `Non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut`,
  `Lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];

const arrayFilmComments = [
  {
    img: `images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    date: 1
  },
  {
    img: `images/emoji/sleeping.png`,
    text: `Booooooooooring`,
    author: `John Doe`,
    date: 2
  },
  {
    img: `images/emoji/puke.png`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    date: 4
  }
];

const getRandomArray = (lengthTags, array) => {
  let arrayNew = [];
  new Array(lengthTags).fill(``).forEach(() => arrayNew.push(array[Math.floor(Math.random() * array.length)]));
  return arrayNew;
};

export const getFilm = () => ({
  userFilms: [15],
  titles: [
    `Good People`,
    `The Witcher`,
    `Game of Throne`,
    `Mr.Robot`,
    `Berlin`,
    `Spider-Man`,
    `Once Upon a Time ... in Hollywood`,
    `Dark`,
    `Black Mirror`,
    `Club`,
    `Sky`,
    `Vikings`,
    `Animals`,
    `UFO`,
    `Cool Story`,
    `Stranger`
  ][Math.floor(Math.random() * 15)],
  comments: [
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    110,
    111,
    112,
    113,
    114,
    115,
    116
  ][Math.floor(Math.random() * 15)],
  rating: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16
  ][Math.floor(Math.random() * 15)],
  genre: [
    `Musical`,
    `Drama`,
    `Political`,
    `War`,
    `Action`,
  ][Math.floor(Math.random() * 5)],
  description: new Set(getRandomArray(randomInteger(0, 3), arrayDescription)),
  img: [
    `images/posters/made-for-each-other.png`,
    `images/posters/popeye-meets-sinbad.png`,
    `images/posters/sagebrush-trail.jpg`,
    `images/posters/santa-claus-conquers-the-martians.jpg`,
    `images/posters/the-dance-of-life.jpg`,
    `images/posters/the-great-flamarion.jpg`,
    `images/posters/the-man-with-the-golden-arm.jpg`
  ][randomInteger(0, 5)],
  isHistory: Boolean(Math.round(Math.random())),
  isWatchlist: Boolean(Math.round(Math.random())),
  isFavorite: Boolean(Math.round(Math.random())),
  commentsArray: (getRandomArray(randomInteger(1, 3), arrayFilmComments))
});
