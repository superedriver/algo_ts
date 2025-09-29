// a > 0
export const qubeRoot = (a: number): number => {
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

const MAX_DIVIDE_OPERATIONS = 100;
export const qubeRootMaxPrecisionCycle = (a: number): number => {
  let bad = -1;
  let good = a + 1;

  for (let i = 0; i < MAX_DIVIDE_OPERATIONS; i++) {
    const m = (good + bad) / 2;

    if (m * m * m >= a) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
};

export const qubeRootMaxPrecision = (a: number): number => {
  let bad = -1;
  let good = a + 1;

  let m = (good + bad) / 2;
  while (m !== good && m !== bad) {
    if (m * m * m >= a) {
      good = m;
    } else {
      bad = m;
    }

    m = (good + bad) / 2;
  }

  return good;
};
