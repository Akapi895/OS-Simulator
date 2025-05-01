export type PagingAlgorithm = 'fifo' | 'lru' | 'mru' | 'lfu' | 'mfu' | 'optimal' | 'second-chance';

export interface PagingStep {
  step: number;
  page: string;
  frames: (string | null)[];
  hit: boolean;
  replaced?: string | null;
  frequency?: (number | string)[];
  referenceBits?: (number | string)[];
  nextUse?: (number | string)[];
}

export interface PagingResult {
  steps: PagingStep[];
  totalHit: number;
  totalFault: number;
}