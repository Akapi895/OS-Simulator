import React, { useState } from 'react';

const unitToByte: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
};

function log2(x: number) {
  return Math.log2(x);
}

const InodeIndexBlockCalculator: React.FC = () => {
  const [directCount, setDirectCount] = useState<number>(12);
  const [singleCount, setSingleCount] = useState<number>(1);
  const [doubleCount, setDoubleCount] = useState<number>(1);
  const [tripleCount, setTripleCount] = useState<number>(1);
  const [blockSize, setBlockSize] = useState<number>(8);
  const [blockSizeUnit, setBlockSizeUnit] = useState('KB');
  const [pointerSize, setPointerSize] = useState<number>(4);
  const [pointerSizeUnit, setPointerSizeUnit] = useState('B');

  // Tính số con trỏ trong 1 khối
  const blockBytes = blockSize * unitToByte[blockSizeUnit];
  const pointerBytes = pointerSize * unitToByte[pointerSizeUnit];
  const pointersPerBlock = Math.floor(blockBytes / pointerBytes);
  const x = log2(pointersPerBlock);

  // Công thức số khối chỉ mục tối đa
  const formula = `${singleCount} + ${doubleCount}×2^${x} + ${tripleCount}×2^${2 * x}`;
  const value =
    singleCount +
    doubleCount * Math.pow(2, x) +
    tripleCount * Math.pow(2, 2 * x);

  return (
    <div className="mae-container">
      <h3>Tính số khối chỉ mục tối đa của tập tin (i-node)</h3>
      <div className="mae-row">
        <label>Số khối trực tiếp</label>
        <input
          type="number"
          min={0}
          value={directCount}
          onChange={e => setDirectCount(Number(e.target.value))}
        />
      </div>
      <div className="mae-row">
        <label>Số khối gián tiếp cấp 1</label>
        <input
          type="number"
          min={0}
          value={singleCount}
          onChange={e => setSingleCount(Number(e.target.value))}
        />
      </div>
      <div className="mae-row">
        <label>Số khối gián tiếp cấp 2</label>
        <input
          type="number"
          min={0}
          value={doubleCount}
          onChange={e => setDoubleCount(Number(e.target.value))}
        />
      </div>
      <div className="mae-row">
        <label>Số khối gián tiếp cấp 3</label>
        <input
          type="number"
          min={0}
          value={tripleCount}
          onChange={e => setTripleCount(Number(e.target.value))}
        />
      </div>
      <div className="mae-row">
        <label>Kích thước mỗi khối trên ổ đĩa</label>
        <input
          type="number"
          min={1}
          value={blockSize}
          onChange={e => setBlockSize(Number(e.target.value))}
        />
        <select value={blockSizeUnit} onChange={e => setBlockSizeUnit(e.target.value)}>
          <option value="B">B</option>
          <option value="KB">KB</option>
          <option value="MB">MB</option>
        </select>
      </div>
      <div className="mae-row">
        <label>Số byte cho mỗi số hiệu khối</label>
        <input
          type="number"
          min={1}
          value={pointerSize}
          onChange={e => setPointerSize(Number(e.target.value))}
        />
        <select value={pointerSizeUnit} onChange={e => setPointerSizeUnit(e.target.value)}>
          <option value="B">B</option>
        </select>
      </div>
      <div className="mae-result" style={{ marginTop: 16 }}>
        <div>
          <b>Công thức số khối chỉ mục tối đa:</b> <span style={{ color: '#2563eb', fontWeight: 600 }}>{formula}</span>
        </div>
        <div>
          <b>Giá trị thực tế:</b> <span style={{ color: '#2563eb', fontWeight: 600 }}>{value.toLocaleString()}</span>
        </div>
        <div>
          <b>Số con trỏ trong 1 khối:</b> {blockBytes} / {pointerBytes} = <b>{pointersPerBlock}</b> (2<sup>{x}</sup>)
        </div>
      </div>
      <div>
        <p className="mae-note">Lưu ý: hiện tại tool đang fix tạm thời cho bài toán ôn thi cuối kỳ, chưa phải code chuẩn!</p>
        <p className="mae-note">Bài toán tham khảo:<br></br>Hệ điều hành sử dụng i-node để quản lý các khối dữ liệu của tập tin. I-node của mỗi tập tin chứa số hiệu của 12 khối trực tiếp, 1 khối gián tiếp một cấp 1, 1 khối gián tiếp một cấp 2, 1 khối gián tiếp một cấp 3. Kích thước mỗi khối trên ổ đĩa là 8 KB, số hiệu của mỗi khối chiếm 4 byte. Số khối chỉ mục của tập tin là?</p>
      </div>
    </div>
  );
};

export default InodeIndexBlockCalculator;