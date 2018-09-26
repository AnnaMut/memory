import {getElementFromTemplate, changeScreen} from './render';
import welcomeScreen from './welcome-screen';
import header from './header';
import {initialState} from './game-data';
const ONE_SECOND = 1000;

export default (state) => {
  const content = `<section class="game-page">
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

  const gameScreen = getElementFromTemplate(content);
  gameScreen.insertBefore(getElementFromTemplate(header(state)), gameScreen.firstChild);

  const updateHeader = (somestate) => {
    gameScreen.replaceChild(getElementFromTemplate(header(somestate)), gameScreen.firstChild);
  };


  const replayButton = gameScreen.querySelector(`.replay-link`);

  const replayButtonClickHandler = ()=> {
    stopTimer();
    changeScreen(welcomeScreen());
  };

  replayButton.addEventListener(`click`, replayButtonClickHandler);

  const openCardClickHandler = (evt) => {
    stopTimer();
    // evt.target.classList.add(`visually-hidden`);
    // evt.target.nextElementSibling.classList.remove(`visually-hidden`);
    // evt.target.parentElement.classList.add(`choose`);
    evt.target.classList.toggle(`visually-hidden`);
    evt.target.nextElementSibling.classList.toggle(`visually-hidden`);
    evt.target.parentElement.classList.toggle(`choose`);

    let choosenCards = gameScreen.querySelectorAll(`.choose img:not(.visually-hidden):not(.hidden)`);
    let newScore;
    if (choosenCards && choosenCards.length) {
      if ((choosenCards[0].src === choosenCards[1].src)) {
        newScore = state.score + (gameScreen.querySelectorAll(`.close`).length * 42);
        choosenCards.forEach((item) => {
          item.classList.add(`hidden`);
        });
      } else {
        newScore = state.score - 84;
        setTimeout(() =>{
          choosenCards.forEach((item) => {
            item.parentElement.classList.remove(`choose`);
            item.classList.add(`visually-hidden`);
            item.previousElementSibling.classList.remove(`visually-hidden`);
          });
        }, ONE_SECOND);
      }
    }
    const newState = Object.assign({}, initialState, {score: newScore});
    updateHeader(newState);
    choosenCards.forEach((item) => {
      item.removeEventListener(`click`, openCardClickHandler);
    });
  };

  gameScreen.querySelectorAll(`.close`).forEach((item) => {
    item.addEventListener(`click`, openCardClickHandler);
  });

  return gameScreen;
};
