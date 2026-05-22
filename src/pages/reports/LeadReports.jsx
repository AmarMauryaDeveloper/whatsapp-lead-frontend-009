import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadReports } from '../../redux/slices/reportSlice.js';
import Card from '../../components/common/Card.jsx';

function LeadReports() {
  const dispatch = useDispatch();
  const { leadReports, status, error } = useSelector(state => state.report);

  useEffect(() => {
    dispatch(fetchLeadReports());
  }, [dispatch]);

  const stats = [
    { label: 'Total leads', value: leadReports.totalLeads || '0' },
    { label: 'Qualified leads', value: leadReports.qualifiedLeads || '0' },
    { label: 'Conversion rate', value: leadReports.conversionRate || '0%' },
    { label: 'Avg response time', value: leadReports.avgResponseTime || 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lead reports</h1>
        <p className="text-sm text-text-muted">Analyze WhatsApp lead performance and conversion trends.</p>
      </div>
      
      <Card title="Performance summary">
        {status === 'loading' ? (
          <div className="py-8 text-center text-text-muted">Loading lead reports...</div>
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

export default LeadReports;
