import {getElementFromTemplate, changeScreen} from './render';
import welcomeScreen from './welcome-screen';
import header from './header';
import {initialState} from './game-data';

const content = `<section class="game-page">
${header(initialState)}
<ul class="game-list">
  ${[...(initialState.scr)].map((i) => {
    return `<li><img src="${i}" width="110" height="275" alt="Карта"></li>`;
  }
  ).join(``)}
</ul>
</section>`;

const gameScreen = getElementFromTemplate(content);

const replayButton = gameScreen.querySelector(`.replay-link`);

const replayButtonClickHandler = ()=> {
  changeScreen(welcomeScreen);
};

replayButton.addEventListener(`click`, replayButtonClickHandler);

export default gameScreen;
