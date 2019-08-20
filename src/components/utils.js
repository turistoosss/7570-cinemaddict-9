
export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderNEW = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      //container.append(element);
      container.insertAdjacentHTML(`beforeend`, element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
