import React, { useState } from 'react';
import '../../styles/DiskScheduling/InputForm.css'; 

interface InputFormProps {
  startPosition: number;
  setStartPosition: (value: number) => void;
  maxTrack: number;
  setMaxTrack: (value: number) => void;
  requests: number[];
  setRequests: (value: number[]) => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: (value: string) => void;
  onVisualize: () => void;
  direction: 'up' | 'down';
  setDirection: (value: 'up' | 'down') => void;
}

const ALGORITHMS = [
  { value: 'fcfs', label: 'FCFS' },
  { value: 'sstf', label: 'SSTF' },
  { value: 'scan', label: 'SCAN' },
  { value: 'cscan', label: 'C-SCAN' },
  { value: 'look', label: 'LOOK' },
  { value: 'clook', label: 'C-LOOK' },
];

const InputForm: React.FC<InputFormProps> = ({
  startPosition,
  setStartPosition,
  maxTrack,
  setMaxTrack,
  requests,
  setRequests,
  selectedAlgorithm,
  setSelectedAlgorithm,
  onVisualize,
  direction,
  setDirection,
}) => {
  const [requestInput, setRequestInput] = useState<string>(requests.join(','));

  const handleRequestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestInput(e.target.value);
    const nums = e.target.value
      .split(/\s+/)
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n) && n >= 0);
    setRequests(nums);
  };

  return (
    <form className="input-form" onSubmit={e => { e.preventDefault(); onVisualize(); }}>
      <div className="input-row">
        <div className="input-col">
          <label>Start Position</label>
          <input
            type="number"
            min={0}
            max={maxTrack - 1}
            value={startPosition}
            onChange={e => setStartPosition(Math.max(0, Math.min(Number(e.target.value), maxTrack - 1)))}
          />
        </div>
        <div className="input-col">
          <label>Total Track</label>
          <input
            type="number"
            min={0}
            value={maxTrack}
            onChange={e => setMaxTrack(Math.max(0, Number(e.target.value)))}
          />
        </div>
        <div className="input-col">
          <label>Algorithm</label>
          <select
            value={selectedAlgorithm}
            onChange={e => setSelectedAlgorithm(e.target.value)}
          >
            {ALGORITHMS.map(algo => (
              <option key={algo.value} value={algo.value}>{algo.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="input-row">
        <div className="input-col">
          <label>Requests</label>
          <input
            type="text"
            placeholder="e.g. 55 58 39"
            value={requestInput}
            onChange={handleRequestsChange}
          />
        </div>
        <div className="input-col">
          <label>Direction</label>
          <select
            value={direction}
            onChange={e => setDirection(e.target.value as 'up' | 'down')}
            disabled={!['scan', 'cscan', 'look', 'clook'].includes(selectedAlgorithm)}
          >
            <option value="up">Up</option>
            <option value="down">Down</option>
          </select>
        </div>
      </div>
      <div className="input-row">
        <button type="submit" className="visualize-btn">Visualize</button>
      </div>
    </form>
  );
};

export default InputForm;