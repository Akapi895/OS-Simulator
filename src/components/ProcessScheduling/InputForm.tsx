import React, { useState } from 'react';
import { Process, AlgorithmType } from '../../logic/ProcessScheduling/types';
import '../../styles/ProcessScheduling/InputForm.css';

interface Props {
  processes: Process[];
  setProcesses: (ps: Process[]) => void;
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (alg: AlgorithmType) => void;
  quantum: number;
  setQuantum: (q: number) => void;
  onVisualize: () => void;
}

const ALGORITHMS = [
  { value: 'fcfs', label: 'FCFS' },
  { value: 'sjf', label: 'SJF (Non-preemptive)' },
  { value: 'sjf-preemptive', label: 'SJF (Preemptive)' },
  { value: 'priority', label: 'Priority (Non-preemptive)' },
  { value: 'priority-preemptive', label: 'Priority (Preemptive)' },
  { value: 'rr', label: 'Round Robin' },
];

const InputForm: React.FC<Props> = ({
  setProcesses, selectedAlgorithm, setSelectedAlgorithm, quantum, setQuantum, onVisualize
}) => {
  const [arrivalInput, setArrivalInput] = useState('');
  const [burstInput, setBurstInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('');

  const handleProcessInput = () => {
    const arrivals = arrivalInput.split(',').map(s => Number(s.trim()));
    const bursts = burstInput.split(',').map(s => Number(s.trim()));
    const priorities = priorityInput
      ? priorityInput.split(',').map(s => Number(s.trim()))
      : [];

    // Không kiểm tra số lượng ở đây nữa
    const ps: Process[] = arrivals.map((arrival, idx) => ({
      id: `P${idx + 1}`,
      arrivalTime: arrival,
      duration: bursts[idx],
      ...(priorityInput ? { priority: priorities[idx] } : {}),
    }));
    setProcesses(ps);
  };

  // Khi input thay đổi, cập nhật processes
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    type: 'arrival' | 'duration' | 'priority'
  ) => {
    setter(value);
    setTimeout(handleProcessInput, 0);
    console.log(`Updated ${type} input:`, value);
  };

  // Khi chọn thuật toán, reset quantum nếu không phải RR
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as AlgorithmType);
    if (e.target.value !== 'rr') setQuantum(1);
  };

  return (
    <form
      className="input-form"
      onSubmit={e => {
        e.preventDefault();
        const arrivals = arrivalInput.split(',').map(s => Number(s.trim()));
        const bursts = burstInput.split(',').map(s => Number(s.trim()));
        const priorities = priorityInput
          ? priorityInput.split(',').map(s => Number(s.trim()))
          : [];
        if (
          arrivals.length !== bursts.length ||
          (priorityInput && arrivals.length !== priorities.length)
        ) {
          alert('Số lượng Arrival, Duration và Priority phải bằng nhau!');
          return;
        }
        handleProcessInput();
        onVisualize();
      }}
    >
      <div className="input-row">
        <div className="input-col">
          <label>Arrival Times</label>
          <input
            type="text"
            placeholder="e.g. 0, 2, 4"
            value={arrivalInput}
            onChange={e => handleInputChange(setArrivalInput, e.target.value, 'arrival')}
          />
        </div>
        <div className="input-col">
          <label>Durations</label>
          <input
            type="text"
            placeholder="e.g. 5, 3, 2"
            value={burstInput}
            onChange={e => handleInputChange(setBurstInput, e.target.value, 'duration')}
          />
        </div>
        <div className="input-col">
          <label>Priority <span style={{ fontSize: 12, color: '#888' }}>(optional)</span></label>
          <input
            type="text"
            placeholder="Lower = Higher priority"
            value={priorityInput}
            onChange={e => handleInputChange(setPriorityInput, e.target.value, 'priority')}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-col">
          <label>Algorithm</label>
          <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
            {ALGORITHMS.map(algo => (
              <option key={algo.value} value={algo.value}>{algo.label}</option>
            ))}
          </select>
        </div>
        {selectedAlgorithm === 'rr' && (
          <div className="input-col">
            <label>Time Quantum</label>
            <input
              type="number"
              min={1}
              value={quantum}
              onChange={e => setQuantum(Number(e.target.value))}
            />
          </div>
        )}
      </div>
      <div className="input-row">
        <button type="submit" className="visualize-btn">Visualize</button>
      </div>
    </form>
  );
};

export default InputForm;