import { Process, AlgorithmResult } from '../types';

export function sjf(processes: Process[]): AlgorithmResult {
  const n = processes.length;
  const proc = [...processes];
  let time = 0, completed = 0;
  const isDone = Array(n).fill(false);
  const ganttChart: { id: string; start: number; end: number }[] = [];
  const waitingTimes: number[] = Array(n).fill(0);
  const turnaroundTimes: number[] = Array(n).fill(0);
  const responseTimes: number[] = Array(n).fill(-1);
  const completionTimes: number[] = Array(n).fill(0);

  while (completed < n) {
    // Tìm process có arrivalTime <= time, chưa xong, duration nhỏ nhất
    let idx = -1, minBurst = Infinity;
    for (let i = 0; i < n; i++) {
      if (!isDone[i] && proc[i].arrivalTime <= time && proc[i].duration < minBurst) {
        minBurst = proc[i].duration;
        idx = i;
      }
    }
    if (idx === -1) {
      const nextArr = Math.min(...proc.filter((_, i) => !isDone[i]).map(p => p.arrivalTime));
      if (time < nextArr) {
        ganttChart.push({ id: '__', start: time, end: nextArr });
        time = nextArr;
      } else {
        time++;
      }
      continue;
    }
    const start = time;
    const end = time + proc[idx].duration;
    ganttChart.push({ id: proc[idx].id, start, end });
    waitingTimes[idx] = start - proc[idx].arrivalTime;
    turnaroundTimes[idx] = end - proc[idx].arrivalTime;
    responseTimes[idx] = start - proc[idx].arrivalTime;
    completionTimes[idx] = end;
    time = end;
    isDone[idx] = true;
    completed++;
  }

  // Đảm bảo waiting time không âm
  for (let i = 0; i < n; i++) {
    waitingTimes[i] = Math.max(0, waitingTimes[i]);
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