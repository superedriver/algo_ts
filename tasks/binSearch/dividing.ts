// a>0, b>0
// divide

function divideCycle(a: number, b: number): number {
  let result = 0;
  while (a >= b) {
    a -= b;
    result += 1;
  }

  return result;
}

console.assert(divideCycle(100, 10) === 10, "one");
console.assert(divideCycle(100, 3) === 33, "two");

function divideBinary(a: number, b: number): number {
  let bad = -1;
  let good = a + 1;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (b * m >= a) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
}

console.assert(divideBinary(100, 10) === 10, "three");
console.assert(divideCycle(100, 3) === 33, "four");

function divideBinaryAccuracy(a: number, b: number): number {
  let bad = -1;
  let good = a + 1;

  while (good - bad > 0.0001) {
    const m = (good + bad) / 2;

    if (b * m >= a) {
      good = m;
    } else {
      bad = m;
    }
  }

  return Math.trunc(good * 1000) / 1000;
}
console.assert(divideBinaryAccuracy(100, 10) === 10, "five");
console.assert(divideBinaryAccuracy(6, 4) === 1.5, "six");
console.assert(divideBinaryAccuracy(100, 3) === 33.333, "seven");
