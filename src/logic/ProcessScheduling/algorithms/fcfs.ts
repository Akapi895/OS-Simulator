import { Process, AlgorithmResult } from '../types';

export function fcfs(processes: Process[]): AlgorithmResult {
  const sorted = [...processes].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
    const na = Number(a.id.replace(/\D/g, ''));
    const nb = Number(b.id.replace(/\D/g, ''));
    return na - nb;
  });

  let time = 0;
  const ganttChart: { id: string; start: number; end: number }[] = [];
  const waitingTimes: number[] = [];
  const turnaroundTimes: number[] = [];
  const responseTimes: number[] = [];
  const completionTimes: number[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    // Nếu CPU rảnh, ghi nhận block __
    if (time < p.arrivalTime) {
      ganttChart.push({ id: '__', start: time, end: p.arrivalTime });
      time = p.arrivalTime;
    } else {
      const idx = sorted.findIndex((proc, index) => !completionTimes[index] && proc.arrivalTime <= time);
      if (idx === -1) {
        // Tìm arrivalTime tiếp theo
        const nextArr = Math.min(...sorted.filter((_, i) => !completionTimes[i]).map(p => p.arrivalTime));
        if (time < nextArr) {
          ganttChart.push({ id: '__', start: time, end: nextArr });
          time = nextArr;
        } else {
          time++;
        }
        continue;
      }
    }
    const start = time;
    const end = time + p.duration;
    ganttChart.push({ id: p.id, start, end });

    const response = start - p.arrivalTime;
    responseTimes.push(response);
    const turnaround = end - p.arrivalTime;
    turnaroundTimes.push(turnaround);
    const waiting = Math.max(0, turnaround - p.duration);
    waitingTimes.push(waiting);
    completionTimes.push(end);

    time = end;
  }

  const avgWaitingTime = waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length;
  const avgTurnaroundTime = turnaroundTimes.reduce((a, b) => a + b, 0) / turnaroundTimes.length;

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