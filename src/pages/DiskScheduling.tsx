import { useEffect, useState } from 'react';
import DiskChart from '../components/DiskScheduling/DiskChart';
import InputForm from '../components/DiskScheduling/InputForm';
import { AlgorithmResult } from '../logic/DiskScheduling/types';
import { runAlgorithm } from '../logic/DiskScheduling/utils';
import '../styles/DiskScheduling/DiskScheduling.css';

const DiskScheduling = () => {
  const [startPosition, setStartPosition] = useState<number>(0);
  const [maxTrack, setMaxTrack] = useState<number>(200);
  const [requests, setRequests] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('fcfs');
  const [result, setResult] = useState<AlgorithmResult | null>(null);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  // Tự động cập nhật maxTrack nếu nhỏ hơn max(requests)
  useEffect(() => {
    if (requests.length > 0) {
      const maxRequest = Math.max(...requests);
      if (maxTrack < maxRequest) {
        setMaxTrack(maxRequest);
      }
    }
  }, [requests]);

  // Đảm bảo startPosition luôn hợp lệ khi maxTrack hoặc startPosition thay đổi
  useEffect(() => {
    if (startPosition < 0) {
      setStartPosition(0);
    } else if (startPosition > maxTrack) {
      setStartPosition(maxTrack - 1);
    }
  }, [startPosition, maxTrack]);

  const handleVisualize = () => {
    const maxRequest = requests.length > 0 ? Math.max(...requests) : 0;
    if (maxTrack < maxRequest) {
      alert('Max Track phải lớn hơn hoặc bằng giá trị lớn nhất trong Requests');
      return;
    }
    const result = runAlgorithm(selectedAlgorithm, startPosition, maxTrack, requests, direction);
    setResult(result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Disk Scheduling Algorithms</h1>
      <div className="input-chart-grid">
        <div>
          <InputForm
            startPosition={startPosition}
            setStartPosition={setStartPosition}
            maxTrack={maxTrack}
            setMaxTrack={setMaxTrack}
            requests={requests}
            setRequests={setRequests}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            onVisualize={handleVisualize}
            direction={direction}
            setDirection={setDirection}
          />
        </div>
        <div>
          {result && <DiskChart result={result} maxTrack={maxTrack} requests={requests} />}
        </div>
      </div>
    </div>
  );
};

export default DiskScheduling;