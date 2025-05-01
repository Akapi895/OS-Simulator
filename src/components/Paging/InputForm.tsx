import React, { useState } from 'react';
import '../../styles/Paging/InputForm.css';
import { PagingAlgorithm } from '../../logic/Paging/types';

interface Props {
  onSubmit: (pages: string[], frames: number, algorithm: PagingAlgorithm) => void;
}

const ALGORITHMS: { value: PagingAlgorithm; label: string }[] = [
    { value: 'fifo', label: 'FIFO - Vào trước ra trước' },
    { value: 'lru', label: 'LRU - Ít dùng gần đây' },
    { value: 'mru', label: 'MRU - Dùng gần đây nhất' },
    { value: 'lfu', label: 'LFU - Ít dùng nhất' },
    { value: 'mfu', label: 'MFU - Dùng nhiều nhất' },
    { value: 'optimal', label: 'Optimal - Thay tối ưu' },
    { value: 'second-chance', label: 'Second Chance - Cơ hội thứ hai' }
];

function mapNumberToLetter(s: string): string {
  if (/^\d+$/.test(s)) {
    let n = parseInt(s, 10);
    let result = '';
    do {
      result = String.fromCharCode(65 + (n % 26)) + result;
      n = Math.floor(n / 26) - 1;
    } while (n >= 0);
    return result;
  }
  return s.toUpperCase();
}

const InputForm: React.FC<Props> = ({ onSubmit }) => {
  const [pages, setPages] = useState('');
  const [frames, setFrames] = useState(3);
  const [algorithm, setAlgorithm] = useState<PagingAlgorithm>('lru');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let pageArr = pages
      .split(' ')
      .map(s => s.trim())
      .filter(Boolean)
      .map(mapNumberToLetter);
    if (pageArr.length === 0 || frames < 1) {
      alert('Please enter a valid page sequence and frame count!');
      return;
    }
    onSubmit(pageArr, frames, algorithm);
  };

  return (
    <form className="paging-input-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Page sequence:</label>
        <input
          type="text"
          value={pages}
          onChange={e => setPages(e.target.value)}
          placeholder="A B C D A B E or 0 1 2 3 0 1 4"
        />
      </div>
      <div className="form-group">
        <label>Number of frames:</label>
        <input
          type="number"
          min={1}
          value={frames}
          onChange={e => setFrames(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label>Algorithm:</label>
        <select
          value={algorithm}
          onChange={e => setAlgorithm(e.target.value as PagingAlgorithm)}
        >
          {ALGORITHMS.map(algo => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Simulate</button>
    </form>
  );
};

export default InputForm;