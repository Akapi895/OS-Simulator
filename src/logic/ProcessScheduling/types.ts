export interface Process {
    id: string;
    arrivalTime: number;
    duration: number;
    priority?: number;
  }
  
  export interface AlgorithmResult {
    ganttChart: { id: string; start: number; end: number }[];
    waitingTimes: number[];
    turnaroundTimes: number[];
    responseTimes: number[];
    completionTimes: number[];
    avgWaitingTime: number;
    avgTurnaroundTime: number;
  }
  
  export type AlgorithmType =
    | 'fcfs'
    | 'sjf'
    | 'sjf-preemptive'
    | 'priority'
    | 'priority-preemptive'
    | 'rr';