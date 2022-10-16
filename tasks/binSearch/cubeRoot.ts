function cubeRoot(value: number): number {
  let bad = -1;
  let good = value + 1;

  while(good - bad > 0.00001) {
    const m = (good + bad)/2;

    if(m*m*m >= value) {
      good = m;
    } else {
      bad = m;
    }
  }

  return Math.trunc(good * 10000) / 10000;
}

console.assert(cubeRoot(1000) === 10, "one");
console.assert(cubeRoot(27) === 3, "two");
console.assert(cubeRoot(21) === 2.7589, "three");

export {}
