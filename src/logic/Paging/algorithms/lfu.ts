import { PagingResult } from '../types';

export function lfu(pages: string[], frames: number): PagingResult {
  let memory: (string | null)[] = Array(frames).fill(null);
  let faults = 0, hits = 0;
  const frequency: Record<string, number> = {};
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    frequency[page] = (frequency[page] || 0) + 1;
    let hit = memory.includes(page);
    let replaced: string | null = null;

    if (!hit) {
      if (memory.includes(null)) {
        memory[memory.indexOf(null)] = page;
      } else {
        // Find LFU page (if tie, replace the first found)
        let minFreq = Math.min(...memory.map(p => (p !== null ? frequency[p] : Infinity)));
        let lfuIdx = memory.findIndex(p => p !== null && frequency[p!] === minFreq);
        replaced = memory[lfuIdx]!;
        memory[lfuIdx] = page;
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
      frequency: memory.map(p => (p !== null ? frequency[p] : '')),
    });
  }

  return {
    steps,
    totalHit: hits,
    totalFault: faults,
  };
}