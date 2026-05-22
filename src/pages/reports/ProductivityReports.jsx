import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductivityReports } from '../../redux/slices/reportSlice.js';
import Card from '../../components/common/Card.jsx';

function ProductivityReports() {
  const dispatch = useDispatch();
  const { productivityReports, status, error } = useSelector(state => state.report);

  useEffect(() => {
    dispatch(fetchProductivityReports());
  }, [dispatch]);

  const stats = [
    { label: 'Design completion rate', value: productivityReports.designCompletionRate || '0%' },
    { label: 'Print turnaround time', value: productivityReports.printTurnaroundTime || 'N/A' },
    { label: 'Delivery success rate', value: productivityReports.deliverySuccessRate || '0%' },
    { label: 'Avg task duration', value: productivityReports.avgTaskDuration || 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Productivity reports</h1>
        <p className="text-sm text-text-muted">Review team efficiency and production throughput.</p>
      </div>
      
      <Card title="Productivity metrics">
        {status === 'loading' ? (
          <div className="py-8 text-center text-text-muted">Loading productivity reports...</div>
        ) : error ? (
          <div className="rounded-lg alert-error">
            Error: {error}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {stats.map(stat => (
              <div key={stat.label} className="rounded-lg border border-border-theme p-4 ">
                <p className="text-sm text-text-muted">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-text-primary">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default ProductivityReports;
