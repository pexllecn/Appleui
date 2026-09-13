'use client';

import { useMemo, useRef, useState } from 'react';
import { ArrowUp, CalendarDays, ChevronDown, CircleHelp, History, Maximize2 } from 'lucide-react';
import { Button, Modal, PageHeader, downloadFile } from '../ui';
import './analytics.css';

type Report = 'Total sales' | 'Total orders' | 'Online store sessions' | 'Online store conversion rate';
type Period = '30' | '14' | '7';
const currentSales = [22,29,27,25,31,32,38,35,44,38,35,34,36,40,40,47,49,55,57,58,60,64,63,60,60,57,55,55,60,61,62,63,67,68,66,63,60,58,57,56,59,60,59,56,53,52,56,58,58,60,61,64,62,60,65,65,67,65,63,64,76,78.5];
const previousSales = [28,27,25,25,27,25,22,24,25,24,27,24,22,20,20,18,19,24,25,25,27,26,28,27,30,32,30,27,26,29,29,31,28,30,29,31,30,31,36,37,38,39,41,42,43,46,45,48,49,51,52,51,53,48,47,43,44,45,43,46,45,38];
const money = (value: number) => '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
const dateLabels: Record<Period, string[]> = { '30': ['May 25', 'Jun 3', 'Jun 13', 'Jun 23'], '14': ['Jun 10', 'Jun 14', 'Jun 19', 'Jun 23'], '7': ['Jun 17', 'Jun 19', 'Jun 21', 'Jun 23'] };
const periodRanges: Record<Period, string> = { '30': 'May 25 – Jun 23, 2024', '14': 'Jun 10 – Jun 23, 2024', '7': 'Jun 17 – Jun 23, 2024' };
const previousRanges: Record<Period, string> = { '30': 'Apr 25 – May 24, 2024', '14': 'May 27 – Jun 9, 2024', '7': 'Jun 10 – Jun 16, 2024' };
function allocate(weights: number[], total: number) {
  const sum = weights.reduce((a, b) => a + b, 0);
  let running = 0, assigned = 0;
  return weights.map(weight => { running += weight; const next = Math.round(running / sum * total); const value = next - assigned; assigned = next; return value; });
}

function LineChart({ series, previous, period, sessions = false }: { series: number[]; previous?: number[]; period: Period; sessions?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = sessions ? Math.ceil(Math.max(...series) / 10) * 10 : Math.ceil(Math.max(...series, ...(previous || [])));
  const width = 700, height = 215, x0 = 49, x1 = 680, y0 = 18, y1 = 167;
  const toX = (index: number) => x0 + index / (series.length - 1) * (x1 - x0);
  const toY = (value: number) => y1 - value / max * (y1 - y0);
  const path = (data: number[]) => data.map((value, index) => `${index ? 'L' : 'M'}${toX(index).toFixed(2)},${toY(value).toFixed(2)}`).join(' ');
  const labels = sessions ? [String(max), String(max / 2), '0'] : [`$${max}k`, `$${max / 2}k`, '$0'];
  return <div className="analytics-chart" onMouseLeave={() => setHovered(null)}>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Daily ${sessions ? 'store sessions' : 'sales'} over ${period} days${previous ? ', with the previous period for comparison' : ''}`} onMouseMove={event => {
      const box = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width * width;
      setHovered(Math.max(0, Math.min(series.length - 1, Math.round((x - x0) / (x1 - x0) * (series.length - 1)))));
    }}>
      {[y0, (y0 + y1) / 2, y1].map((y, index) => <g key={y}><line x1={x0} x2={x1} y1={y} y2={y} className="analytics-grid-line" /><text x="7" y={y + 4} className="analytics-axis">{labels[index]}</text></g>)}
      {previous && <path d={path(previous)} className="analytics-line analytics-line-previous" />}
      <path d={path(series)} className="analytics-line" />
      {dateLabels[period].map((date, index) => <text key={date} x={x0 + 62 + index * (x1 - x0 - 92) / 3} y="196" textAnchor="middle" className="analytics-axis">{date}</text>)}
      {hovered !== null && <g><line x1={toX(hovered)} x2={toX(hovered)} y1={y0} y2={y1} className="analytics-hover-line" /><circle cx={toX(hovered)} cy={toY(series[hovered])} r="4" className="analytics-chart-point" /></g>}
    </svg>
    {hovered !== null && <div className="analytics-tooltip">Day {Math.round(hovered / (series.length - 1) * (Number(period) - 1)) + 1}<strong>{sessions ? Math.round(series[hovered]) + ' sessions' : money(series[hovered] * 1000)}</strong></div>}
  </div>;
}

function OrderChart({ comparison, period, orders }: { comparison: boolean; period: Period; orders: number[] }) {
  const values = [0, 0, 0, 0];
  orders.forEach((value, index) => { values[Math.min(3, Math.floor(index / orders.length * 4))] += value; });
  const oldValues = allocate([110, 245, 87, 245], Math.round(285 * Number(period) / 30));
  const groups = values.map((value, index) => [oldValues[index], value]);
  const max = Math.ceil(Math.max(...values, ...oldValues) / 50) * 50;
  return <svg className="analytics-bars" viewBox="0 0 320 215" role="img" aria-label={`Orders over the last ${period} days${comparison ? ' compared with the previous period' : ''}`}>
    {[18, 92, 166].map((y, index) => <g key={y}><text x="0" y={y + 4} className="analytics-axis">{[max, max / 2, 0][index]}</text><line x1="39" x2="311" y1={y} y2={y} className="analytics-grid-line" /></g>)}
    {groups.map(([old, value], index) => <g key={index}>{comparison && <rect x={68 + index * 63} y={166 - old / max * 148} width="8" height={old / max * 148} rx="3" fill="#d5d0fa" />}<rect x={comparison ? 79 + index * 63 : 74 + index * 63} y={166 - value / max * 148} width="8" height={value / max * 148} rx="3" fill="#8277fa" /></g>)}
    <text x="66" y="196" textAnchor="middle" className="analytics-axis">{dateLabels[period][0]}</text><text x="279" y="196" textAnchor="middle" className="analytics-axis">Jun 23</text>
  </svg>;
}

function Legend({ comparison, period, compact = false }: { comparison: boolean; period: Period; compact?: boolean }) {
  return <div className={`analytics-legend ${compact ? 'analytics-legend-stacked' : ''}`}><span><i />{periodRanges[period]}</span>{comparison && <span><i className="legend-previous" />{previousRanges[period]}</span>}</div>;
}

export function AnalyticsScreen({ notify }: { notify: (message: string) => void }) {
  const [period, setPeriod] = useState<Period>('30');
  const [comparison, setComparison] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const factor = Number(period) / 30;
  const salesTotal = Math.round(78500 * factor), profitTotal = Math.round(42700 * factor), ordersTotal = Math.round(320 * factor), sessionsTotal = Math.round(390 * factor);
  const sample = useMemo(() => {
    const weights = Array.from({ length: Number(period) }, (_, index) => currentSales[Math.floor(index / (Number(period) - 1) * (currentSales.length - 1))]);
    const previousWeights = Array.from({ length: Number(period) }, (_, index) => previousSales[Math.floor(index / (Number(period) - 1) * (previousSales.length - 1))]);
    return { sales: allocate(weights, salesTotal), previous: allocate(previousWeights, Math.round(58000 * factor)), orders: allocate(weights, ordersTotal), sessions: allocate(weights, sessionsTotal) };
  }, [period, factor, salesTotal, ordersTotal, sessionsTotal]);
  const sales = sample.sales.map(value => value / 1000), previous = sample.previous.map(value => value / 1000), sessions = sample.sessions;
  const metrics = [
    { label: 'Total sales', value: money(salesTotal), explanation: 'Gross sales before deductions for the selected sample period.' },
    { label: 'Gross profit', value: money(profitTotal), explanation: 'Sample revenue less the cost of goods sold.' },
    { label: 'Gross margin', value: (profitTotal / salesTotal * 100).toFixed(2) + '%', explanation: 'Gross profit as a percentage of total sales.' },
    { label: 'Total orders', value: ordersTotal.toLocaleString(), explanation: 'Number of sample orders in the selected period.' },
  ];
  const reportRows = Array.from({ length: Number(period) }, (_, index) => {
    const day = new Date(Date.UTC(2024, 5, 24 - Number(period) + index));
    return { date: day.toISOString().slice(0, 10), sales: sample.sales[index], orders: sample.orders[index], sessions: sample.sessions[index], conversion: (sample.orders[index] / sample.sessions[index] * 100).toFixed(2) + '%' };
  });
  function exportReport() {
    downloadFile(`appleui-${report?.toLowerCase().replaceAll(' ', '-')}-${period}-days.csv`, ['Date,Sales (USD),Orders,Sessions,Conversion rate', ...reportRows.map(row => `${row.date},${row.sales},${row.orders},${row.sessions},${row.conversion}`)].join('\n'), 'text/csv;charset=utf-8;');
    notify('Sample report downloaded');
  }
  return <div className="page-content analytics-screen" ref={ref}>
    <PageHeader title="Hey, Mikhail" description="Sunday, June 23, 2024" action={<span className="analytics-demo">Sample store</span>} />
    <div className="analytics-toolbar">
      <div className="analytics-controls">
        <label className="analytics-select"><CalendarDays size={15} /><select aria-label="Report period" value={period} onChange={event => setPeriod(event.target.value as Period)}><option value="30">Last 30 days</option><option value="14">Last 14 days</option><option value="7">Last 7 days</option></select><ChevronDown size={14} /></label>
        <label className="analytics-select"><History size={15} /><select aria-label="Compare report period" value={comparison ? 'previous' : 'none'} onChange={event => setComparison(event.target.value === 'previous')}><option value="previous">Compare: Previous period</option><option value="none">No comparison</option></select><ChevronDown size={14} /></label>
      </div>
      <Button className="analytics-fullscreen" onClick={async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await ref.current?.requestFullscreen(); } catch { notify('Full-screen is unavailable in this browser'); } }}><Maximize2 size={14} />Full-screen</Button>
    </div>
    <section className="analytics-metrics" aria-label="Store performance">
      {metrics.map(metric => <div className="analytics-metric" key={metric.label}><div>{metric.label}<span title={metric.explanation} tabIndex={0} aria-label={metric.explanation}><CircleHelp size={12} /></span></div><strong>{metric.value}</strong></div>)}
    </section>
    <div className="analytics-main-charts">
      <section className="analytics-panel analytics-sales"><header><h2>Total sales</h2><Button onClick={() => setReport('Total sales')}>View report</Button></header><LineChart series={sales} previous={comparison ? previous : undefined} period={period} /><Legend comparison={comparison} period={period} /></section>
      <section className="analytics-panel analytics-orders"><header><h2>Total orders</h2><Button onClick={() => setReport('Total orders')}>View report</Button></header><OrderChart comparison={comparison} period={period} orders={sample.orders} /><Legend comparison={comparison} period={period} compact /></section>
    </div>
    <div className="analytics-secondary-charts">
      <section className="analytics-panel"><header><div><h2 className="analytics-small-title">Online store sessions</h2><strong className="analytics-panel-value">{sessionsTotal}</strong></div><Button onClick={() => setReport('Online store sessions')}>View report</Button></header><LineChart series={sessions} period={period} sessions /></section>
      <section className="analytics-panel analytics-conversion"><header><div><h2 className="analytics-small-title">Online store conversion rate</h2><strong className="analytics-panel-value">{(ordersTotal / sessionsTotal * 100).toFixed(2)}%</strong></div><Button onClick={() => setReport('Online store conversion rate')}>View report</Button></header><div className="analytics-funnel">{[{ label: 'Added to cart', count: Math.round(370 * factor), growth: '0.1%' }, { label: 'Reached checkout', count: Math.round(345 * factor), growth: '0.4%' }, { label: 'Completed checkout', count: ordersTotal, growth: '0.2%' }].map(item => <div className="analytics-funnel-item" key={item.label}><div className="analytics-funnel-row"><div>{item.label}<small>{item.count} sessions</small></div><span>{(item.count / sessionsTotal * 100).toFixed(2)}%</span><span className="analytics-growth"><ArrowUp size={14} />{item.growth}</span></div><div className="analytics-funnel-track"><div style={{ width: `${item.count / sessionsTotal * 100}%` }} /></div></div>)}</div></section>
    </div>
    <p className="analytics-footnote">Sample store data. Line charts show daily values; bars group orders into four intervals.</p>
    <Modal open={report !== null} onClose={() => setReport(null)} title={report || 'Report'} className="analytics-report"><p className="analytics-report-description">{periodRanges[period]} · Sample store data</p><div className="analytics-report-table"><table><thead><tr><th>Date</th><th>{report === 'Total orders' ? 'Orders' : report === 'Online store sessions' ? 'Sessions' : report === 'Online store conversion rate' ? 'Conversion' : 'Sales'}</th></tr></thead><tbody>{reportRows.map(row => <tr key={row.date}><td>{row.date}</td><td>{report === 'Total orders' ? row.orders : report === 'Online store sessions' ? row.sessions : report === 'Online store conversion rate' ? row.conversion : money(row.sales)}</td></tr>)}</tbody></table></div><div className="analytics-report-actions"><Button onClick={() => setReport(null)}>Done</Button><Button variant="primary" onClick={exportReport}>Download CSV</Button></div></Modal>
  </div>;
}
