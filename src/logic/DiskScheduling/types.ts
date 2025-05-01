export interface IdleSegment {
    from: number;
    to: number;
    fromIdx: number;
    toIdx: number;
  }
  
  export interface AlgorithmResult {
    path: number[];
    totalDistance: number;
    starvationSteps?: number[];
    idleSegments?: IdleSegment[];
  }