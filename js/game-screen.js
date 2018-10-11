import {changeScreen} from './render';
import welcomeScreen from './welcome-screen';
import GameView from './view/game-view';
import {initialState} from './game-data';

const ONE_SECOND = 1000;

export default (state) => {

  const screen = new GameView(state);

  const tick = () => {
    state.time++;
  };

  const stopTimer = ()=> {
    clearTimeout(state.time);
  };

  const startTimer = () => {
    state.time = setTimeout(() => {
      tick();
      startTimer();
      if (state.time > 10) {
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

  screen.openCardClickHandler = (card) => {
    stopTimer();
    card.classList.toggle(`visually-hidden`);
    card.nextElementSibling.classList.toggle(`visually-hidden`);
    card.parentElement.classList.toggle(`choose`);

    let choosenCards = document.querySelectorAll(`.choose img:not(.visually-hidden):not(.hidden)`);
    let newScore;
    if (choosenCards && choosenCards.length) {
      if ((choosenCards[0].src === choosenCards[1].src)) {
        newScore = document.querySelectorAll(`.close`).length * 42;
        choosenCards.forEach((item) => {
          item.classList.add(`hidden`);
        });
      } else {
        newScore = -84;
        setTimeout(() =>{
          choosenCards.forEach((item) => {
            item.parentElement.classList.remove(`choose`);
            item.classList.add(`visually-hidden`);
            item.previousElementSibling.classList.remove(`visually-hidden`);
          });
        }, ONE_SECOND);
      }
    }
    const newState = Object.assign({}, initialState, {score: state.score + newScore});
    screen.updateHeader(newState);
  };

  screen.replayButtonClickHandler = () => {
    stopTimer();
    changeScreen(welcomeScreen(initialState));
  };

  return screen.element;
};

