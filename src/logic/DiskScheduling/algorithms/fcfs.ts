import { AlgorithmResult } from '../types';

export const fcfs = (
  startPosition: number, 
  maxTrack: number, 
  requests: number[], 
  direction: 'up' | 'down'
): AlgorithmResult => {
  const path = [startPosition, ...requests];
  let totalDistance = 0;
  for (let i = 1; i < path.length; i++) {
    totalDistance += Math.abs(path[i] - path[i - 1]);
  }
  
  console.log('MaxTrack:', maxTrack, 'StartPosition:', startPosition, 'Direction:', direction);
  return { path, totalDistance };
};