import React, { useState } from 'react';
import '../../styles/Deadlock/RequestForm.css';
import { Resource } from '../../logic/Deadlock/types';

interface RequestFormProps {
  processes: { id: number }[];
  resourceKeys: string[];
  onRequest: (processId: number, request: Resource) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ processes, resourceKeys, onRequest }) => {
  const [selectedProcess, setSelectedProcess] = useState(processes[0]?.id || 0);
  const [request, setRequest] = useState<Resource>(
    Object.fromEntries(resourceKeys.map(k => [k, 0]))
  );

  const handleRequestChange = (key: string, value: number) => {
    setRequest({ ...request, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequest(selectedProcess, request);
  };

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <h4>Request Resources (will update Allocation)</h4>
      <label>
        Select Process:
        <select
          value={selectedProcess}
          onChange={e => setSelectedProcess(Number(e.target.value))}
        >
          {processes.map(p => (
            <option key={p.id} value={p.id}>P{p.id}</option>
          ))}
        </select>
      </label>
      <div>
        <h5>Resource Request:</h5>
        {resourceKeys.map(key => (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={request[key]}
              onChange={e => handleRequestChange(key, Number(e.target.value))}
              min="0"
            />
          </label>
        ))}
      </div>
      <button type="submit">Request Resources</button>
    </form>
  );
};

export default RequestForm;