import React, { useState } from 'react';
import '../../styles/Deadlock/ProcessTable.css';
import { Process } from '../../logic/Deadlock/types';

interface ProcessTableProps {
  processes: Process[];
  onAllocationChange: (index: number, resource: string, value: number) => void;
  onMaxChange: (index: number, resource: string, value: number) => void;
  onAddProcess: () => void;
  onRemoveProcess: () => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({
  processes,
  onAllocationChange,
  onMaxChange,
  onAddProcess,
  onRemoveProcess,
}) => {
  const [tab, setTab] = useState<'allocation' | 'max'>('allocation');
  const resourceKeys = Object.keys(processes[0]?.allocation || {});

  return (
    <div className="process-table">
      <h3>Processes</h3>
      <div className="process-buttons">
        <button type="button" onClick={onAddProcess}>+</button>
        <button type="button" onClick={onRemoveProcess}>-</button>
      </div>
      <div className="tabs">
        <button
          className={tab === 'max' ? 'active' : ''}
          onClick={() => setTab('max')}
        >
          Max
        </button>
        <button
          className={tab === 'allocation' ? 'active' : ''}
          onClick={() => setTab('allocation')}
        >
          Allocation
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Process</th>
            {resourceKeys.map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processes.map((process, index) => (
            <tr key={process.id}>
              <td>P{process.id}</td>
              {resourceKeys.map(key => (
                <td key={key}>
                  <input
                    type="number"
                    value={tab === 'allocation' ? process.allocation[key] : process.max[key]}
                    onChange={e =>
                      tab === 'allocation'
                        ? onAllocationChange(index, key, Number(e.target.value))
                        : onMaxChange(index, key, Number(e.target.value))
                    }
                    min="0"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;