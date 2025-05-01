import { Process, AlgorithmResult } from '../types';

export function sjfPreemptive(processes: Process[]): AlgorithmResult {
  const n = processes.length;
  const proc = [...processes];
  const remaining = proc.map(p => p.duration);
  let time = 0, completed = 0;
  const isStarted = Array(n).fill(false);
  const isDone = Array(n).fill(false);
  const ganttChart: { id: string; start: number; end: number }[] = [];
  const waitingTimes: number[] = Array(n).fill(0);
  const turnaroundTimes: number[] = Array(n).fill(0);
  const responseTimes: number[] = Array(n).fill(-1);
  const completionTimes: number[] = Array(n).fill(0);

  let lastId: string | null = null;
  let blockStart = 0;

  while (completed < n) {
    let idx = -1, minRem = Infinity;
    for (let i = 0; i < n; i++) {
      if (!isDone[i] && proc[i].arrivalTime <= time && remaining[i] > 0 && remaining[i] < minRem) {
        minRem = remaining[i];
        idx = i;
      }
    }
    if (idx === -1) {
      const nextArr = Math.min(...proc.filter((_, i) => !isDone[i] && remaining[i] > 0).map(p => p.arrivalTime));
      if (time < nextArr && nextArr !== Infinity) {
        ganttChart.push({ id: '__', start: time, end: nextArr });
        time = nextArr;
      } else {
        time++;
      }
      continue;
    }
    if (!isStarted[idx]) {
      responseTimes[idx] = time - proc[idx].arrivalTime;
      isStarted[idx] = true;
    }
    if (lastId !== proc[idx].id) {
      if (lastId !== null) {
        ganttChart.push({ id: lastId, start: blockStart, end: time });
      }
      blockStart = time;
      lastId = proc[idx].id;
    }
    remaining[idx]--;
    time++;
    if (remaining[idx] === 0) {
      isDone[idx] = true;
      completed++;
      turnaroundTimes[idx] = time - proc[idx].arrivalTime;
      waitingTimes[idx] = Math.max(0, turnaroundTimes[idx] - proc[idx].duration);
      completionTimes[idx] = time;
    }
  }
  if (lastId !== null) {
    ganttChart.push({ id: lastId, start: blockStart, end: time });
  }

  const avgWaitingTime = waitingTimes.reduce((a, b) => a + b, 0) / n;
  const avgTurnaroundTime = turnaroundTimes.reduce((a, b) => a + b, 0) / n;

  return {
    ganttChart,
    waitingTimes,
    turnaroundTimes,
    responseTimes,
    completionTimes,
    avgWaitingTime,
    avgTurnaroundTime,
  };
}