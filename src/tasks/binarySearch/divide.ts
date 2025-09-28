// a>0, b>0, a > b
// divide a/b

export const divideLinear = (a: number, b: number): number => {
  let result = 0;

  while (a >= b) {
    a -= b;
    result++;
  }

  return result;
};

export const divideBinary = (a: number, b: number): number => {
  let bad = -1;
  let good = a + 1;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);
    if (m * b >= a) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
};

export const divideBinaryAccuracy = (a: number, b: number): number => {
  let bad = -1;
  let good = a + 1;

  while (good - bad > 0.001) {
    const m = (good + bad) / 2;

    if (m * b >= a) {
      good = m;
    } else {
      bad = m;
    }
  }
  return good;
};
