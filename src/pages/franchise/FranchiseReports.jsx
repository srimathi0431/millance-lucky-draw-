import React, { useState } from 'react';
import '../../styles/franchise.css';

const FranchiseReports = () => {
  const [selectedReport, setSelectedReport] = useState('member-summary');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterMonth, setFilterMonth] = useState('October 2024');
  const [filterGroup, setFilterGroup] = useState('all');

  const reportTypes = [
    { id: 'member-summary', name: 'Member Summary', icon: '👥', description: 'Overview of all members across teams' },
    { id: 'payment-summary', name: 'Payment Summary', icon: '💰', description: 'Payment collection and pending analysis' },
    { id: 'team-comparison', name: 'Team Comparison', icon: '📊', description: 'Compare Team 1 vs Team 2 performance' },
    { id: 'group-performance', name: 'Group Performance', icon: '🎯', description: 'Group-wise member and payment stats' },
    { id: 'monthly-collection', name: 'Monthly Collection', icon: '📅', description: 'Month-wise collection trends' },
    { id: 'winner-report', name: 'Winner Report', icon: '🏆', description: 'All winners and redemption status' },
    { id: 'income-report', name: 'Income Report', icon: '💵', description: 'Franchise commission earnings' },
    { id: 'pending-payments', name: 'Pending Payments', icon: '⏳', description: 'Members with pending payments' },
    { id: 'incomplete-payments', name: 'Incomplete Payments', icon: '⚠️', description: 'Incomplete payment transactions' },
    { id: 'draw-history', name: 'Draw History', icon: '🎲', description: 'Historical draw and prize data' }
  ];

  // Dummy report data
  const reportData = {
    'member-summary': {
      team1: { total: 245, active: 189, inactive: 56, groups: 3 },
      team2: { total: 620, active: 512, inactive: 108, groups: 5 },
      overall: { total: 865, active: 701, inactive: 164, groups: 8 }
    },
    'payment-summary': {
      october: {
        team1: { total: 122500, paid: 94500, pending: 28000, incomplete: 0 },
        team2: { total: 310000, paid: 256000, pending: 54000, incomplete: 0 }
      },
      september: {
        team1: { total: 119000, paid: 119000, pending: 0, incomplete: 0 },
        team2: { total: 302500, paid: 302500, pending: 0, incomplete: 0 }
      }
    },
    'team-comparison': [
      { metric: 'Total Members', team1: 245, team2: 620 },
      { metric: 'Active Members', team1: 189, team2: 512 },
      { metric: 'Capacity Utilization', team1: '49%', team2: '62%' },
      { metric: 'Payment Rate (Oct)', team1: '77%', team2: '83%' },
      { metric: 'Total Collection (Oct)', team1: '₹94,500', team2: '₹2,56,000' },
      { metric: 'Groups', team1: 3, team2: 5 }
    ],
    'group-performance': {
      team1: [
        { group: 'Group A', members: 82, paid: 63, pending: 19, collection: 31500, rate: '77%' },
        { group: 'Group B', members: 78, paid: 60, pending: 18, collection: 30000, rate: '77%' },
        { group: 'Group C', members: 85, paid: 66, pending: 19, collection: 33000, rate: '78%' }
      ],
      team2: [
        { group: 'Group A', members: 125, paid: 104, pending: 21, collection: 52000, rate: '83%' },
        { group: 'Group B', members: 128, paid: 106, pending: 22, collection: 53000, rate: '83%' },
        { group: 'Group C', members: 122, paid: 101, pending: 21, collection: 50500, rate: '83%' },
        { group: 'Group D', members: 118, paid: 98, pending: 20, collection: 49000, rate: '83%' },
        { group: 'Group E', members: 127, paid: 103, pending: 24, collection: 51500, rate: '81%' }
      ]
    },
    'monthly-collection': [
      { month: 'October 2024', team1: 94500, team2: 256000, total: 350500, commission: 35050 },
      { month: 'September 2024', team1: 119000, team2: 302500, total: 421500, commission: 42150 },
      { month: 'August 2024', team1: 112500, team2: 295000, total: 407500, commission: 40750 },
      { month: 'July 2024', team1: 105000, team2: 287500, total: 392500, commission: 39250 },
      { month: 'June 2024', team1: 100000, team2: 280000, total: 380000, commission: 38000 }
    ],
    'winner-report': {
      team1: [
        { month: 'September 2024', winners: 8, redeemed: 6, pending: 1, expired: 1, prizeValue: 4245000 },
        { month: 'August 2024', winners: 7, redeemed: 6, pending: 0, expired: 1, prizeValue: 3245000 },
        { month: 'July 2024', winners: 8, redeemed: 8, pending: 0, expired: 0, prizeValue: 2895000 }
      ],
      team2: [
        { month: 'September 2024', winners: 10, redeemed: 8, pending: 1, expired: 1, prizeValue: 5789000 },
        { month: 'August 2024', winners: 9, redeemed: 8, pending: 1, expired: 0, prizeValue: 4235000 },
        { month: 'July 2024', winners: 10, redeemed: 9, pending: 0, expired: 1, prizeValue: 4895000 }
      ]
    },
    'income-report': [
      { month: 'October 2024', collection: 350500, commission: 35050, status: 'Pending' },
      { month: 'September 2024', collection: 421500, commission: 42150, status: 'Paid' },
      { month: 'August 2024', collection: 407500, commission: 40750, status: 'Paid' },
      { month: 'July 2024', collection: 392500, commission: 39250, status: 'Paid' },
      { month: 'June 2024', collection: 380000, commission: 38000, status: 'Paid' }
    ],
    'pending-payments': {
      team1: [
        { memberId: 'MEM-T1-0003', name: 'Mohammed Irfan', group: 'Group A', month: 'October 2024', amount: 500, days: 3 },
        { memberId: 'MEM-T1-0007', name: 'Vijay Kumar', group: 'Group C', month: 'October 2024', amount: 500, days: 3 },
        { memberId: 'MEM-T1-0015', name: 'Aruna Devi', group: 'Group B', month: 'October 2024', amount: 500, days: 2 }
      ],
      team2: [
        { memberId: 'MEM-T2-0003', name: 'Muthu Kumar', group: 'Group A', month: 'October 2024', amount: 500, days: 3 },
        { memberId: 'MEM-T2-0007', name: 'Prakash Reddy', group: 'Group C', month: 'October 2024', amount: 500, days: 3 },
        { memberId: 'MEM-T2-0013', name: 'Naveen Kumar', group: 'Group E', month: 'October 2024', amount: 500, days: 1 }
      ]
    }
  };

  const renderMemberSummary = () => (
    <div className="report-content">
      <div className="stats-grid-3">
        <div className="franchise-card stat-card team1">
          <h3>Team 1</h3>
          <div className="stat-row">
            <span>Total Members:</span>
            <strong>{reportData['member-summary'].team1.total}</strong>
          </div>
          <div className="stat-row">
            <span>Active:</span>
            <strong>{reportData['member-summary'].team1.active}</strong>
          </div>
          <div className="stat-row">
            <span>Inactive:</span>
            <strong>{reportData['member-summary'].team1.inactive}</strong>
          </div>
          <div className="stat-row">
            <span>Groups:</span>
            <strong>{reportData['member-summary'].team1.groups}</strong>
          </div>
        </div>

        <div className="franchise-card stat-card team2">
          <h3>Team 2</h3>
          <div className="stat-row">
            <span>Total Members:</span>
            <strong>{reportData['member-summary'].team2.total}</strong>
          </div>
          <div className="stat-row">
            <span>Active:</span>
            <strong>{reportData['member-summary'].team2.active}</strong>
          </div>
          <div className="stat-row">
            <span>Inactive:</span>
            <strong>{reportData['member-summary'].team2.inactive}</strong>
          </div>
          <div className="stat-row">
            <span>Groups:</span>
            <strong>{reportData['member-summary'].team2.groups}</strong>
          </div>
        </div>

        <div className="franchise-card stat-card">
          <h3>Overall</h3>
          <div className="stat-row">
            <span>Total Members:</span>
            <strong>{reportData['member-summary'].overall.total}</strong>
          </div>
          <div className="stat-row">
            <span>Active:</span>
            <strong>{reportData['member-summary'].overall.active}</strong>
          </div>
          <div className="stat-row">
            <span>Inactive:</span>
            <strong>{reportData['member-summary'].overall.inactive}</strong>
          </div>
          <div className="stat-row">
            <span>Groups:</span>
            <strong>{reportData['member-summary'].overall.groups}</strong>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSummary = () => (
    <div className="report-content">
      <div className="franchise-card">
        <h3>October 2024</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Total Amount</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Payment Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Team 1</strong></td>
                <td>₹{reportData['payment-summary'].october.team1.total.toLocaleString('en-IN')}</td>
                <td className="success">₹{reportData['payment-summary'].october.team1.paid.toLocaleString('en-IN')}</td>
                <td className="warning">₹{reportData['payment-summary'].october.team1.pending.toLocaleString('en-IN')}</td>
                <td>77%</td>
              </tr>
              <tr>
                <td><strong>Team 2</strong></td>
                <td>₹{reportData['payment-summary'].october.team2.total.toLocaleString('en-IN')}</td>
                <td className="success">₹{reportData['payment-summary'].october.team2.paid.toLocaleString('en-IN')}</td>
                <td className="warning">₹{reportData['payment-summary'].october.team2.pending.toLocaleString('en-IN')}</td>
                <td>83%</td>
              </tr>
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td><strong>₹{(reportData['payment-summary'].october.team1.total + reportData['payment-summary'].october.team2.total).toLocaleString('en-IN')}</strong></td>
                <td className="success"><strong>₹{(reportData['payment-summary'].october.team1.paid + reportData['payment-summary'].october.team2.paid).toLocaleString('en-IN')}</strong></td>
                <td className="warning"><strong>₹{(reportData['payment-summary'].october.team1.pending + reportData['payment-summary'].october.team2.pending).toLocaleString('en-IN')}</strong></td>
                <td><strong>81%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeamComparison = () => (
    <div className="report-content">
      <div className="franchise-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th className="team1-header">Team 1</th>
                <th className="team2-header">Team 2</th>
              </tr>
            </thead>
            <tbody>
              {reportData['team-comparison'].map((row, index) => (
                <tr key={index}>
                  <td><strong>{row.metric}</strong></td>
                  <td>{row.team1}</td>
                  <td>{row.team2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGroupPerformance = () => (
    <div className="report-content">
      <div className="franchise-card">
        <h3>Team 1 - Group Performance</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Members</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Collection</th>
                <th>Payment Rate</th>
              </tr>
            </thead>
            <tbody>
              {reportData['group-performance'].team1.map((group, index) => (
                <tr key={index}>
                  <td><strong>{group.group}</strong></td>
                  <td>{group.members}</td>
                  <td className="success">{group.paid}</td>
                  <td className="warning">{group.pending}</td>
                  <td>₹{group.collection.toLocaleString('en-IN')}</td>
                  <td>{group.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="franchise-card">
        <h3>Team 2 - Group Performance</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Members</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Collection</th>
                <th>Payment Rate</th>
              </tr>
            </thead>
            <tbody>
              {reportData['group-performance'].team2.map((group, index) => (
                <tr key={index}>
                  <td><strong>{group.group}</strong></td>
                  <td>{group.members}</td>
                  <td className="success">{group.paid}</td>
                  <td className="warning">{group.pending}</td>
                  <td>₹{group.collection.toLocaleString('en-IN')}</td>
                  <td>{group.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMonthlyCollection = () => (
    <div className="report-content">
      <div className="franchise-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Team 1</th>
                <th>Team 2</th>
                <th>Total Collection</th>
                <th>Commission (10%)</th>
              </tr>
            </thead>
            <tbody>
              {reportData['monthly-collection'].map((row, index) => (
                <tr key={index}>
                  <td><strong>{row.month}</strong></td>
                  <td>₹{row.team1.toLocaleString('en-IN')}</td>
                  <td>₹{row.team2.toLocaleString('en-IN')}</td>
                  <td className="success">₹{row.total.toLocaleString('en-IN')}</td>
                  <td className="info">₹{row.commission.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWinnerReport = () => (
    <div className="report-content">
      <div className="franchise-card">
        <h3>Team 1 - Winner Summary</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Winners</th>
                <th>Redeemed</th>
                <th>Pending</th>
                <th>Expired</th>
                <th>Prize Value</th>
              </tr>
            </thead>
            <tbody>
              {reportData['winner-report'].team1.map((row, index) => (
                <tr key={index}>
                  <td><strong>{row.month}</strong></td>
                  <td>{row.winners}</td>
                  <td className="success">{row.redeemed}</td>
                  <td className="warning">{row.pending}</td>
                  <td className="danger">{row.expired}</td>
                  <td>₹{row.prizeValue.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="franchise-card">
        <h3>Team 2 - Winner Summary</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Winners</th>
                <th>Redeemed</th>
                <th>Pending</th>
                <th>Expired</th>
                <th>Prize Value</th>
              </tr>
            </thead>
            <tbody>
              {reportData['winner-report'].team2.map((row, index) => (
                <tr key={index}>
                  <td><strong>{row.month}</strong></td>
                  <td>{row.winners}</td>
                  <td className="success">{row.redeemed}</td>
                  <td className="warning">{row.pending}</td>
                  <td className="danger">{row.expired}</td>
                  <td>₹{row.prizeValue.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIncomeReport = () => (
    <div className="report-content">
      <div className="franchise-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Collection</th>
                <th>Commission (10%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData['income-report'].map((row, index) => (
                <tr key={index}>
                  <td><strong>{row.month}</strong></td>
                  <td>₹{row.collection.toLocaleString('en-IN')}</td>
                  <td className="success">₹{row.commission.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`status-badge status-${row.status === 'Paid' ? 'success' : 'warning'}`}>
                      {row.status === 'Paid' ? '✓' : '⏳'} {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPendingPayments = () => (
    <div className="report-content">
      <div className="franchise-card">
        <h3>Team 1 - Pending Payments</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Group</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Pending Days</th>
              </tr>
            </thead>
            <tbody>
              {reportData['pending-payments'].team1.map((row, index) => (
                <tr key={index}>
                  <td>{row.memberId}</td>
                  <td>{row.name}</td>
                  <td>{row.group}</td>
                  <td>{row.month}</td>
                  <td>₹{row.amount}</td>
                  <td className="warning">{row.days} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="franchise-card">
        <h3>Team 2 - Pending Payments</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Group</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Pending Days</th>
              </tr>
            </thead>
            <tbody>
              {reportData['pending-payments'].team2.map((row, index) => (
                <tr key={index}>
                  <td>{row.memberId}</td>
                  <td>{row.name}</td>
                  <td>{row.group}</td>
                  <td>{row.month}</td>
                  <td>₹{row.amount}</td>
                  <td className="warning">{row.days} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'member-summary':
        return renderMemberSummary();
      case 'payment-summary':
        return renderPaymentSummary();
      case 'team-comparison':
        return renderTeamComparison();
      case 'group-performance':
        return renderGroupPerformance();
      case 'monthly-collection':
        return renderMonthlyCollection();
      case 'winner-report':
        return renderWinnerReport();
      case 'income-report':
        return renderIncomeReport();
      case 'pending-payments':
        return renderPendingPayments();
      case 'incomplete-payments':
        return <div className="report-content"><div className="franchise-card no-data">No incomplete payments found</div></div>;
      case 'draw-history':
        return <div className="report-content"><div className="franchise-card no-data">Draw history report coming soon</div></div>;
      default:
        return null;
    }
  };

  return (
    <div className="franchise-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Generate and view comprehensive franchise reports</p>
        </div>
      </div>

      {/* Report Type Grid */}
      <div className="report-type-grid">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className={`franchise-card report-type-card ${selectedReport === report.id ? 'active' : ''}`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="report-icon">{report.icon}</div>
            <div className="report-info">
              <h3>{report.name}</h3>
              <p>{report.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Report Actions */}
      <div className="franchise-card">
        <div className="report-actions">
          <button className="action-btn primary">
            📊 Generate Report
          </button>
          <button className="action-btn">
            📥 Export PDF
          </button>
          <button className="action-btn">
            📄 Export Excel
          </button>
          <button className="action-btn">
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default FranchiseReports;
