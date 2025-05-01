import { fcfs } from './algorithms/fcfs';
import { sstf } from './algorithms/sstf';
import { scan } from './algorithms/scan';
import { cscan } from './algorithms/cscan';
import { look } from './algorithms/look';
import { clook } from './algorithms/clook';
import { AlgorithmResult } from './types';

export function runAlgorithm(
  algorithm: string,
  startPosition: number,
  maxTrack: number,
  requests: number[],
  direction: 'up' | 'down'
): AlgorithmResult {
  switch (algorithm) {
    case 'fcfs':
      return fcfs(startPosition, maxTrack, requests, direction);
    case 'sstf':
      return sstf(startPosition, maxTrack, requests, direction);
    case 'scan':
      return scan(startPosition, maxTrack, requests, direction);
    case 'cscan':
      return cscan(startPosition, maxTrack, requests, direction);
    case 'look':
      return look(startPosition, maxTrack, requests, direction);
    case 'clook':
      return clook(startPosition, maxTrack, requests, direction);
    default:
      throw new Error('Unknown algorithm');
  }
}