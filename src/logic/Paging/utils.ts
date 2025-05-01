import { PagingAlgorithm, PagingResult } from './types';
import { fifo } from './algorithms/fifo';
import { lru } from './algorithms/lru';
import { mru } from './algorithms/mru';
import { lfu } from './algorithms/lfu';
import { mfu } from './algorithms/mfu';
import { optimal } from './algorithms/optimal';
import { secondChance } from './algorithms/secondChance';

export function runPagingAlgorithm(
  algorithm: PagingAlgorithm,
  pages: string[],
  frames: number
): PagingResult {
  switch (algorithm) {
    case 'fifo':
      return fifo(pages, frames);
    case 'lru':
      return lru(pages, frames);
    case 'mru':
      return mru(pages, frames);
    case 'lfu':
      return lfu(pages, frames);
    case 'mfu':
      return mfu(pages, frames);
    case 'optimal':
      return optimal(pages, frames);
    case 'second-chance':
      return secondChance(pages, frames);
    default:
      throw new Error('Unknown paging algorithm');
  }
}