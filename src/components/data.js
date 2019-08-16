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

const getRandonDescription = (lengthTags) => {
  let arrayNew = [];
  new Array(lengthTags).fill(``).forEach(() => arrayNew.push(arrayDescription[Math.floor(Math.random() * arrayDescription.length)]));
  return arrayNew;
};

const arrayPosters = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`
];

export const getFilm = () => ({
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
    `1`,
    `2`,
    `3`,
    `4`,
    `5`,
    `6`,
    `7`,
    `8`,
    `9`,
    `10`,
    `11`,
    `12`,
    `13`,
    `14`,
    `15`,
    `16`
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
  description: new Set(getRandonDescription(randomInteger(0, 3))),
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
  isWatchlist: Boolean(Math.round(Math.random()))
});

console.log(getFilm());
