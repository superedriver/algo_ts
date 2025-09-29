const isGoodEnough = ({
  oneSecAmount,
  inetSpeed,
  videoDuration,
  timeToCheck,
}: {
  oneSecAmount: number;
  inetSpeed: number;
  videoDuration: number;
  timeToCheck: number;
}): boolean => {
  const allFrames = oneSecAmount * videoDuration;
  const readyFrames = timeToCheck * inetSpeed;
  const leftFrames = videoDuration * inetSpeed;

  return leftFrames >= allFrames - readyFrames;
};

// Input
// Three integers a, b, and c separated by spaces (1 ≤ a, b, c ≤ 1000, a > b).
// a: data needed to play 1 second of video
// b: data downloaded per second
// c: video length in seconds
//
// Output
// Print one integer — the minimal whole number of seconds to wait before starting so the video can be watched to the end without buffering.
export const footballMatch = (
  oneSecAmount: number,
  inetSpeed: number,
  videoDuration: number,
) => {
  const allFrames = oneSecAmount * videoDuration;
  const timeFullVideoDownload = allFrames / inetSpeed;

  let bad = 0;
  let good = timeFullVideoDownload + 1;

  while (good - bad > 1) {
    const m = Math.trunc((bad + good) / 2);

    if (
      isGoodEnough({
        oneSecAmount,
        inetSpeed,
        videoDuration,
        timeToCheck: m,
      })
    ) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
};
