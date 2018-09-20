import {getElementFromTemplate, changeScreen} from './render';
import welcomeScreen from './welcome-screen';

const content = `<section class="game-page">
<header class="game-header">
  <a class="replay-link" href="#">Начать заново</a>
  <p class="game-point">Очки:</p>
</header>
<ul class="game-list">
  <li><img class="close" src="img/closeCard.png" width="110" height="275" alt="Закрытая карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
  <li><img src="img/5H.png" width="110" height="275" alt="Карта"></li>
</ul>
</section>`;

const gameScreen = getElementFromTemplate(content);

const replayButton = gameScreen.querySelector(`.replay-link`);

const replayButtonClickHandler = ()=> {
  changeScreen(welcomeScreen);
};

replayButton.addEventListener(`click`, replayButtonClickHandler);

export default gameScreen;
