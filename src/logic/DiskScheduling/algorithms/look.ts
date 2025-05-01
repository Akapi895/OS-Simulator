import { AlgorithmResult, IdleSegment } from '../types';

export const look = (
  startPosition: number, 
  maxTrack: number, 
  requests: number[], direction: 'up' | 'down'): AlgorithmResult => {
  let path = [startPosition];
  let totalDistance = 0;
  let reqs = [...requests].sort((a, b) => a - b);
  let left = reqs.filter(r => r < startPosition).reverse();
  let right = reqs.filter(r => r >= startPosition);

  const idleSegments: IdleSegment[] = [];

  if (direction === 'up') {
    // Đi qua các request bên phải trước
    for (let r of right) path.push(r);

    // Nếu còn request bên trái, kiểm tra có cần nhảy không
    if (left.length > 0 && right.length > 0) {
      if (path[path.length - 1] !== left[0]) {
        idleSegments.push({
          from: path[path.length - 1],
          to: left[0],
          fromIdx: path.length - 1,
          toIdx: path.length,
        });
      }
    }

    // Đi qua các request bên trái
    for (let r of left) path.push(r);
  } else {
    // Đi qua các request bên trái trước
    for (let r of left) path.push(r);

    // Nếu còn request bên phải, kiểm tra có cần nhảy không
    if (left.length > 0 && right.length > 0) {
      if (path[path.length - 1] !== right[0]) {
        idleSegments.push({
          from: path[path.length - 1],
          to: right[0],
          fromIdx: path.length - 1,
          toIdx: path.length,
        });
      }
    }

    // Đi qua các request bên phải
    for (let r of right) path.push(r);
  }

  for (let i = 1; i < path.length; i++) {
    totalDistance += Math.abs(path[i] - path[i - 1]);
  }
  console.log('MaxTrack:', maxTrack, 'StartPosition:', startPosition, 'Direction:', direction);

  return { path, totalDistance, idleSegments };
};