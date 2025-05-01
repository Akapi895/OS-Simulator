import { AlgorithmResult } from '../types';

interface SSTFResult extends AlgorithmResult {
  starvationSteps: number[];
}

export const sstf = (
  startPosition: number, 
  maxTrack: number, 
  requests: number[], 
  direction: 'up' | 'down'
): SSTFResult => {
  // Kiểm tra đầu vào
  if (!requests || requests.length === 0) {
    return { path: [startPosition], totalDistance: 0, starvationSteps: [] };
  }
  if (
    startPosition < 0 ||
    startPosition > maxTrack ||
    requests.some(r => r < 0 || r > maxTrack)
  ) {
    throw new Error('Invalid input: startPosition or requests out of bounds');
  }

  let current = startPosition;
  let reqs = [...requests];
  const path = [current];
  let totalDistance = 0;

  while (reqs.length) {
    let minDist = Infinity;
    let nextIdx = -1;
    for (let i = 0; i < reqs.length; i++) {
      const dist = Math.abs(reqs[i] - current);
      if (dist < minDist) {
        minDist = dist;
        nextIdx = i;
      }
    }
    current = reqs[nextIdx];
    totalDistance += minDist;
    path.push(current);
    reqs.splice(nextIdx, 1);
  }

  // Xác định starvation: đoạn nào đi qua startPosition mà không dừng lại
  const threshold = 3;
  const starvationSteps: number[] = [];
  let lastPassedStep = 0;

  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i];
    // Nếu đi qua startPosition mà không dừng lại
    if (
      ((a < startPosition && b > startPosition) || (a > startPosition && b < startPosition)) &&
      a !== startPosition && b !== startPosition
    ) {
      // Nếu số bước kể từ lần cuối cùng đi qua startPosition lớn hơn threshold
      if (i - lastPassedStep > threshold) {
        starvationSteps.push(i);
      }
      lastPassedStep = i;
    }
  }
  console.log('MaxTrack:', maxTrack, 'StartPosition:', startPosition, 'Direction:', direction);

  return { path, totalDistance, starvationSteps };
};