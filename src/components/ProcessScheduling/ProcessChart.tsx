import React from 'react';
import { AlgorithmResult, Process } from '../../logic/ProcessScheduling/types';
import '../../styles/ProcessScheduling/ProcessChart.css';

interface Props {
  result: AlgorithmResult;
  processes: Process[];
}

const getProcessOrder = (processes: Process[] | undefined, ganttChart: { id: string }[]) => {
  if (processes && processes.length > 0) {
    return [...processes].sort((a, b) => {
      const na = Number(a.id.replace(/\D/g, ''));
      const nb = Number(b.id.replace(/\D/g, ''));
      return na - nb;
    });
  }
  const ids = Array.from(new Set(ganttChart.map(g => g.id)));
  return ids.map(id => ({ id }));
};

const ProcessChart: React.FC<Props> = ({ result, processes }) => {
  // Map process id to arrival/duration/priority if available
  const procMap: Record<string, Process> = {};
  if (processes) {
    processes.forEach(p => { procMap[p.id] = p; });
  }

  const gantt = result.ganttChart;
  const processIds = getProcessOrder(processes, gantt).map(p => p.id);

  // Find first and last execution for each process
  const completionTimes: Record<string, number> = {};
  const firstResponse: Record<string, number> = {};
  gantt.forEach(({ id, start, end }) => {
    completionTimes[id] = end;
    if (!(id in firstResponse)) firstResponse[id] = start;
  });

  const rows = processIds.map((id, _) => {
    const arrival = procMap[id]?.arrivalTime ?? 0;
    const burst = procMap[id]?.duration ?? 0;
    const completion = completionTimes[id] ?? 0;
    const turnaround = completion - arrival;
    const waiting = turnaround - burst;
    const response = (firstResponse[id] ?? 0) - arrival;
    return {
      id,
      arrival,
      burst,
      completion,
      turnaround,
      waiting,
      response,
    };
  });

  // Gantt Chart rendering
  // Tính tổng thời gian để set width động cho Gantt Chart
  const totalTime = gantt.length > 0 ? gantt[gantt.length - 1].end - gantt[0].start : 0;
  const pxPerUnit = 40; // mỗi đơn vị thời gian = 40px, có thể chỉnh lại cho phù hợp

  return (
    <div className="process-chart">
      <h2 className="mb-2">Gantt Chart</h2>
      <div className="gantt-chart-container">
        <div
          className="gantt-chart-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: totalTime > 0 ? totalTime * pxPerUnit + 60 : 'auto',
          }}
        >
          {gantt.map((block, idx) => (
            <div
              key={idx}
              className="gantt-block"
              style={{
                width: (block.end - block.start) * pxPerUnit,
                minWidth: 40,
              }}
            >
              <div className="gantt-block-label">{block.id}</div>
              <div className="gantt-block-time gantt-block-time-left">{block.start}</div>
              {idx === gantt.length - 1 && (
                <div className="gantt-block-time gantt-block-time-right">{block.end}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-2">Process Table</h2>
      <div className="table-responsive">
        <table className="process-table">
          <thead>
            <tr>
              <th>Process</th>
              <th>Arrival Time</th>
              <th>Duration</th>
              <th>Completion Time</th>
              <th>Turn-around Time</th>
              <th>Waiting Time</th>
              <th>Response Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.arrival}</td>
                <td>{row.burst}</td>
                <td>{row.completion}</td>
                <td>{row.turnaround}</td>
                <td>{row.waiting}</td>
                <td>{row.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Average Waiting Time:</strong> {result.avgWaitingTime} <br />
        <strong>Average Turn-around Time:</strong> {result.avgTurnaroundTime}
      </div>
    </div>
  );
};

export default ProcessChart;