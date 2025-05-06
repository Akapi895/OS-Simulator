import React, { useState } from 'react';
import '../../styles/GeneralCalculate/MemoryAccessEfficiency.css';

const unitToNs: Record<string, number> = {
  ns: 1,
  us: 1e3,
  ms: 1e6,
  s: 1e9,
};

const defaultValues = {
  tlbHitRate: 90,
  cacheAccessTime: 10,
  cacheUnit: 'ns',
  memoryAccessTime: 100,
  memoryUnit: 'ns',
};

const MemoryAccessEfficiency: React.FC = () => {
  const [tlbHitRate, setTlbHitRate] = useState(defaultValues.tlbHitRate);
  const [cacheAccessTime, setCacheAccessTime] = useState(defaultValues.cacheAccessTime);
  const [cacheUnit, setCacheUnit] = useState(defaultValues.cacheUnit);
  const [memoryAccessTime, setMemoryAccessTime] = useState(defaultValues.memoryAccessTime);
  const [memoryUnit, setMemoryUnit] = useState(defaultValues.memoryUnit);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const hitRate = tlbHitRate / 100;
    const cacheNs = cacheAccessTime * unitToNs[cacheUnit];
    const memNs = memoryAccessTime * unitToNs[memoryUnit];
    // Thời gian truy cập hiệu quả = hitRate * (cache + memory) + (1-hitRate) * (cache + 2*memory)
    const eff = hitRate * (cacheNs + memNs) + (1 - hitRate) * (cacheNs + 2 * memNs);
    setResult(eff);
  };

  return (
    <div className="mae-container">
      <h3>Memory Access Efficiency Calculator</h3>
      <div className="mae-row">
        <label>TLB Hit Rate (%)</label>
        <input
          type="number"
          min={0}
          max={100}
          value={tlbHitRate}
          onChange={e => setTlbHitRate(Number(e.target.value))}
        />
      </div>
      <div className="mae-row">
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
      <div className="mae-row">
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
      <button className="mae-btn" onClick={handleCalculate}>Tính toán</button>
      {result !== null && (
        <div className="mae-result">
          <b>Thời gian truy cập bộ nhớ hiệu quả:</b> {result.toLocaleString()} ns
        </div>
      )}
    </div>
  );
};

export default MemoryAccessEfficiency;