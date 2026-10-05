import React, { useState } from 'react';
import '../../styles/franchise.css';

const FranchisePayments = () => {
  const [activeTeam, setActiveTeam] = useState('team1');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Dummy data for Team 1 payments
  const team1Payments = [
    { id: 'PAY-T1-001', memberId: 'MEM-T1-0001', memberName: 'Rajesh Kumar', mobile: '9876543210', group: 'Group A', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-01', mode: 'UPI', reference: 'UPI2024100112345' },
    { id: 'PAY-T1-002', memberId: 'MEM-T1-0002', memberName: 'Priya Sharma', mobile: '9876543211', group: 'Group A', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-02', mode: 'Cash', reference: 'CASH001' },
    { id: 'PAY-T1-003', memberId: 'MEM-T1-0003', memberName: 'Mohammed Irfan', mobile: '9876543212', group: 'Group A', month: 'October 2024', amount: 500, status: 'Pending', paidDate: null, mode: '-', reference: '-' },
    { id: 'PAY-T1-004', memberId: 'MEM-T1-0004', memberName: 'Lakshmi Devi', mobile: '9876543213', group: 'Group B', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-03', mode: 'Bank Transfer', reference: 'TXN2024100398765' },
    { id: 'PAY-T1-005', memberId: 'MEM-T1-0005', memberName: 'Suresh Babu', mobile: '9876543214', group: 'Group B', month: 'October 2024', amount: 500, status: 'Incomplete', paidDate: '2024-10-04', mode: 'UPI', reference: 'UPI2024100445678' },
    { id: 'PAY-T1-006', memberId: 'MEM-T1-0006', memberName: 'Anitha Kumari', mobile: '9876543215', group: 'Group B', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-05', mode: 'UPI', reference: 'UPI2024100567890' },
    { id: 'PAY-T1-007', memberId: 'MEM-T1-0007', memberName: 'Vijay Kumar', mobile: '9876543216', group: 'Group C', month: 'October 2024', amount: 500, status: 'Pending', paidDate: null, mode: '-', reference: '-' },
    { id: 'PAY-T1-008', memberId: 'MEM-T1-0008', memberName: 'Ramesh Chandra', mobile: '9876543217', group: 'Group C', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-01', mode: 'Cash', reference: 'CASH002' },
    { id: 'PAY-T1-009', memberId: 'MEM-T1-0009', memberName: 'Kavitha Rani', mobile: '9876543218', group: 'Group C', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-02', mode: 'UPI', reference: 'UPI2024100278901' },
    { id: 'PAY-T1-010', memberId: 'MEM-T1-0010', memberName: 'Arjun Prasad', mobile: '9876543219', group: 'Group A', month: 'October 2024', amount: 500, status: 'Incomplete', paidDate: '2024-10-03', mode: 'Bank Transfer', reference: 'TXN2024100389012' },
    { id: 'PAY-T1-011', memberId: 'MEM-T1-0001', memberName: 'Rajesh Kumar', mobile: '9876543210', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-01', mode: 'UPI', reference: 'UPI2024090112345' },
    { id: 'PAY-T1-012', memberId: 'MEM-T1-0002', memberName: 'Priya Sharma', mobile: '9876543211', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-02', mode: 'Cash', reference: 'CASH003' },
    { id: 'PAY-T1-013', memberId: 'MEM-T1-0003', memberName: 'Mohammed Irfan', mobile: '9876543212', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-03', mode: 'UPI', reference: 'UPI2024090323456' },
    { id: 'PAY-T1-014', memberId: 'MEM-T1-0004', memberName: 'Lakshmi Devi', mobile: '9876543213', group: 'Group B', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-04', mode: 'Bank Transfer', reference: 'TXN2024090434567' },
    { id: 'PAY-T1-015', memberId: 'MEM-T1-0005', memberName: 'Suresh Babu', mobile: '9876543214', group: 'Group B', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-05', mode: 'UPI', reference: 'UPI2024090545678' },
    { id: 'PAY-T1-016', memberId: 'MEM-T1-0006', memberName: 'Anitha Kumari', mobile: '9876543215', group: 'Group B', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-06', mode: 'Cash', reference: 'CASH004' },
    { id: 'PAY-T1-017', memberId: 'MEM-T1-0007', memberName: 'Vijay Kumar', mobile: '9876543216', group: 'Group C', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-07', mode: 'UPI', reference: 'UPI2024090756789' },
    { id: 'PAY-T1-018', memberId: 'MEM-T1-0008', memberName: 'Ramesh Chandra', mobile: '9876543217', group: 'Group C', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-08', mode: 'Bank Transfer', reference: 'TXN2024090867890' },
    { id: 'PAY-T1-019', memberId: 'MEM-T1-0009', memberName: 'Kavitha Rani', mobile: '9876543218', group: 'Group C', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-09', mode: 'UPI', reference: 'UPI2024090978901' },
    { id: 'PAY-T1-020', memberId: 'MEM-T1-0010', memberName: 'Arjun Prasad', mobile: '9876543219', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-10', mode: 'Cash', reference: 'CASH005' },
    { id: 'PAY-T1-021', memberId: 'MEM-T1-0001', memberName: 'Rajesh Kumar', mobile: '9876543210', group: 'Group A', month: 'August 2024', amount: 500, status: 'Paid', paidDate: '2024-08-01', mode: 'UPI', reference: 'UPI2024080112345' },
    { id: 'PAY-T1-022', memberId: 'MEM-T1-0002', memberName: 'Priya Sharma', mobile: '9876543211', group: 'Group A', month: 'August 2024', amount: 500, status: 'Paid', paidDate: '2024-08-02', mode: 'Bank Transfer', reference: 'TXN2024080223456' },
    { id: 'PAY-T1-023', memberId: 'MEM-T1-0003', memberName: 'Mohammed Irfan', mobile: '9876543212', group: 'Group A', month: 'August 2024', amount: 500, status: 'Paid', paidDate: '2024-08-03', mode: 'UPI', reference: 'UPI2024080334567' },
    { id: 'PAY-T1-024', memberId: 'MEM-T1-0004', memberName: 'Lakshmi Devi', mobile: '9876543213', group: 'Group B', month: 'August 2024', amount: 500, status: 'Paid', paidDate: '2024-08-04', mode: 'Cash', reference: 'CASH006' },
    { id: 'PAY-T1-025', memberId: 'MEM-T1-0005', memberName: 'Suresh Babu', mobile: '9876543214', group: 'Group B', month: 'August 2024', amount: 500, status: 'Paid', paidDate: '2024-08-05', mode: 'UPI', reference: 'UPI2024080545678' }
  ];

  // Dummy data for Team 2 payments
  const team2Payments = [
    { id: 'PAY-T2-001', memberId: 'MEM-T2-0001', memberName: 'Karthik Raja', mobile: '9876543220', group: 'Group A', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-01', mode: 'UPI', reference: 'UPI2024100187654' },
    { id: 'PAY-T2-002', memberId: 'MEM-T2-0002', memberName: 'Divya Lakshmi', mobile: '9876543221', group: 'Group A', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-02', mode: 'Cash', reference: 'CASH007' },
    { id: 'PAY-T2-003', memberId: 'MEM-T2-0003', memberName: 'Muthu Kumar', mobile: '9876543222', group: 'Group A', month: 'October 2024', amount: 500, status: 'Pending', paidDate: null, mode: '-', reference: '-' },
    { id: 'PAY-T2-004', memberId: 'MEM-T2-0004', memberName: 'Meena Devi', mobile: '9876543223', group: 'Group B', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-03', mode: 'Bank Transfer', reference: 'TXN2024100376543' },
    { id: 'PAY-T2-005', memberId: 'MEM-T2-0005', memberName: 'Senthil Kumar', mobile: '9876543224', group: 'Group B', month: 'October 2024', amount: 500, status: 'Incomplete', paidDate: '2024-10-04', mode: 'UPI', reference: 'UPI2024100465432' },
    { id: 'PAY-T2-006', memberId: 'MEM-T2-0006', memberName: 'Geetha Lakshmi', mobile: '9876543225', group: 'Group B', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-05', mode: 'UPI', reference: 'UPI2024100554321' },
    { id: 'PAY-T2-007', memberId: 'MEM-T2-0007', memberName: 'Prakash Reddy', mobile: '9876543226', group: 'Group C', month: 'October 2024', amount: 500, status: 'Pending', paidDate: null, mode: '-', reference: '-' },
    { id: 'PAY-T2-008', memberId: 'MEM-T2-0008', memberName: 'Deepa Shree', mobile: '9876543227', group: 'Group C', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-01', mode: 'Cash', reference: 'CASH008' },
    { id: 'PAY-T2-009', memberId: 'MEM-T2-0009', memberName: 'Vignesh Kumar', mobile: '9876543228', group: 'Group C', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-02', mode: 'UPI', reference: 'UPI2024100243210' },
    { id: 'PAY-T2-010', memberId: 'MEM-T2-0010', memberName: 'Sangeetha Devi', mobile: '9876543229', group: 'Group D', month: 'October 2024', amount: 500, status: 'Incomplete', paidDate: '2024-10-03', mode: 'Bank Transfer', reference: 'TXN2024100332109' },
    { id: 'PAY-T2-011', memberId: 'MEM-T2-0011', memberName: 'Balaji Raman', mobile: '9876543230', group: 'Group D', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-04', mode: 'UPI', reference: 'UPI2024100421098' },
    { id: 'PAY-T2-012', memberId: 'MEM-T2-0012', memberName: 'Sharmila Bai', mobile: '9876543231', group: 'Group D', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-05', mode: 'Cash', reference: 'CASH009' },
    { id: 'PAY-T2-013', memberId: 'MEM-T2-0013', memberName: 'Naveen Kumar', mobile: '9876543232', group: 'Group E', month: 'October 2024', amount: 500, status: 'Pending', paidDate: null, mode: '-', reference: '-' },
    { id: 'PAY-T2-014', memberId: 'MEM-T2-0014', memberName: 'Pooja Rani', mobile: '9876543233', group: 'Group E', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-06', mode: 'UPI', reference: 'UPI2024100610987' },
    { id: 'PAY-T2-015', memberId: 'MEM-T2-0015', memberName: 'Saravanan Raj', mobile: '9876543234', group: 'Group E', month: 'October 2024', amount: 500, status: 'Paid', paidDate: '2024-10-07', mode: 'Bank Transfer', reference: 'TXN2024100709876' },
    { id: 'PAY-T2-016', memberId: 'MEM-T2-0001', memberName: 'Karthik Raja', mobile: '9876543220', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-01', mode: 'UPI', reference: 'UPI2024090198765' },
    { id: 'PAY-T2-017', memberId: 'MEM-T2-0002', memberName: 'Divya Lakshmi', mobile: '9876543221', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-02', mode: 'Cash', reference: 'CASH010' },
    { id: 'PAY-T2-018', memberId: 'MEM-T2-0003', memberName: 'Muthu Kumar', mobile: '9876543222', group: 'Group A', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-03', mode: 'UPI', reference: 'UPI2024090387654' },
    { id: 'PAY-T2-019', memberId: 'MEM-T2-0004', memberName: 'Meena Devi', mobile: '9876543223', group: 'Group B', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-04', mode: 'Bank Transfer', reference: 'TXN2024090476543' },
    { id: 'PAY-T2-020', memberId: 'MEM-T2-0005', memberName: 'Senthil Kumar', mobile: '9876543224', group: 'Group B', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-05', mode: 'UPI', reference: 'UPI2024090565432' },
    { id: 'PAY-T2-021', memberId: 'MEM-T2-0006', memberName: 'Geetha Lakshmi', mobile: '9876543225', group: 'Group B', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-06', mode: 'Cash', reference: 'CASH011' },
    { id: 'PAY-T2-022', memberId: 'MEM-T2-0007', memberName: 'Prakash Reddy', mobile: '9876543226', group: 'Group C', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-07', mode: 'UPI', reference: 'UPI2024090754321' },
    { id: 'PAY-T2-023', memberId: 'MEM-T2-0008', memberName: 'Deepa Shree', mobile: '9876543227', group: 'Group C', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-08', mode: 'Bank Transfer', reference: 'TXN2024090843210' },
    { id: 'PAY-T2-024', memberId: 'MEM-T2-0009', memberName: 'Vignesh Kumar', mobile: '9876543228', group: 'Group C', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-09', mode: 'UPI', reference: 'UPI2024090932109' },
    { id: 'PAY-T2-025', memberId: 'MEM-T2-0010', memberName: 'Sangeetha Devi', mobile: '9876543229', group: 'Group D', month: 'September 2024', amount: 500, status: 'Paid', paidDate: '2024-09-10', mode: 'Cash', reference: 'CASH012' }
  ];

  const payments = activeTeam === 'team1' ? team1Payments : team2Payments;

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchMonth = filterMonth === 'all' || payment.month === filterMonth;
    const matchStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchMonth && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  // Get unique months
  const months = [...new Set(payments.map(p => p.month))];

  // Stats
  const stats = {
    total: filteredPayments.length,
    paid: filteredPayments.filter(p => p.status === 'Paid').length,
    pending: filteredPayments.filter(p => p.status === 'Pending').length,
    incomplete: filteredPayments.filter(p => p.status === 'Incomplete').length,
    totalAmount: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
    paidAmount: filteredPayments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: filteredPayments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0)
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Paid': { class: 'success', icon: '✓' },
      'Pending': { class: 'warning', icon: '⏳' },
      'Incomplete': { class: 'danger', icon: '⚠' }
    };
    const config = statusMap[status] || { class: 'default', icon: '•' };
    return (
      <span className={`status-badge status-${config.class}`}>
        {config.icon} {status}
      </span>
    );
  };

  return (
    <div className="franchise-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Track all member payment transactions</p>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="team-tabs">
        <button
          className={`team-tab ${activeTeam === 'team1' ? 'active team1' : ''}`}
          onClick={() => {
            setActiveTeam('team1');
            setCurrentPage(1);
          }}
        >
          <span className="tab-icon">🎯</span>
          <div>
            <div className="tab-title">Team 1</div>
            <div className="tab-subtitle">500 Capacity</div>
          </div>
        </button>
        <button
          className={`team-tab ${activeTeam === 'team2' ? 'active team2' : ''}`}
          onClick={() => {
            setActiveTeam('team2');
            setCurrentPage(1);
          }}
        >
          <span className="tab-icon">🎪</span>
          <div>
            <div className="tab-title">Team 2</div>
            <div className="tab-subtitle">1000 Capacity</div>
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-4">
        <div className="franchise-card stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Total Amount</div>
            <div className="stat-value">₹{stats.totalAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div className="franchise-card stat-card success">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-label">Paid ({stats.paid})</div>
            <div className="stat-value">₹{stats.paidAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div className="franchise-card stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pending ({stats.pending})</div>
            <div className="stat-value">₹{stats.pendingAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div className="franchise-card stat-card danger">
          <div className="stat-icon">⚠</div>
          <div className="stat-content">
            <div className="stat-label">Incomplete</div>
            <div className="stat-value">{stats.incomplete}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="franchise-card">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Month</label>
            <select 
              className="filter-select"
              value={filterMonth}
              onChange={(e) => {
                setFilterMonth(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Months</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="franchise-card">
        <div className="card-header">
          <h2>Payment Transactions</h2>
          <span className="result-count">{filteredPayments.length} transactions found</span>
        </div>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Member Details</th>
                <th>Group</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Paid Date</th>
                <th>Payment Mode</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.length > 0 ? (
                currentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <span className="id-badge">{payment.id}</span>
                    </td>
                    <td>
                      <div className="member-info">
                        <div className="member-name">{payment.memberName}</div>
                        <div className="member-id">{payment.memberId}</div>
                        <div className="member-mobile">{payment.mobile}</div>
                      </div>
                    </td>
                    <td>{payment.group}</td>
                    <td>{payment.month}</td>
                    <td className="amount">₹{payment.amount.toLocaleString('en-IN')}</td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>
                      {payment.paidDate 
                        ? new Date(payment.paidDate).toLocaleDateString('en-IN')
                        : '-'
                      }
                    </td>
                    <td>{payment.mode}</td>
                    <td className="reference">{payment.reference}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    No payment transactions found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FranchisePayments;
