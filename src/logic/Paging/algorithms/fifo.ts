import { PagingResult } from '../types';

export function fifo(pages: string[], frames: number): PagingResult {
  let memory: (string | null)[] = Array(frames).fill(null);
  let faults = 0, hits = 0, idx = 0;
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let hit = memory.includes(page);
    let replaced: string | null = null;

    if (!hit) {
      replaced = memory[idx % frames] ?? null;
      memory[idx % frames] = page;
      faults++;
      idx++;
    } else {
      hits++;
    }
    steps.push({
      step: i + 1,
      page,
      frames: [...memory],
      hit,
      replaced: hit ? undefined : replaced,
    });
  }

  return {
    steps,
    totalHit: hits,
    totalFault: faults,
  };
}