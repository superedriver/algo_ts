const isGoodEnough = (
  timeLeft: number,
  calculatedTaskAmount: number,
): boolean => {
  const timeToSolve =
    5 * (((1 + calculatedTaskAmount) * calculatedTaskAmount) / 2);

  return timeLeft - timeToSolve >= 0;
};

// Limak participates in a programming contest from 20:00 to 00:00 (4 hours).
// He needs 5*i minutes to solve task i. He needs k minutes to get to a party.
// Find the maximum number of tasks he can solve without being late to the party.
export const findMaxTaskAmount = (
  allTasksAmount: number,
  timeToParty: number,
): number => {
  let bad = 0;
  let good = allTasksAmount + 1;
  const allTime = 60 * 4; //Start at 20:00 finish at 00:00
  const timeLeft = allTime - timeToParty;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);
    console.log("m: ", m);
    console.log("isGoodEnough m: ", isGoodEnough(timeLeft, m));
    if (isGoodEnough(timeLeft, m)) {
      bad = m;
    } else {
      good = m;
    }
  }

  return bad;
};
