import { PagingResult } from '../types';

export function optimal(pages: string[], frames: number): PagingResult {
  let memory: (string | null)[] = Array(frames).fill(null);
  let faults = 0, hits = 0;
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let hit = memory.includes(page);
    let replaced: string | null = null;

    if (!hit) {
      if (memory.includes(null)) {
        memory[memory.indexOf(null)] = page;
      } else {
        // Find the page with the farthest next use
        let farthest = -1, idxToReplace = -1;
        for (let j = 0; j < frames; j++) {
          const nextUse = pages.slice(i + 1).indexOf(memory[j]!);
          if (nextUse === -1) {
            idxToReplace = j;
            break;
          }
          if (nextUse > farthest) {
            farthest = nextUse;
            idxToReplace = j;
          }
        }
        replaced = memory[idxToReplace]!;
        memory[idxToReplace] = page;
      }
      faults++;
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