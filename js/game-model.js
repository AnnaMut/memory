import {initialState, CARDS_COUNT} from './game-data';

export default class GameModel {
  constructor() {
    this.restart();
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = Object.assign({}, initialState);
  }

  win() {
    return this._state.answers.length === CARDS_COUNT;
  }

  getAnswers() {

  }

  tick() {
    this._state = Object.assign({}, this.state, {time: this._state.time + 1});
  }

}
