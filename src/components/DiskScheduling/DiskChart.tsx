import React from 'react';
import '../../styles/DiskScheduling/DiskChart.css'; 
import { AlgorithmResult, IdleSegment } from '../../logic/DiskScheduling/types';

interface Props {
  result: AlgorithmResult;
  maxTrack: number;
}

const chartWidth = 1000;
const margin = 20;
const rulerHeight = 80;
const rowSpacing = 48;

const DiskChart: React.FC<Props> = ({ result, maxTrack }) => {
  const { path, starvationSteps, idleSegments } = result as AlgorithmResult & { idleSegments?: IdleSegment[] };
  const minTrack = 0; // Luôn bắt đầu từ 0
  // maxTrack lấy từ prop

  const chartHeight = Math.max(200, rowSpacing * (path.length - 1) + 2 * margin);

  const points = path.map((track, idx) => ({
    x: margin + ((track - minTrack) * (chartWidth - 2 * margin)) / (maxTrack - minTrack || 1),
    y: rulerHeight + margin + idx * rowSpacing,
    value: track,
  }));

  // Ruler: các giá trị track từ 0 đến maxTrack, chia đều (ví dụ chia 10 đoạn)
  const rulerSteps = 10;
  const rulerPoints = Array.from({ length: rulerSteps + 1 }, (_, i) => {
    const value = Math.round((i * (maxTrack - minTrack)) / rulerSteps + minTrack);
    return {
      x: margin + ((value - minTrack) * (chartWidth - 2 * margin)) / (maxTrack - minTrack || 1),
      value,
    };
  });

  // Tạo các đoạn polyline, nếu bước tiếp theo nằm trong starvationSteps thì tô đỏ
  const lines = points.slice(1).map((p, idx) => {
    const prev = points[idx];
    const isStarvation = starvationSteps?.includes(idx + 1);
    return (
      <line
        key={idx}
        x1={prev.x}
        y1={prev.y}
        x2={p.x}
        y2={p.y}
        stroke={isStarvation ? "#ef4444" : "#2563eb"}
        strokeWidth={3}
      />
    );
  });

  // Vẽ các đoạn idle màu đỏ
  const idleLines = (idleSegments || []).map((seg, idx) => {
    const from = points[seg.fromIdx];
    const to = points[seg.toIdx];
    if (!from || !to) return null;
    return (
      <line
        key={`idle-${idx}`}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#ef4444"
        strokeWidth={8}
        strokeDasharray=""
        opacity={0.95}
      />
    );
  });

  return (
    <div className="disk-chart">
      <h2>Kết quả di chuyển đầu đọc</h2>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + rulerHeight}`}
          style={{ width: '100%', height: 'auto', background: '#f3f4f6', borderRadius: 12 }}
        >
          {/* Thanh ruler phía trên */}
          <g>
            <line
              x1={margin}
              y1={rulerHeight / 2}
              x2={chartWidth - margin}
              y2={rulerHeight / 2}
              stroke="#bbb"
              strokeWidth={2}
            />
            {rulerPoints.map((p, idx) => (
              <g key={idx}>
                <circle cx={p.x} cy={rulerHeight / 2} r={6} fill="#fbbf24" />
                <text
                  x={p.x}
                  y={rulerHeight / 2 - 12}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#333"
                >
                  {p.value}
                </text>
              </g>
            ))}
          </g>
          {/* Trục Y: thứ tự bước */}
          <line
            x1={margin}
            y1={rulerHeight + margin}
            x2={margin}
            y2={chartHeight + rulerHeight - margin}
            stroke="#888"
            strokeWidth={1}
          />
          {/* Trục X: giá trị track */}
          <line
            x1={margin}
            y1={chartHeight + rulerHeight - margin}
            x2={chartWidth - margin}
            y2={chartHeight + rulerHeight - margin}
            stroke="#888"
            strokeWidth={1}
          />
          {/* Đường đi của đầu đọc */}
          {idleLines}
          {lines}
          {/* Các điểm di chuyển */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r={8} fill="#60a5fa" />
              <text
                x={p.x + 14}
                y={p.y + 4}
                fontSize="12"
                fill="#333"
              >
                {p.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="move-path" style={{ margin: '12px 0', fontSize: 18 }}>
        <strong>Quãng đường di chuyển:</strong> {path.join(' ⟶ ')}
      </div>
      <div className="total-distance">
        <strong>Tổng quãng đường di chuyển:</strong> {result.totalDistance}
      </div>
      {starvationSteps && starvationSteps.length > 0 && (
        <div className="starvation-warning">
          Cảnh báo: Có hiện tượng starvation tại các bước {starvationSteps.join(', ')}!
        </div>
      )}
    </div>
  );
};

export default DiskChart;