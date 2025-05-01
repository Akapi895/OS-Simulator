import React from 'react';
import { PagingResult } from '../../logic/Paging/types';
import '../../styles/Paging/ResultTable.css';

interface Props {
  result: PagingResult;
}

const ResultTable: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const hasFrequency = result.steps.some(s => s.frequency);
  const hasReferenceBits = result.steps.some(s => s.referenceBits);

  return (
    <div className="paging-result-table">
      <h3>Simulation Result</h3>
      <div>
        <b>Page Faults:</b> {result.totalFault} &nbsp; | &nbsp;
        <b>Hits:</b> {result.totalHit} &nbsp; | &nbsp;
        <b>Hit Rate:</b> {(result.totalHit / result.steps.length * 100).toFixed(2)}%
      </div>
      <div style={{ overflowX: 'auto', marginTop: 16 }}>
        <table>
          <thead>
            <tr>
              <th>Step</th>
              <th>Page</th>
              <th>Frames</th>
              {hasFrequency && <th>Frequency</th>}
              {hasReferenceBits && <th>Reference Bits</th>}
              <th>Hit/Miss</th>
              <th>Replaced</th>
            </tr>
          </thead>
          <tbody>
            {result.steps.map(s => (
              <tr key={s.step}>
                <td>{s.step}</td>
                <td>{s.page}</td>
                <td>
                  {s.frames.map((f, i) => (
                    <span key={i} style={{ display: 'inline-block', minWidth: 24, textAlign: 'center' }}>
                      {f ?? '-'}
                      {i < s.frames.length - 1 && ', '}
                    </span>
                  ))}
                </td>
                {hasFrequency && (
                  <td>
                    {s.frequency
                      ? s.frequency.map((f, i) => (
                          <span key={i} style={{ minWidth: 18, display: 'inline-block', textAlign: 'center' }}>
                            {f !== undefined && f !== '' ? f : '-'}
                            {s.frequency && i < s.frequency.length - 1 && ', '}
                          </span>
                        ))
                      : ''}
                  </td>
                )}
                {hasReferenceBits && (
                  <td>
                    {s.referenceBits ? s.referenceBits.map((b, i) => (
                      <span key={i} style={{ minWidth: 18, display: 'inline-block', textAlign: 'center' }}>
                        {b !== undefined && b !== '' ? b : '-'}
                        {s.referenceBits && i < s.referenceBits.length - 1 && ', '}
                      </span>
                    )) : ''}
                  </td>
                )}
                <td style={{ color: s.hit ? 'green' : 'red', fontWeight: 600 }}>
                  {s.hit ? 'Hit' : 'Miss'}
                </td>
                <td>{s.replaced ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;