const mainElement = document.querySelector(`.central`);

export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
