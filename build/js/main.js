(function () {
  'use strict';

  const mainElement = document.querySelector(`.central`);

  const getElementFromTemplate = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  const changeScreen = (element) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(element);
  };

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

  const content$1 = `<section class="start-page">
<a class="start-img" href="#">
  <img src="img/StartGame.png" width="503" height="262" alt="Раскладка карт">
</a>
<h2 class="start-title">MEMORY GAME</h2>
<button class="start-button" type="button">Начать игру</button>  
</section>`;

  const welcomeScreen = getElementFromTemplate(content$1);

  const startButton = welcomeScreen.querySelector(`.start-button`);

  const startButtonClickHandler = ()=> {
    changeScreen(gameScreen);
  };

  startButton.addEventListener(`click`, startButtonClickHandler);

  changeScreen(welcomeScreen);

}());

//# sourceMappingURL=main.js.map
