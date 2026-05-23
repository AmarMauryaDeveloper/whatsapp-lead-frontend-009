import { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import Input from '../../components/common/Input.jsx';

const customers = [
  { id: 'alis', label: 'Alisped India Pvt. Ltd.', type: 'Existing' },
  { id: 'nxtorbit', label: 'NXT Orbit Logistics', type: 'Prospective' },
  { id: 'aurora', label: 'Aurora Retail Pvt. Ltd.', type: 'VIP' },
];

const callModes = ['Visit', 'Phone Call', 'Video Call', 'Email'];
const callStatuses = ['Interested', 'Not Interested', 'Follow-up', 'Closed'];
const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
const commodities = ['Select...', 'Textiles', 'Machinery', 'Electronics', 'Food', 'Pharma'];

function CreateCallEntry() {
  const [form, setForm] = useState({
    customer: 'alis',
    mode: 'Visit',
    date: new Date().toISOString().slice(0, 10),
    startTime: '',
    endTime: '',
    status: 'Interested',
    frequency: 'Weekly',
    shipments: '0',
    commodity: '',
    overallPotential: '0.00',
    note: '',
  });

  const selectedCustomer = useMemo(
    () => customers.find(customer => customer.id === form.customer),
    [form.customer]
  );

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-border-theme bg-secondary/90 p-6 shadow-theme md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Sales Organizer</p>
          <h1 className="text-3xl font-semibold text-text-primary">Create Call Entry</h1>
          <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
            <span className="rounded-full bg-muted px-3 py-2">Auto-generated: CE-MUM-2026-XXXX</span>
            <span className="rounded-full bg-muted px-3 py-2">Pune branch</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" className="min-w-[170px]">Call History</Button>
          <Button variant="secondary" className="min-w-[170px]">Quotation History</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Card title="Customer Details" subtitle="Capture the customer call data with quick controls.">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Customer Name *
                  <select
                    name="customer"
                    value={form.customer}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  >
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" className="mt-3 text-sm font-semibold text-brand-600 hover:text-brand-700">
                  + Add Customer
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Call Mode *
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  >
                    {callModes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </label>
              </div>

              <Input
                label="Call Date *"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Call Start Time *
                  <input
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Call End Time *
                  <input
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Call Status *
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  >
                    {callStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Customer Type
                  <input
                    disabled
                    value={selectedCustomer?.type ?? 'Auto-filled'}
                    className="input-theme mt-2 block w-full bg-muted/80"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Frequency
                  <select
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  >
                    {frequencies.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <Input
                label="No. of Shipments"
                name="shipments"
                type="number"
                value={form.shipments}
                min="0"
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Commodity
                  <select
                    name="commodity"
                    value={form.commodity}
                    onChange={handleChange}
                    className="input-theme mt-2 block w-full"
                  >
                    {commodities.map(item => (
                      <option key={item} value={item === 'Select...' ? '' : item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Customer Overall Potential
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-2xl border border-border-theme bg-muted px-4 py-3 text-text-secondary">INR</span>
                    <input
                      name="overallPotential"
                      type="number"
                      value={form.overallPotential}
                      onChange={handleChange}
                      className="input-theme flex-1"
                    />
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Existing Potential
                  <input
                    disabled
                    value="Alisped India Potential"
                    className="input-theme mt-2 block w-full bg-muted/80"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary">
                Note
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Add any relevant notes about this call..."
                  className="input-theme mt-2 block w-full resize-none"
                />
              </label>
            </div>

            <div className="flex justify-end">
              <Button>Save Call Entry</Button>
            </div>
          </div>
        </Card>

        <Card title="Contact Details" subtitle="Add or select contact information for this entry.">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border-theme bg-muted/60 p-4">
                <p className="text-sm font-semibold text-text-primary">Primary contact</p>
                <p className="mt-2 text-sm text-text-secondary">Kedar Shetgaonkar</p>
                <p className="mt-1 text-sm text-text-secondary">+91 98765 43210</p>
                <p className="mt-1 text-sm text-text-secondary">Sales Manager</p>
              </div>
              <div className="rounded-3xl border border-border-theme bg-muted/60 p-4">
                <p className="text-sm font-semibold text-text-primary">Secondary contact</p>
                <p className="mt-2 text-sm text-text-secondary">Nisha Patel</p>
                <p className="mt-1 text-sm text-text-secondary">+91 91234 56789</p>
                <p className="mt-1 text-sm text-text-secondary">Operations</p>
              </div>
            </div>

            <Button variant="secondary" className="w-full justify-center gap-2">
              <FiPlus /> Add More Contacts
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateCallEntry;
