const isGoodEnough = (
  timeCopy1: number,
  timeCopy2: number,
  copiesAmount: number,
  calculatedTime: number,
): boolean => {
  const fastestTime = Math.min(timeCopy1, timeCopy2);
  // 1st copy to have a possibility to use 2 xeroxes
  const timeLeft = calculatedTime - fastestTime;

  if (timeLeft <= 0) return false;

  return (
    Math.trunc(timeLeft / timeCopy1) + Math.trunc(timeLeft / timeCopy2) + 1 >=
    copiesAmount
  );
};

/**
 * Calculates the minimum time to make all copies using two xerox machines
 * @param timeCopy1 - time to make copy by xerox1
 * @param timeCopy2 - time to make copy by xerox2
 * @param copiesAmount - total number of copies needed
 * @returns minimum time in minutes
 */
export const findMinCopyTime = (
  timeCopy1: number,
  timeCopy2: number,
  copiesAmount: number,
): number => {
  let bad = 0;
  let good = Math.min(timeCopy1, timeCopy2) * copiesAmount;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (isGoodEnough(timeCopy1, timeCopy2, copiesAmount, m)) {
      good = m;
    } else {
      bad = m;
    }
  }
  return good;
};
