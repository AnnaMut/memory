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

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return getElementFromTemplate(this.template);
    }

    bind() {
    }

  }

  var header = (state) => `<section class="game-page">
<header class="game-header">
  <a class="replay-link" href="#">Начать заново</a>
  <p class="game-point">Очки: ${state.score}</p>
</header>`;

  class GameView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      return `<section class="game-page">
  <ul class="game-list">
    ${[...(this.state.scr)].map((i) => {
    return `<li><img class="close visually-hidden" src="img/closeCard.png" width="110" height="275" alt="Закрытая карта"><img class="open" src="${i}" width="110" height="275" alt="Карта"></li>`;
  }).join(``)}
  </ul>
  </section>`;
    }

    replayButtonClickHandler() {}

    openCardClickHandler() {}

    updateHeader() {}

    bind() {
      this.element.insertBefore(getElementFromTemplate(header(this.state)), this.element.firstChild);

      const replayButton = this.element.querySelector(`.replay-link`);

      replayButton.addEventListener(`click`, () => {
        this.replayButtonClickHandler();
      });

      this.updateHeader = (somestate) => {
        this.element.replaceChild(getElementFromTemplate(header(somestate)), this.element.firstChild);
      };

      this.element.querySelectorAll(`.close`).forEach((item) => {
        item.addEventListener(`click`, (evt) => {
          const chosenCard = evt.target;
          this.openCardClickHandler(chosenCard);
        });
      });
    }
  }

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

  const ONE_SECOND = 1000;

  var gameScreen = (state) => {

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

  class WelcomeView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<section class="start-page">
    <a class="start-img" href="#">
      <img src="img/StartGame.png" width="503" height="262" alt="Раскладка карт">
    </a>
    <h2 class="start-title">MEMORY GAME</h2>
    <button class="start-button" type="button">Начать игру</button>  
    </section>`;
    }

    startButtonClickHandler() {}

    bind() {
      const startButton = this.element.querySelector(`.start-button`);

      startButton.addEventListener(`click`, () => {
        this.startButtonClickHandler();
      });

    }
  }

  var welcomeScreen = (state) => {
    const screen = new WelcomeView(state);

    screen.startButtonClickHandler = () => {
      changeScreen(gameScreen(initialState));
    };

    return screen.element;
  };

  changeScreen(welcomeScreen());

}());

//# sourceMappingURL=main.js.map
