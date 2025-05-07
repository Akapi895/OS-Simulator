import React, { useState } from 'react';

const unitToByte: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};

function log2(x: number) {
  return Math.log2(x);
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toLocaleString() + ' GB';
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toLocaleString() + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toLocaleString() + ' KB';
  return bytes.toLocaleString() + ' B';
}

const PagingMappingCalculator: React.FC = () => {
  // Input states
  const [virtualMem, setVirtualMem] = useState(2);
  const [virtualUnit, setVirtualUnit] = useState('GB');
  const [physicalMem, setPhysicalMem] = useState(1);
  const [physicalUnit, setPhysicalUnit] = useState('GB');
  const [frameSize, setFrameSize] = useState(4);
  const [frameUnit, setFrameUnit] = useState('KB');
//   const [memUnit, setMemUnit] = useState('B');
  const [frameCount, setFrameCount] = useState<number | ''>('');
  const [inputMode, setInputMode] = useState<'memory' | 'frame'>('memory');
  const [wordSize, setWordSize] = useState(1);
  const [wordUnit, setWordUnit] = useState('B');

  // Derived values
  const virtualMemBytes = virtualMem * unitToByte[virtualUnit];
  const frameSizeBytes = frameSize * unitToByte[frameUnit];
//   const wordSizeBytes = wordSize * unitToByte[wordUnit];

  // Số frame vật lý
  const physicalMemBytes = physicalMem * unitToByte[physicalUnit];
  const numFrames = inputMode === 'memory'
    ? Math.floor(physicalMemBytes / frameSizeBytes)
    : Number(frameCount);

  // Tổng số trang
  const numPages = Math.ceil(virtualMemBytes / frameSizeBytes);

  // Số bit đánh hiệu số trang và frame
  const pageBits = numPages > 0 ? Math.ceil(log2(numPages)) : 0;
  const frameBits = numFrames > 0 ? Math.ceil(log2(numFrames)) : 0;

  // Kích thước bảng phân trang
  const pageTableEntrySize = frameBits; // Số bit cho mỗi entry (chỉ số frame)
  const pageTableSize = numPages * pageTableEntrySize / 8; // Đơn vị: byte

  // Kích thước bảng phân trang nghịch đảo
  const invPageTableEntrySize = pageBits; // Số bit cho mỗi entry nghịch đảo
  const invPageTableSize = numFrames * invPageTableEntrySize / 8; // Đơn vị: byte

  return (
    <div className="mae-container">
      <h3>Paging Mapping Calculator</h3>
      <div className="mae-row">
        <label>Bộ nhớ ảo (Virtual Memory)</label>
        <input
          type="number"
          min={1}
          value={virtualMem}
          onChange={e => setVirtualMem(Number(e.target.value))}
        />
        <select value={virtualUnit} onChange={e => setVirtualUnit(e.target.value)}>
          <option value="GB">GB</option>
          <option value="MB">MB</option>
          <option value="KB">KB</option>
          <option value="B">B</option>
        </select>
      </div>
      <div className="mae-row">
        <label>Kích thước frame/trang</label>
        <input
          type="number"
          min={1}
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />
        <select value={frameUnit} onChange={e => setFrameUnit(e.target.value)}>
          <option value="GB">GB</option>
          <option value="MB">MB</option>
          <option value="KB">KB</option>
          <option value="B">B</option>
        </select>
      </div>
      <div className="mae-row">
        <label>Kích thước mỗi đơn vị bộ nhớ</label>
        <input
          type="number"
          min={1}
          value={wordSize}
          onChange={e => setWordSize(Number(e.target.value))}
        />
        <select value={wordUnit} onChange={e => setWordUnit(e.target.value)}>
          <option value="B">B</option>
          <option value="KB">KB</option>
        </select>
      </div>
      <div className="mae-row">
        <label>Bạn muốn nhập:</label>
        <select value={inputMode} onChange={e => setInputMode(e.target.value as 'memory' | 'frame')}>
          <option value="memory">Bộ nhớ vật lý</option>
          <option value="frame">Số frame vật lý</option>
        </select>
      </div>
      {inputMode === 'memory' ? (
        <div className="mae-row">
          <label>Bộ nhớ vật lý (Physical Memory)</label>
          <input
            type="number"
            min={1}
            value={physicalMem}
            onChange={e => setPhysicalMem(Number(e.target.value))}
          />
          <select value={physicalUnit} onChange={e => setPhysicalUnit(e.target.value)}>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
            <option value="KB">KB</option>
            <option value="B">B</option>
          </select>
        </div>
      ) : (
        <div className="mae-row">
          <label>Số frame vật lý</label>
          <input
            type="number"
            min={1}
            value={frameCount}
            onChange={e => setFrameCount(Number(e.target.value))}
          />
        </div>
      )}
      <hr style={{margin: '18px 0'}} />
      <div className="mae-row">
        <label>Tổng số trang</label>
        <span>{numPages > 0 ? numPages.toLocaleString() : '-'}</span>
      </div>
      <div className="mae-row">
        <label>Số bit đánh hiệu số trang</label>
        <span>{pageBits > 0 ? pageBits : '-'}</span>
      </div>
      <div className="mae-row">
        <label>Tổng số frame vật lý</label>
        <span>{numFrames > 0 ? numFrames.toLocaleString() : '-'}</span>
      </div>
      <div className="mae-row">
        <label>Số bit cho frame</label>
        <span>{frameBits > 0 ? frameBits : '-'}</span>
      </div>
      <div className="mae-row">
        <label>Kích thước mỗi đơn vị bộ nhớ</label>
        <span>{wordSize} {wordUnit}</span>
      </div>
      <div className="mae-row">
        <label>Kích thước bảng phân trang</label>
        <span>{pageTableSize > 0 ? `${formatBytes(pageTableSize)} (${pageTableSize.toLocaleString()} B)` : '-'}</span>
      </div>
      <div className="mae-row">
        <label>Kích thước bảng phân trang nghịch đảo</label>
        <span>{invPageTableSize > 0 ? `${formatBytes(invPageTableSize)} (${invPageTableSize.toLocaleString()} B)` : '-'}</span>
      </div>
    </div>
  );
};

export default PagingMappingCalculator;