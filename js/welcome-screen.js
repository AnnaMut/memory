import {getElementFromTemplate, changeScreen} from './render';
import gameScreen from './game-screen';
import {initialState} from './game-data';

export default () => {
  const content = `<section class="start-page">
<a class="start-img" href="#">
  <img src="img/StartGame.png" width="503" height="262" alt="Раскладка карт">
</a>
<h2 class="start-title">MEMORY GAME</h2>
<button class="start-button" type="button">Начать игру</button>  
</section>`;

  const welcomeScreen = getElementFromTemplate(content);

  const startButton = welcomeScreen.querySelector(`.start-button`);

  const startButtonClickHandler = ()=> {
    changeScreen(gameScreen(initialState));
  };

  startButton.addEventListener(`click`, startButtonClickHandler);

  return welcomeScreen;
};
