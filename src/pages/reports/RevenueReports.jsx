import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRevenueReports } from '../../redux/slices/reportSlice.js';
import Card from '../../components/common/Card.jsx';

function RevenueReports() {
  const dispatch = useDispatch();
  const { revenueReports, status, error } = useSelector(state => state.report);

  useEffect(() => {
    dispatch(fetchRevenueReports());
  }, [dispatch]);

  const stats = [
    { label: 'Monthly revenue', value: revenueReports.monthlyRevenue || '$0' },
    { label: 'Average order value', value: revenueReports.avgOrderValue || '$0' },
    { label: 'Top segment', value: revenueReports.topSegment || 'N/A' },
    { label: 'Growth rate', value: revenueReports.growthRate || '0%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Revenue reports</h1>
        <p className="text-sm text-text-muted">Monitor revenue generated from WhatsApp leads and production services.</p>
      </div>
      
      <Card title="Revenue insights">
        {status === 'loading' ? (
          <div className="py-8 text-center text-text-muted">Loading revenue reports...</div>
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

export default RevenueReports;
