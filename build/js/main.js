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

  var header = (state) => `<section class="game-page">
<header class="game-header">
  <a class="replay-link" href="#">Начать заново</a>
  <p class="game-point">Очки: ${state.score}</p>
</header>`;

  const CARDS_COUNT = 18;

  const getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getImgScr = ()=> {
    const src = [];
    for (let i = 0; i <= 8; i++) {
      src.push(getRandomFromInterval(1, 52));
    }
    return src;
  };

  const cardsNumber = getImgScr();
  const allcardsNumber = [...cardsNumber, ...cardsNumber];

  const getCardsSrc = ()=> {
    const imgSrc = [];
    for (let i = 0; i < CARDS_COUNT; i++) {
      imgSrc[i] = `img/${allcardsNumber[i]}.png`;
    }
    return imgSrc;
  };

  const initialState = {
    score: 0,
    time: 0,
    scr: getCardsSrc()
  };

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
