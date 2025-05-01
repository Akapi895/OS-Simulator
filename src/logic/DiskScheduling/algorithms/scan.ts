import { AlgorithmResult, IdleSegment } from '../types';

export const scan = (
  startPosition: number, 
  maxTrack: number, 
  requests: number[], 
  direction: 'up' | 'down'
): AlgorithmResult => {
  let path = [startPosition];
  let totalDistance = 0;
  let reqs = [...requests].sort((a, b) => a - b);
  let left = reqs.filter(r => r < startPosition).reverse();
  let right = reqs.filter(r => r >= startPosition);

  const idleSegments: IdleSegment[] = [];

  if (direction === 'down') {
    // Đi xuống: về phía 0, rồi quay lại bên phải
    for (let r of left) path.push(r);

    if ((left.length === 0 || left[0] !== 0) && startPosition !== 0) path.push(0);

    if (right.length > 0 && (path[path.length - 1] !== right[0])) {
      idleSegments.push({
        from: path[path.length - 1],
        to: right[0],
        fromIdx: path.length - 1,
        toIdx: path.length,
      });
    }

    for (let r of right) path.push(r);
  } else {
    // Đi lên: về phía maxTrack-1, rồi quay lại bên trái
    for (let r of right) path.push(r);

    if ((right.length === 0 || right[right.length - 1] !== maxTrack - 1) && startPosition !== maxTrack - 1) path.push(maxTrack - 1);

    if (left.length > 0 && (path[path.length - 1] !== left[0])) {
      idleSegments.push({
        from: path[path.length - 1],
        to: left[0],
        fromIdx: path.length - 1,
        toIdx: path.length,
      });
    }

    for (let r of left) path.push(r);
  }

  for (let i = 1; i < path.length; i++) {
    totalDistance += Math.abs(path[i] - path[i - 1]);
  }
  return { path, totalDistance, idleSegments };
};