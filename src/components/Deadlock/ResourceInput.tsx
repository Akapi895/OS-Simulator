import React from 'react';
import '../../styles/Deadlock/ResourceInput.css';
import { Resource } from '../../logic/Deadlock/types';

interface Props {
  total: Resource;
  available: Resource;
  onTotalChange: (total: Resource) => void;
  onAvailableChange: (available: Resource) => void;
  onAddResource: () => void;
  onRemoveResource: (key: string) => void;
}

const ResourceInput: React.FC<Props> = ({
  total,
  available,
  onTotalChange,
  onAvailableChange,
  onAddResource,
  onRemoveResource,
}) => {
  const resourceKeys = Object.keys(total);

  const handleTotalChange = (key: string, value: number) => {
    onTotalChange({ ...total, [key]: value });
  };

  const handleAvailableChange = (key: string, value: number) => {
    onAvailableChange({ ...available, [key]: value });
  };

  return (
    <div className="resource-input">
      <h3>Resources</h3>
      <div className="resource-buttons">
        <button type="button" onClick={onAddResource}>+</button>
        {resourceKeys.length > 1 && resourceKeys.map(key => (
          <button
            type="button"
            key={key}
            onClick={() => onRemoveResource(key)}
            style={{ marginLeft: 4 }}
            title={`Remove ${key}`}
          >- {key}</button>
        ))}
      </div>
      <div className="resource-section">
        <h4>Total</h4>
        {resourceKeys.map(key => (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={total[key]}
              onChange={e => handleTotalChange(key, Number(e.target.value))}
              min="0"
            />
          </label>
        ))}
      </div>
      <div className="resource-section">
        <h4>Available</h4>
        {resourceKeys.map(key => (
          <label key={key}>
            {key}:
            <input
              type="number"
              value={available[key]}
              onChange={e => handleAvailableChange(key, Number(e.target.value))}
              min="0"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ResourceInput;