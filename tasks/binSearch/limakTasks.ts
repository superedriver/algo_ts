// limak tasks
// has 4hours (240 minutes). taskAmount, timeToHome. task solve - 5*i minutes
// max solved task amount
function isGoodEnough(timeToHome: number, taskAmount: number): boolean {
  const leftTimeForTasks = 240 - timeToHome;
  const timeForSolving = ((5 + taskAmount * 5) * taskAmount) / 2;

  return leftTimeForTasks >= timeForSolving;
}

function limakTasks(taskAmount: number, timeToHome: number): number {
  let good = 0; //canSolve
  let bad = taskAmount + 1; //can not solve

  while (bad - good > 1) {
    const m = Math.trunc((good + bad) / 2);
    if (isGoodEnough(timeToHome, m)) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
}

console.assert(limakTasks(3, 222) === 2);
console.assert(limakTasks(4, 190) === 4);
console.assert(limakTasks(7, 1) === 7);

export {};
