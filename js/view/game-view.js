import AbstractView from './abstract-view';
import {getElementFromTemplate} from '../render';
import header from '../header';

export default class GameView extends AbstractView {
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

  bind() {
    this.element.insertBefore(getElementFromTemplate(header(this.state)), this.element.firstChild);

    const replayButton = this.element.querySelector(`.replay-link`);

    replayButton.addEventListener(`click`, () => {
      this.replayButtonClickHandler();
    });

    this.element.querySelectorAll(`.close`).forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const chosenCard = evt.target;
        this.openCardClickHandler(chosenCard);
      });
    });
  }
}

