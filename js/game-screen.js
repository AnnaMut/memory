import {getElementFromTemplate, changeScreen} from './render';
import welcomeScreen from './welcome-screen';
import header from './header';
import {initialState} from './game-data';
const ONE_SECOND = 1000;

export default (state) => {
  const content = `<section class="game-page">
${header(state)}
<ul class="game-list">
  ${[...(initialState.scr)].map((i) => {
    return `<li><img class="close visually-hidden" src="img/closeCard.png" width="110" height="275" alt="Закрытая карта"><img class="open" src="${i}" width="110" height="275" alt="Карта"></li>`;
  }
  ).join(``)}
</ul>
</section>`;

  const tick = () => {
    state.time++;
  };

  const stopTimer = ()=> {
    clearTimeout(state.time);
  };

  const startTimer = () => {
    const time = setTimeout(() => {
      tick();
      startTimer();
      if (time > 10) {
        stopTimer();
        document.querySelectorAll(`.close`).forEach((item) => {
          item.classList.remove(`visually-hidden`);
        });
        document.querySelectorAll(`.open`).forEach((item) => {
          item.classList.add(`visually-hidden`);
        });
      }
    }, ONE_SECOND);
  };

  startTimer();

  const gameScreen = getElementFromTemplate(content);

  const replayButton = gameScreen.querySelector(`.replay-link`);

  const replayButtonClickHandler = ()=> {
    stopTimer();
    changeScreen(welcomeScreen());
  };

  replayButton.addEventListener(`click`, replayButtonClickHandler);

  return gameScreen;
};
