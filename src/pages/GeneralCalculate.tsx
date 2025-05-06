import React from 'react';
import MemoryAccessEfficiency from '../components/GeneralCalculate/MemoryAccessEfficiency';
import AverageMemoryAccessTime from '../components/GeneralCalculate/AverageMemoryAccessTime';

const GeneralCalculate: React.FC = () => (
  <div>
    <MemoryAccessEfficiency />
    <AverageMemoryAccessTime />
    {/* Thêm các component tính toán khác ở đây */}
  </div>
);

export default GeneralCalculate;