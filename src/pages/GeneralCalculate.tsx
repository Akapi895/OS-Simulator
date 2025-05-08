import React from 'react';
import MemoryAccessEfficiency from '../components/GeneralCalculate/MemoryAccessEfficiency';
import AverageMemoryAccessTime from '../components/GeneralCalculate/AverageMemoryAccessTime';
import PagingMappingCalculator from '../components/GeneralCalculate/PagingMappingCalculator';
import DiskTransferRateCalculator from '../components/GeneralCalculate/DiskTransferRateCalculator';
import InodeIndexBlockCalculator from '../components/GeneralCalculate/InodeIndexBlockCalculator';
import '../styles/GeneralCalculate/GeneralCalculate.css';

const GeneralCalculate: React.FC = () => (
  <div>
    <div className="calc-row">
      <MemoryAccessEfficiency />
      <AverageMemoryAccessTime />
      <DiskTransferRateCalculator />
    </div>
    <div className="calc-row">
      <PagingMappingCalculator />
      <InodeIndexBlockCalculator />
    </div>
  </div>
);

export default GeneralCalculate;