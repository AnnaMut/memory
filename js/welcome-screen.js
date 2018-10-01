import {changeScreen} from './render';
import gameScreen from './game-screen';
import {initialState} from './game-data';
import WelcomeView from './view/welcome-view';

export default (state) => {
  const screen = new WelcomeView(state);

  screen.startButtonClickHandler = () => {
    changeScreen(gameScreen(initialState));
  };

  return screen.element;
};

