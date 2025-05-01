// import React, { useState } from 'react';
// import ResourceInput from '../components/Deadlock/ResourceInput';
// import ProcessTable from '../components/Deadlock/ProcessTable';
// import RequestForm from '../components/Deadlock/RequestForm';
// import { Resource, Process } from '../logic/Deadlock/types';

// const DEFAULT_RESOURCES = ['A', 'B', 'C', 'D'];

// function getDefaultResource(keys: string[]) {
//   return Object.fromEntries(keys.map(k => [k, 0]));
// }

// function getDefaultProcess(id: number, keys: string[]): Process {
//   return {
//     id,
//     allocation: getDefaultResource(keys),
//     max: getDefaultResource(keys),
//   };
// }

const Deadlock: React.FC = () => {
//   const [resourceKeys, setResourceKeys] = useState<string[]>([...DEFAULT_RESOURCES]);
//   const [total, setTotal] = useState<Resource>(getDefaultResource(resourceKeys));
//   const [available, setAvailable] = useState<Resource>(getDefaultResource(resourceKeys));
//   const [processes, setProcesses] = useState<Process[]>([
//     getDefaultProcess(0, resourceKeys),
//     getDefaultProcess(1, resourceKeys),
//   ]);

//   const handleAddResource = () => {
//     let nextChar = String.fromCharCode(65 + resourceKeys.length);
//     while (resourceKeys.includes(nextChar)) {
//       nextChar = String.fromCharCode(nextChar.charCodeAt(0) + 1);
//     }
//     const newKeys = [...resourceKeys, nextChar];
//     setResourceKeys(newKeys);
//     setTotal(prev => ({ ...prev, [nextChar]: 0 }));
//     setAvailable(prev => ({ ...prev, [nextChar]: 0 }));
//     setProcesses(prev =>
//       prev.map(p => ({
//         ...p,
//         allocation: { ...p.allocation, [nextChar]: 0 },
//         max: { ...p.max, [nextChar]: 0 },
//       }))
//     );
//   };

//   const handleRemoveResource = (key: string) => {
//     if (resourceKeys.length <= 1) return;
//     const newKeys = resourceKeys.filter(k => k !== key);
//     setResourceKeys(newKeys);
//     setTotal(prev => {
//       const { [key]: _, ...rest } = prev;
//       return rest;
//     });
//     setAvailable(prev => {
//       const { [key]: _, ...rest } = prev;
//       return rest;
//     });
//     setProcesses(prev =>
//       prev.map(p => ({
//         ...p,
//         allocation: Object.fromEntries(Object.entries(p.allocation).filter(([k]) => k !== key)),
//         max: Object.fromEntries(Object.entries(p.max).filter(([k]) => k !== key)),
//       }))
//     );
//   };

//   const handleAddProcess = () => {
//     setProcesses(prev => [
//       ...prev,
//       getDefaultProcess(prev.length, resourceKeys),
//     ]);
//   };

//   const handleRemoveProcess = () => {
//     if (processes.length <= 1) return;
//     setProcesses(prev => prev.slice(0, -1));
//   };

//   const handleAllocationChange = (idx: number, key: string, value: number) => {
//     setProcesses(prev => prev.map((p, i) =>
//       i === idx ? { ...p, allocation: { ...p.allocation, [key]: value } } : p
//     ));
//   };
//   const handleMaxChange = (idx: number, key: string, value: number) => {
//     setProcesses(prev => prev.map((p, i) =>
//       i === idx ? { ...p, max: { ...p.max, [key]: value } } : p
//     ));
//   };

//   const handleTotalChange = (newTotal: Resource) => setTotal(newTotal);
//   const handleAvailableChange = (newAvailable: Resource) => setAvailable(newAvailable);

//   const handleRequest = (processId: number, request: Resource) => {
//     alert(`Process P${processId} requests: ${JSON.stringify(request)}`);
//   };

  return (
    <div>
      <button
        style={{
          background: 'linear-gradient(90deg,#f472b6 0%,#60a5fa 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '1.1rem',
          padding: '12px 32px',
          margin: '18px auto 28px auto',
          display: 'block',
          boxShadow: '0 4px 16px 0 rgba(236,72,153,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.08)',
          letterSpacing: '1.5px',
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onClick={() =>
          window.open(
            'http://os-algorithm-web.s3-website-ap-southeast-1.amazonaws.com/banker',
            '_blank'
          )
        }
      >
        💖 Try Banker Algorithm Demo 💖
      </button>

      {/* <ResourceInput
        total={total}
        available={available}
        onTotalChange={handleTotalChange}
        onAvailableChange={handleAvailableChange}
        onAddResource={handleAddResource}
        onRemoveResource={handleRemoveResource}
      />
      <ProcessTable
        processes={processes}
        onAllocationChange={handleAllocationChange}
        onMaxChange={handleMaxChange}
        onAddProcess={handleAddProcess}
        onRemoveProcess={handleRemoveProcess}
      />
      <RequestForm
        processes={processes}
        resourceKeys={resourceKeys}
        onRequest={handleRequest}
      /> */}
    </div>
  );
};

export default Deadlock;
