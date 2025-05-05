import { useState } from 'react';
import InputForm from '../components/ProcessScheduling/InputForm';
import ProcessChart from '../components/ProcessScheduling/ProcessChart';
import { Process, AlgorithmResult, AlgorithmType } from '../logic/ProcessScheduling/types';
import { runAlgorithm } from '../logic/ProcessScheduling/utils';
import '../styles/ProcessScheduling/ProcessScheduling.css';

const ProcessScheduling = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('fcfs');
  const [quantum, setQuantum] = useState<number>(1);
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleVisualize = () => {
    const res = runAlgorithm(selectedAlgorithm, processes, quantum);
    setResult(res);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CPU Scheduling Algorithms</h1>
      <div className="input-chart-grid">
        <div>
          <InputForm
            processes={processes}
            setProcesses={setProcesses}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            quantum={quantum}
            setQuantum={setQuantum}
            onVisualize={handleVisualize}
          />
        </div>
        <div>
          {result && <ProcessChart result={result} processes={processes} />}
        </div>
      </div>
    </div>
  );
};

export default ProcessScheduling;