import React, { useState } from 'react';
import InputForm from '../components/Paging/InputForm';
import ResultTable from '../components/Paging/ResultTable';
import PagingChart from '../components/Paging/PagingChart';
import { runPagingAlgorithm } from '../logic/Paging/utils';
import { PagingAlgorithm, PagingResult } from '../logic/Paging/types';

const Paging: React.FC = () => {
  const [result, setResult] = useState<PagingResult | null>(null);

  const handleSubmit = (pages: string[], frames: number, algorithm: PagingAlgorithm) => {
    setResult(runPagingAlgorithm(algorithm, pages, frames));
  };

  return (
    <div>
      <InputForm onSubmit={handleSubmit} />
      {result && (
        <>
          <ResultTable result={result} />
          <PagingChart result={result} />
        </>
      )}
    </div>
  );
};

export default Paging;