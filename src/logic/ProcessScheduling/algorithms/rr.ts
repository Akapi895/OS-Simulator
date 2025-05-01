import { Process, AlgorithmResult } from '../types';

export function rr(processes: Process[], quantum: number): AlgorithmResult {
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

  const queue: number[] = [];
  // Sort by arrivalTime, then id
  const order = proc.map((_, i) => i).sort((a, b) => {
    if (proc[a].arrivalTime !== proc[b].arrivalTime) return proc[a].arrivalTime - proc[b].arrivalTime;
    const na = Number(proc[a].id.replace(/\D/g, ''));
    const nb = Number(proc[b].id.replace(/\D/g, ''));
    return na - nb;
  });

  let nextArrIdx = 0;
  time = proc[order[0]].arrivalTime;
  queue.push(order[0]);
  nextArrIdx = 1;

  while (completed < n) {
    if (queue.length === 0) {
      if (nextArrIdx < n) {
        if (time < proc[order[nextArrIdx]].arrivalTime) {
          ganttChart.push({ id: '__', start: time, end: proc[order[nextArrIdx]].arrivalTime });
          time = proc[order[nextArrIdx]].arrivalTime;
        }
        queue.push(order[nextArrIdx]);
        nextArrIdx++;
      } else {
        break;
      }
    }
    const idx = queue.shift()!;
    if (remaining[idx] <= 0) continue; // Bỏ qua nếu đã xong

    if (!isStarted[idx]) {
      responseTimes[idx] = time - proc[idx].arrivalTime;
      isStarted[idx] = true;
    }
    // Thực thi quantum hoặc đến khi xong
    const exec = Math.min(quantum, remaining[idx]);
    if (exec > 0) {
      ganttChart.push({ id: proc[idx].id, start: time, end: time + exec });
      time += exec;
      remaining[idx] -= exec;
    }

    // Push newly arrived processes to queue
    while (nextArrIdx < n && proc[order[nextArrIdx]].arrivalTime <= time) {
      if (!queue.includes(order[nextArrIdx]) && !isDone[order[nextArrIdx]]) {
        queue.push(order[nextArrIdx]);
      }
      nextArrIdx++;
    }

    if (remaining[idx] > 0) {
      queue.push(idx);
    } else if (!isDone[idx]) {
      isDone[idx] = true;
      completed++;
      turnaroundTimes[idx] = time - proc[idx].arrivalTime;
      waitingTimes[idx] = Math.max(0, turnaroundTimes[idx] - proc[idx].duration);
      completionTimes[idx] = time;
    }
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