import {getElementFromTemplate, changeScreen} from './render';
import welcomeScreen from './welcome-screen';

export default (state) => {
  const content = `<section class="stats-page">
<a class="stats-img" href="#">
  <img src="img/stats.png" width="516" height="275" alt="Раскладка карт">
</a>
<p class="stats-title">Поздравляем!</p> 
<p class="stats-stats">Ваш итоговый счет:${state.score}</p>
<button class="stats-button" type="button">Еще раз</button>   
</section>`;

  const resultScreen = getElementFromTemplate(content);

  const replayButton = resultScreen.querySelector(`.stats-button`);

  const replayButtonClickHandler = ()=> {
    changeScreen(welcomeScreen());
  };

  replayButton.addEventListener(`click`, replayButtonClickHandler);

  return resultScreen;
};
