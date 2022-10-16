// xeroxes
// has one copy 2 xeroxes with n,m copies per second
// min time for x copies
function isGoodEnough(
  faster: number,
  slower: number,
  amount: number,
  time: number
): boolean {
  // first copy to include 2nd xerox
  const twoXeroxesTime = time - faster;

  if (twoXeroxesTime <= 0) return false;

  const fasterAmount = Math.trunc(twoXeroxesTime / faster);
  const slowerAmount = Math.trunc(twoXeroxesTime / slower);

  return fasterAmount + slowerAmount + 1 >= amount; // +1 is first copy to include 2nd xerox
}

function minTimeForCopies(
  amount: number,
  speed1: number,
  speed2: number
): number {
  const faster = Math.min(speed1, speed2);
  const slower = Math.max(speed1, speed2);

  let bad = 0;
  let good = slower * amount;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (isGoodEnough(faster, slower, amount, m)) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
}

console.assert(minTimeForCopies(4, 1, 1) === 3);
console.assert(minTimeForCopies(5, 1, 2) === 4);

export {};
