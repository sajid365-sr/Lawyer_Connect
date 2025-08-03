'use client';

import React, { useState } from 'react';
import { Commission, Payment } from '@/types';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  CalendarDaysIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface CommissionTrackerProps {
  userType: 'lawyer' | 'admin';
  lawyerId?: string;
}

const CommissionTracker: React.FC<CommissionTrackerProps> = ({ userType, lawyerId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'disputed'>('all');

  // Mock commission data
  const commissions: Commission[] = [
    {
      id: 'comm1',
      lawyerId: 'lawyer1',
      bookingId: 'book1',
      paymentId: 'pay1',
      grossAmount: 200,
      platformFee: 30,
      platformFeePercentage: 15,
      netAmount: 170,
      status: 'paid',
      payoutDate: '2025-08-01',
      createdAt: '2025-07-28T10:00:00Z'
    },
    {
      id: 'comm2',
      lawyerId: 'lawyer1',
      bookingId: 'book2',
      paymentId: 'pay2',
      grossAmount: 300,
      platformFee: 45,
      platformFeePercentage: 15,
      netAmount: 255,
      status: 'pending',
      createdAt: '2025-08-01T14:00:00Z'
    },
    {
      id: 'comm3',
      lawyerId: 'lawyer2',
      bookingId: 'book3',
      paymentId: 'pay3',
      grossAmount: 150,
      platformFee: 22.5,
      platformFeePercentage: 15,
      netAmount: 127.5,
      status: 'disputed',
      createdAt: '2025-07-30T09:00:00Z'
    },
    {
      id: 'comm4',
      lawyerId: 'lawyer1',
      bookingId: 'book4',
      paymentId: 'pay4',
      grossAmount: 400,
      platformFee: 60,
      platformFeePercentage: 15,
      netAmount: 340,
      status: 'paid',
      payoutDate: '2025-07-25',
      createdAt: '2025-07-22T16:00:00Z'
    }
  ];

  // Filter commissions based on user type and filters
  const filteredCommissions = commissions.filter(commission => {
    if (userType === 'lawyer' && lawyerId && commission.lawyerId !== lawyerId) {
      return false;
    }
    if (statusFilter !== 'all' && commission.status !== statusFilter) {
      return false;
    }
    return true;
  });

  // Calculate summary statistics
  const totalGrossAmount = filteredCommissions.reduce((sum, comm) => sum + comm.grossAmount, 0);
  const totalPlatformFees = filteredCommissions.reduce((sum, comm) => sum + comm.platformFee, 0);
  const totalNetAmount = filteredCommissions.reduce((sum, comm) => sum + comm.netAmount, 0);
  const pendingAmount = filteredCommissions
    .filter(comm => comm.status === 'pending')
    .reduce((sum, comm) => sum + comm.netAmount, 0);

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', gross: 3200, platform: 480, net: 2720 },
    { month: 'Feb', gross: 3800, platform: 570, net: 3230 },
    { month: 'Mar', gross: 4200, platform: 630, net: 3570 },
    { month: 'Apr', gross: 3900, platform: 585, net: 3315 },
    { month: 'May', gross: 4500, platform: 675, net: 3825 },
    { month: 'Jun', gross: 4800, platform: 720, net: 4080 },
    { month: 'Jul', gross: 4200, platform: 630, net: 3570 }
  ];

  const statusDistribution = [
    { name: 'Paid', value: filteredCommissions.filter(c => c.status === 'paid').length, color: '#10B981' },
    { name: 'Pending', value: filteredCommissions.filter(c => c.status === 'pending').length, color: '#F59E0B' },
    { name: 'Disputed', value: filteredCommissions.filter(c => c.status === 'disputed').length, color: '#EF4444' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'disputed':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'disputed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Commission ID', 'Booking ID', 'Gross Amount', 'Platform Fee', 'Net Amount', 'Status', 'Date'].join(','),
      ...filteredCommissions.map(comm => [
        comm.id,
        comm.bookingId,
        comm.grossAmount,
        comm.platformFee,
        comm.netAmount,
        comm.status,
        format(new Date(comm.createdAt), 'yyyy-MM-dd')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commissions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userType === 'lawyer' ? 'My Earnings' : 'Commission Tracking'}
          </h2>
          <p className="text-gray-600">
            {userType === 'lawyer' 
              ? 'Track your earnings and commission details'
              : 'Monitor platform commissions and payouts'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="disputed">Disputed</option>
          </select>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <BanknotesIcon className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {userType === 'lawyer' ? 'Total Earned' : 'Total Revenue'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${(userType === 'lawyer' ? totalNetAmount : totalGrossAmount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {userType === 'lawyer' ? 'Platform Fees' : 'Commission Earned'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalPlatformFees.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Payout</p>
              <p className="text-2xl font-bold text-gray-900">
                ${pendingAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Commission</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredCommissions.length > 0 
                  ? `${((totalPlatformFees / totalGrossAmount) * 100).toFixed(1)}%`
                  : '0%'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                `$${value}`, 
                name === 'gross' ? 'Gross' : name === 'platform' ? 'Platform Fee' : 'Net'
              ]} />
              <Bar dataKey="gross" fill="#3B82F6" />
              <Bar dataKey="platform" fill="#EF4444" />
              <Bar dataKey="net" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commission Details Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Commission Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {userType === 'admin' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {commission.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {commission.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${commission.grossAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${commission.platformFee.toFixed(2)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({commission.platformFeePercentage}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${commission.netAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(commission.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{format(new Date(commission.createdAt), 'MMM d, yyyy')}</p>
                      {commission.payoutDate && (
                        <p className="text-xs text-green-600">
                          Paid: {format(new Date(commission.payoutDate), 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </td>
                  {userType === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {commission.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-900 text-xs px-2 py-1 border border-green-600 rounded hover:bg-green-50">
                            Process Payout
                          </button>
                        )}
                        {commission.status === 'disputed' && (
                          <button className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 border border-blue-600 rounded hover:bg-blue-50">
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Schedule (for lawyers) */}
      {userType === 'lawyer' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Next Payout</h4>
              <p className="text-2xl font-bold text-blue-900">${pendingAmount.toFixed(2)}</p>
              <p className="text-sm text-blue-600">Expected: {format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Payout Method</h4>
              <p className="text-sm text-gray-600">Bank Transfer</p>
              <p className="text-sm text-gray-500">****1234</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                Update Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionTracker;