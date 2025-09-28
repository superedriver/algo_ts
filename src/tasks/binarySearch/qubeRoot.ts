// a > 0
export const qubeRoot = (a: number) => {
  let bad = -1;
  let good = a + 1;

  while (good - bad > 0.001) {
    const m = (good + bad) / 2;

    if (m * m * m >= a) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
};
