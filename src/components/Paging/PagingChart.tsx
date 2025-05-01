import React from 'react';
import { PagingResult } from '../../logic/Paging/types';
import '../../styles/Paging/PagingChart.css';

interface Props {
  result: PagingResult;
}

const CELL_W = 40;
const CELL_H = 36;

const PagingChart: React.FC<Props> = ({ result }) => {
  if (!result) return null;
  const frameCount = result.steps[0]?.frames.length || 0;

  return (
    <div className="paging-chart-container" style={{ overflowX: 'auto' }}>
      <div className="paging-chart-title">Memory State at Each Step</div>
      <div className="paging-chart-header-row" style={{ display: 'flex' }}>
        <div
          className="paging-chart-header-cell"
          style={{
            width: CELL_W,
            height: CELL_H,
            background: '#f1f5fb',
            borderBottom: '2px solid #2563eb',
            borderRadius: '6px 6px 0 0',
          }}
        ></div>
        {result.steps.map((s, i) => (
          <div className="paging-chart-header-cell" key={i}>
            {s.page}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        {/* Frame index */}
        <div className="paging-chart-frame-index-col">
          {Array.from({ length: frameCount }).map((_, row) => (
            <div className="paging-chart-frame-index-cell" key={row}>
              F{row + 1}
            </div>
          ))}
        </div>
        {/* Memory states */}
        <div style={{ display: 'flex' }}>
          {result.steps.map((s, col) => (
            <div className="paging-chart-memory-col" key={col}>
              {s.frames.map((page, row) => {
                const prev = col > 0 ? result.steps[col - 1].frames[row] : null;
                const isNew = page !== prev && page !== null;
                return (
                  <div
                    key={row}
                    className={
                      'paging-chart-memory-cell' + (isNew ? ' new' : '')
                    }
                  >
                    {page ?? '-'}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="paging-chart-stats">
        <span>
          <b>Page Faults:</b> {result.totalFault}
        </span>
        <span>
          <b>Hits:</b> {result.totalHit}
        </span>
        <span>
          <b>Hit Rate:</b> {(result.totalHit / result.steps.length * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default PagingChart;