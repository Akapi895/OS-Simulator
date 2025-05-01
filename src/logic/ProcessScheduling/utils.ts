import { Process, AlgorithmResult, AlgorithmType } from './types';
import { fcfs } from './algorithms/fcfs';
import { sjf } from './algorithms/sjf';
import { sjfPreemptive } from './algorithms/sjfPreemptive';
import { priority } from './algorithms/priority';
import { priorityPreemptive } from './algorithms/priorityPreemptive';
import { rr } from './algorithms/rr';

export function runAlgorithm(
  algorithm: AlgorithmType,
  processes: Process[],
  quantum?: number
): AlgorithmResult {
  switch (algorithm) {
    case 'fcfs': return fcfs(processes);
    case 'sjf': return sjf(processes);
    case 'sjf-preemptive': return sjfPreemptive(processes);
    case 'priority': return priority(processes);
    case 'priority-preemptive': return priorityPreemptive(processes);
    case 'rr': return rr(processes, quantum || 1);
    default: throw new Error('Unknown algorithm');
  }
}