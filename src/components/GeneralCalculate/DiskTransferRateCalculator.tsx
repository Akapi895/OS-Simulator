import React, { useState } from 'react';

const unitToByte: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};

function formatBytes(bytes: number) {
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${units[unitIndex]}`;
}

const DiskTransferRateCalculator: React.FC = () => {
  const [rpm, setRpm] = useState<number>(400);
  const [sectorsPerTrack, setSectorsPerTrack] = useState<number>(12);
  const [sectorSize, setSectorSize] = useState<number>(1024);
  const [sectorUnit, setSectorUnit] = useState<string>('B');
  const [result, setResult] = useState<number | null>(null);
  const [resultBits, setResultBits] = useState<number | null>(null);

  const handleCalculate = () => {
    const rotationsPerSec = rpm / 60;
    const sectorSizeInBytes = sectorSize * unitToByte[sectorUnit];
    const trackBytes = sectorsPerTrack * sectorSizeInBytes;
    const transferRateBytes = trackBytes * rotationsPerSec;
    const transferRateBits = transferRateBytes * 8;
    setResult(transferRateBytes);
    setResultBits(transferRateBits);
  };

  const handleReset = () => {
    setRpm(400);
    setSectorsPerTrack(12);
    setSectorSize(1024);
    setSectorUnit('B');
    setResult(null);
    setResultBits(null);
  };

  return (
    <div className="mae-container disk-transfer-calc">
      <h3>Disk Data Transfer Rate Calculator</h3>
      <div className="mae-row">
        <label>Rotation speed (RPM)</label>
        <input
          type="number"
          min={1}
          value={rpm}
          onChange={e => setRpm(Math.max(1, Number(e.target.value)))}
        />
      </div>
      <div className="mae-row">
        <label>Sectors per track</label>
        <input
          type="number"
          min={1}
          value={sectorsPerTrack}
          onChange={e => setSectorsPerTrack(Math.max(1, Number(e.target.value)))}
        />
      </div>
      <div className="mae-row">
        <label>Sector size</label>
        <input
          type="number"
          min={1}
          value={sectorSize}
          onChange={e => setSectorSize(Math.max(1, Number(e.target.value)))}
        />
        <select 
          value={sectorUnit} 
          onChange={e => setSectorUnit(e.target.value)}
        >
          {Object.keys(unitToByte).map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div className="mae-button-group">
        <button className="mae-btn" onClick={handleCalculate}>
          Calculate
        </button>
        <button className="mae-btn mae-btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
      {result !== null && (
        <div className="mae-result disk-transfer-result">
          <h4>Results</h4>
          <div className="disk-transfer-grid">
            <div><b>Data transfer rate:</b></div>
            <div>{formatBytes(result)}</div>
            <div><b>In bits per second:</b></div>
            <div>{resultBits!.toLocaleString(undefined, { maximumFractionDigits: 2 })} bps</div>
            <div><b>In Kbps:</b></div>
            <div>{(resultBits! / 1024).toLocaleString(undefined, { maximumFractionDigits: 2 })} Kbps</div>
            <div><b>In Mbps:</b></div>
            <div>{(resultBits! / 1024 / 1024).toLocaleString(undefined, { maximumFractionDigits: 2 })} Mbps</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiskTransferRateCalculator;