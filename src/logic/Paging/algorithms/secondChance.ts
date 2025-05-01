import { PagingResult } from '../types';

export function secondChance(pages: string[], frames: number): PagingResult {
  let memory: (string | null)[] = Array(frames).fill(null);
  let referenceBits: (number | string)[] = Array(frames).fill('');
  let pointer = 0, faults = 0, hits = 0;
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let hit = memory.includes(page);
    let replaced: string | null = null;

    if (hit) {
      hits++;
      referenceBits[memory.indexOf(page)] = 1;
    } else {
      while (true) {
        if (referenceBits[pointer] === '' || referenceBits[pointer] === 0) {
          replaced = memory[pointer] ?? null;
          memory[pointer] = page;
          referenceBits[pointer] = 1;
          pointer = (pointer + 1) % frames;
          break;
        } else {
          referenceBits[pointer] = 0;
          pointer = (pointer + 1) % frames;
        }
      }
      faults++;
    }
    steps.push({
      step: i + 1,
      page,
      frames: [...memory],
      hit,
      replaced: hit ? undefined : replaced,
      referenceBits: [...referenceBits],
    });
  }

  return {
    steps,
    totalHit: hits,
    totalFault: faults,
  };
}