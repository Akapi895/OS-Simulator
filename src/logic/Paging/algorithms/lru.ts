import { PagingResult } from '../types';

export function lru(pages: string[], frames: number): PagingResult {
  let memory: (string | null)[] = Array(frames).fill(null);
  let faults = 0, hits = 0, idx = 0;
  const stack: string[] = [];
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let hit = memory.includes(page);
    let replaced: string | null = null;

    if (!hit) {
      if (memory.includes(null)) {
        memory[memory.indexOf(null)] = page;
        stack.push(page);
        idx++;
      } else {
        const lruPage = stack.shift()!;
        replaced = lruPage;
        memory[memory.indexOf(lruPage)] = page;
        stack.push(page);
      }
      faults++;
    } else {
      hits++;
      stack.splice(stack.indexOf(page), 1);
      stack.push(page);
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