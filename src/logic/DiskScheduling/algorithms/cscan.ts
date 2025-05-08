import { AlgorithmResult, IdleSegment } from '../types';

export const cscan = (
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
    // Đi lên: về phía maxTrack-1, rồi quay về 0 và tiếp tục
    for (let r of right) path.push(r);

    if ((right.length === 0 || right[right.length - 1] !== maxTrack - 1) && startPosition !== maxTrack - 1) {
      path.push(maxTrack - 1);
    }

    if (left.length > 0) {
      idleSegments.push({
        from: path[path.length - 1],
        to: 0,
        fromIdx: path.length - 1,
        toIdx: path.length,
      });
      if (
        (left.length === 0 || !left.includes(0)) &&
        startPosition !== 0
      ) {
        path.push(0);
      }
    }

    for (let r of left) path.push(r);
  } else {
    // Đi xuống: về phía 0, rồi quay về maxTrack-1 và tiếp tục
    left = left.sort((a, b) => b - a);
    right = right.sort((a, b) => b - a);

    for (let r of left) path.push(r);

    // Chỉ thêm 0 nếu chưa có request ở 0 và startPosition != 0
    if (
      (left.length === 0 || !left.includes(0)) &&
      startPosition !== 0
    ) {
      path.push(0);
    }

    if (right.length > 0) {
      idleSegments.push({
        from: path[path.length - 1],
        to: maxTrack - 1,
        fromIdx: path.length - 1,
        toIdx: path.length,
      });
      path.push(maxTrack - 1);
    }

    for (let r of right) path.push(r);
  }

  for (let i = 1; i < path.length; i++) {
    totalDistance += Math.abs(path[i] - path[i - 1]);
  }

  if (idleSegments.length > 0) {
    totalDistance -= (maxTrack - 1);
  }

  return { path, totalDistance, idleSegments };
};

