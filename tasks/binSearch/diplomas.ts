// diplomas
// k - amount, w/h, min square board
const isGoodEnough = (
  width: number,
  height: number,
  amount: number,
  side: number
): boolean => {

  return Math.trunc(side / width) * Math.trunc(side / height) >= amount;
}

function diplomasBorder(width: number, height: number, amount: number) {
  const biggerSide = width > height ? width : height;

  let bad = 0;
  let good = biggerSide * amount;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (isGoodEnough(width, height, amount, m)) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
}

console.assert(diplomasBorder(5, 6, 1) === 6);
console.assert(diplomasBorder(5, 6, 2) === 10);
console.assert(diplomasBorder(2, 3, 10) === 9);


export {}
