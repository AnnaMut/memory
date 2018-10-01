import AbstractView from './abstract-view';

export default class WelcomeView extends AbstractView {
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
