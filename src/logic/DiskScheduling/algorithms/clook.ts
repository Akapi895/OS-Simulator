import { AlgorithmResult, IdleSegment } from '../types';

export const clook = (
  startPosition: number,
  maxTrack: number,
  requests: number[],
  direction: 'up' | 'down'
): AlgorithmResult => {
  let path = [startPosition];
  let totalDistance = 0;
  let reqs = [...requests].sort((a, b) => a - b);
  let right = reqs.filter(r => r >= startPosition);
  let left = reqs.filter(r => r < startPosition);

  const idleSegments: IdleSegment[] = [];

  if (direction === 'up') {
    console.log('Đi lên');
    for (let r of right) path.push(r);

    if (left.length > 0) {
      idleSegments.push({
        from: path[path.length - 1],
        to: left[0],
        fromIdx: path.length - 1,
        toIdx: path.length,
      });
      path.push(left[0]);
    }
    for (let i = 1; i < left.length; i++) {
      path.push(left[i]);
    }
  } else {
    console.log('Đi xuống');
    left = left.sort((a, b) => b - a);
    right = right.sort((a, b) => b - a);

    for (let r of left) path.push(r);

    if (right.length > 0) {
      idleSegments.push({
        from: path[path.length - 1],
        to: right[0],
        fromIdx: path.length - 1,
        toIdx: path.length,
      });
      path.push(right[0]);
    }
    for (let i = 1; i < right.length; i++) {
      path.push(right[i]);
    }
  }

  // Tính tổng quãng đường
  for (let i = 1; i < path.length; i++) {
    totalDistance += Math.abs(path[i] - path[i - 1]);
  }

  if (idleSegments.length > 0) {
    totalDistance -= (Math.abs(idleSegments[0].to - idleSegments[0].from));
  }
  console.log('MaxTrack:', maxTrack, 'StartPosition:', startPosition, 'Direction:', direction);

  return { path, totalDistance, idleSegments };
};