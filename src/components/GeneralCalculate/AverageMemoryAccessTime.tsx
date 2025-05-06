import React, { useState } from 'react';
import '../../styles/GeneralCalculate/AverageMemoryAccessTime.css';

const unitToNs: Record<string, number> = {
  ns: 1,
  us: 1e3,
  ms: 1e6,
  s: 1e9,
};

const defaultValues = {
  cacheHitRate: 45,
  cacheAccessTime: 10,
  cacheUnit: 'ns',
  memoryAccessTime: 100,
  memoryUnit: 'ns',
};

const AverageMemoryAccessTime: React.FC = () => {
  const [cacheHitRate, setCacheHitRate] = useState(defaultValues.cacheHitRate);
  const [cacheAccessTime, setCacheAccessTime] = useState(defaultValues.cacheAccessTime);
  const [cacheUnit, setCacheUnit] = useState(defaultValues.cacheUnit);
  const [memoryAccessTime, setMemoryAccessTime] = useState(defaultValues.memoryAccessTime);
  const [memoryUnit, setMemoryUnit] = useState(defaultValues.memoryUnit);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const hitRate = cacheHitRate / 100;
    const missRate = 1 - hitRate;
    const cacheNs = cacheAccessTime * unitToNs[cacheUnit];
    const memNs = memoryAccessTime * unitToNs[memoryUnit];
    // Thời gian truy cập trung bình = (hitRate * cache) + (missRate * memory)
    const avg = hitRate * cacheNs + missRate * memNs;
    setResult(avg);
  };

  return (
    <div className="amat-container">
      <h3>Average Memory Access Time Calculator</h3>
      <div className="amat-row">
        <label>Cache Hit Rate (%)</label>
        <input
          type="number"
          min={0}
          max={100}
          value={cacheHitRate}
          onChange={e => setCacheHitRate(Number(e.target.value))}
        />
      </div>
      <div className="amat-row">
        <label>Cache Access Time</label>
        <input
          type="number"
          min={0}
          value={cacheAccessTime}
          onChange={e => setCacheAccessTime(Number(e.target.value))}
        />
        <select value={cacheUnit} onChange={e => setCacheUnit(e.target.value)}>
          <option value="ns">ns</option>
          <option value="us">μs</option>
          <option value="ms">ms</option>
          <option value="s">s</option>
        </select>
      </div>
      <div className="amat-row">
        <label>Main Memory Access Time</label>
        <input
          type="number"
          min={0}
          value={memoryAccessTime}
          onChange={e => setMemoryAccessTime(Number(e.target.value))}
        />
        <select value={memoryUnit} onChange={e => setMemoryUnit(e.target.value)}>
          <option value="ns">ns</option>
          <option value="us">μs</option>
          <option value="ms">ms</option>
          <option value="s">s</option>
        </select>
      </div>
      <button className="amat-btn" onClick={handleCalculate}>Tính toán</button>
      {result !== null && (
        <div className="amat-result">
          <b>Thời gian truy cập trung bình:</b> {result.toLocaleString()} ns
        </div>
      )}
    </div>
  );
};

export default AverageMemoryAccessTime;