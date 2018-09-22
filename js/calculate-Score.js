export const calculateScore = (answer, card) => {
  let score = 0;
  if (answer.correct) {
    score += (card.closed * 42);
  }
  score -= 84;
  return score;
};
