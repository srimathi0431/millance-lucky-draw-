import React, { useState } from 'react';
import '../../styles/franchise.css';

const FranchiseWinners = () => {
  const [activeTeam, setActiveTeam] = useState('team1');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data for Team 1 winners
  const team1Winners = [
    {
      id: 'WIN-T1-001',
      drawMonth: 'September 2024',
      memberId: 'MEM-T1-0012',
      memberName: 'Rajesh Kumar',
      mobile: '9876543210',
      group: 'Group A',
      rank: 1,
      prize: 'Bajaj Pulsar NS200',
      prizeValue: '₹1,45,000',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-10-05',
      deliveryMode: 'Showroom Pickup'
    },
    {
      id: 'WIN-T1-002',
      drawMonth: 'September 2024',
      memberId: 'MEM-T1-0045',
      memberName: 'Priya Sharma',
      mobile: '9876543211',
      group: 'Group B',
      rank: 2,
      prize: 'MacBook Air M2',
      prizeValue: '₹1,19,900',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-10-08',
      deliveryMode: 'Store Pickup'
    },
    {
      id: 'WIN-T1-003',
      drawMonth: 'September 2024',
      memberId: 'MEM-T1-0089',
      memberName: 'Mohammed Irfan',
      mobile: '9876543212',
      group: 'Group A',
      rank: 2,
      prize: 'MacBook Air M2',
      prizeValue: '₹1,19,900',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Pending',
      redemptionDate: null,
      deliveryMode: 'Not Selected'
    },
    {
      id: 'WIN-T1-004',
      drawMonth: 'September 2024',
      memberId: 'MEM-T1-0134',
      memberName: 'Lakshmi Devi',
      mobile: '9876543213',
      group: 'Group C',
      rank: 3,
      prize: 'LG 50" Smart TV',
      prizeValue: '₹54,990',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'In Process',
      redemptionDate: null,
      deliveryMode: 'Home Delivery'
    },
    {
      id: 'WIN-T1-005',
      drawMonth: 'August 2024',
      memberId: 'MEM-T1-0067',
      memberName: 'Suresh Babu',
      mobile: '9876543214',
      group: 'Group A',
      rank: 1,
      prize: 'Honda Activa 6G',
      prizeValue: '₹85,000',
      drawDate: '2024-08-31',
      announcedDate: '2024-08-31',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-09-03',
      deliveryMode: 'Showroom Pickup'
    },
    {
      id: 'WIN-T1-006',
      drawMonth: 'August 2024',
      memberId: 'MEM-T1-0178',
      memberName: 'Anitha Kumari',
      mobile: '9876543215',
      group: 'Group B',
      rank: 2,
      prize: 'iPad Pro 11"',
      prizeValue: '₹89,900',
      drawDate: '2024-08-31',
      announcedDate: '2024-08-31',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-09-05',
      deliveryMode: 'Store Pickup'
    },
    {
      id: 'WIN-T1-007',
      drawMonth: 'August 2024',
      memberId: 'MEM-T1-0201',
      memberName: 'Vijay Kumar',
      mobile: '9876543216',
      group: 'Group C',
      rank: 3,
      prize: 'Sony Home Theatre',
      prizeValue: '₹45,990',
      drawDate: '2024-08-31',
      announcedDate: '2024-08-31',
      redemptionStatus: 'Expired',
      redemptionDate: null,
      deliveryMode: 'Not Claimed'
    },
    {
      id: 'WIN-T1-008',
      drawMonth: 'July 2024',
      memberId: 'MEM-T1-0023',
      memberName: 'Ramesh Chandra',
      mobile: '9876543217',
      group: 'Group A',
      rank: 1,
      prize: 'TVS Apache RTR 160',
      prizeValue: '₹1,25,000',
      drawDate: '2024-07-31',
      announcedDate: '2024-07-31',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-08-02',
      deliveryMode: 'Showroom Pickup'
    }
  ];

  // Dummy data for Team 2 winners
  const team2Winners = [
    {
      id: 'WIN-T2-001',
      drawMonth: 'September 2024',
      memberId: 'MEM-T2-0034',
      memberName: 'Karthik Raja',
      mobile: '9876543220',
      group: 'Group A',
      rank: 1,
      prize: 'Yamaha FZS-FI V3',
      prizeValue: '₹1,25,000',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-10-04',
      deliveryMode: 'Showroom Pickup'
    },
    {
      id: 'WIN-T2-002',
      drawMonth: 'September 2024',
      memberId: 'MEM-T2-0156',
      memberName: 'Divya Lakshmi',
      mobile: '9876543221',
      group: 'Group B',
      rank: 2,
      prize: 'Samsung S23 Ultra',
      prizeValue: '₹1,24,999',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-10-06',
      deliveryMode: 'Store Pickup'
    },
    {
      id: 'WIN-T2-003',
      drawMonth: 'September 2024',
      memberId: 'MEM-T2-0289',
      memberName: 'Arjun Prasad',
      mobile: '9876543222',
      group: 'Group C',
      rank: 2,
      prize: 'Samsung S23 Ultra',
      prizeValue: '₹1,24,999',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'In Process',
      redemptionDate: null,
      deliveryMode: 'Home Delivery'
    },
    {
      id: 'WIN-T2-004',
      drawMonth: 'September 2024',
      memberId: 'MEM-T2-0412',
      memberName: 'Meena Devi',
      mobile: '9876543223',
      group: 'Group D',
      rank: 3,
      prize: 'Sony 55" Bravia TV',
      prizeValue: '₹94,990',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Pending',
      redemptionDate: null,
      deliveryMode: 'Not Selected'
    },
    {
      id: 'WIN-T2-005',
      drawMonth: 'September 2024',
      memberId: 'MEM-T2-0567',
      memberName: 'Senthil Kumar',
      mobile: '9876543224',
      group: 'Group E',
      rank: 3,
      prize: 'Sony 55" Bravia TV',
      prizeValue: '₹94,990',
      drawDate: '2024-09-30',
      announcedDate: '2024-09-30',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-10-10',
      deliveryMode: 'Home Delivery'
    },
    {
      id: 'WIN-T2-006',
      drawMonth: 'August 2024',
      memberId: 'MEM-T2-0089',
      memberName: 'Kavitha Rani',
      mobile: '9876543225',
      group: 'Group A',
      rank: 1,
      prize: 'Suzuki Gixxer SF',
      prizeValue: '₹1,45,000',
      drawDate: '2024-08-31',
      announcedDate: '2024-08-31',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-09-02',
      deliveryMode: 'Showroom Pickup'
    },
    {
      id: 'WIN-T2-007',
      drawMonth: 'August 2024',
      memberId: 'MEM-T2-0234',
      memberName: 'Muthu Kumar',
      mobile: '9876543226',
      group: 'Group B',
      rank: 2,
      prize: 'OnePlus 11 5G',
      prizeValue: '₹56,999',
      drawDate: '2024-08-31',
      announcedDate: '2024-08-31',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-09-04',
      deliveryMode: 'Store Pickup'
    },
    {
      id: 'WIN-T2-008',
      drawMonth: 'August 2024',
      memberId: 'MEM-T2-0478',
      memberName: 'Geetha Lakshmi',
      mobile: '9876543227',
      group: 'Group C',
      rank: 3,
      prize: 'LG Refrigerator',
      prizeValue: '₹48,990',
      drawDate: '2024-08-31',
      announcedDate: '2024-08-31',
      redemptionStatus: 'In Process',
      redemptionDate: null,
      deliveryMode: 'Home Delivery'
    },
    {
      id: 'WIN-T2-009',
      drawMonth: 'July 2024',
      memberId: 'MEM-T2-0145',
      memberName: 'Prakash Reddy',
      mobile: '9876543228',
      group: 'Group A',
      rank: 1,
      prize: 'KTM Duke 125',
      prizeValue: '₹1,89,000',
      drawDate: '2024-07-31',
      announcedDate: '2024-07-31',
      redemptionStatus: 'Redeemed',
      redemptionDate: '2024-08-03',
      deliveryMode: 'Showroom Pickup'
    },
    {
      id: 'WIN-T2-010',
      drawMonth: 'July 2024',
      memberId: 'MEM-T2-0312',
      memberName: 'Deepa Shree',
      mobile: '9876543229',
      group: 'Group B',
      rank: 2,
      prize: 'iPad Air',
      prizeValue: '₹59,900',
      drawDate: '2024-07-31',
      announcedDate: '2024-07-31',
      redemptionStatus: 'Expired',
      redemptionDate: null,
      deliveryMode: 'Not Claimed'
    }
  ];

  const winners = activeTeam === 'team1' ? team1Winners : team2Winners;

  // Filter winners
  const filteredWinners = winners.filter(winner => {
    const matchMonth = filterMonth === 'all' || winner.drawMonth === filterMonth;
    const matchStatus = filterStatus === 'all' || winner.redemptionStatus === filterStatus;
    return matchMonth && matchStatus;
  });

  // Get unique months
  const months = [...new Set(winners.map(w => w.drawMonth))];

  // Stats
  const stats = {
    total: filteredWinners.length,
    redeemed: filteredWinners.filter(w => w.redemptionStatus === 'Redeemed').length,
    pending: filteredWinners.filter(w => w.redemptionStatus === 'Pending').length,
    inProcess: filteredWinners.filter(w => w.redemptionStatus === 'In Process').length,
    expired: filteredWinners.filter(w => w.redemptionStatus === 'Expired').length
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Redeemed': { class: 'success', icon: '✓' },
      'Pending': { class: 'warning', icon: '⏳' },
      'In Process': { class: 'info', icon: '🔄' },
      'Expired': { class: 'danger', icon: '✗' }
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
          <h1 className="page-title">Winners</h1>
          <p className="page-subtitle">View all lucky draw winners and redemption status</p>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="team-tabs">
        <button
          className={`team-tab ${activeTeam === 'team1' ? 'active team1' : ''}`}
          onClick={() => setActiveTeam('team1')}
        >
          <span className="tab-icon">🎯</span>
          <div>
            <div className="tab-title">Team 1</div>
            <div className="tab-subtitle">500 Capacity</div>
          </div>
        </button>
        <button
          className={`team-tab ${activeTeam === 'team2' ? 'active team2' : ''}`}
          onClick={() => setActiveTeam('team2')}
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
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-label">Total Winners</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>
        <div className="franchise-card stat-card success">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-label">Redeemed</div>
            <div className="stat-value">{stats.redeemed}</div>
          </div>
        </div>
        <div className="franchise-card stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{stats.pending}</div>
          </div>
        </div>
        <div className="franchise-card stat-card info">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-label">In Process</div>
            <div className="stat-value">{stats.inProcess}</div>
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
              onChange={(e) => setFilterMonth(e.target.value)}
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
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Redeemed">Redeemed</option>
              <option value="Pending">Pending</option>
              <option value="In Process">In Process</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Winners Table */}
      <div className="franchise-card">
        <div className="card-header">
          <h2>Winners List</h2>
          <span className="result-count">{filteredWinners.length} winners found</span>
        </div>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Winner ID</th>
                <th>Member Details</th>
                <th>Group</th>
                <th>Draw Month</th>
                <th>Rank</th>
                <th>Prize</th>
                <th>Prize Value</th>
                <th>Announced Date</th>
                <th>Redemption Status</th>
                <th>Redeemed Date</th>
                <th>Delivery Mode</th>
              </tr>
            </thead>
            <tbody>
              {filteredWinners.length > 0 ? (
                filteredWinners.map((winner) => (
                  <tr key={winner.id}>
                    <td>
                      <span className="id-badge">{winner.id}</span>
                    </td>
                    <td>
                      <div className="member-info">
                        <div className="member-name">{winner.memberName}</div>
                        <div className="member-id">{winner.memberId}</div>
                        <div className="member-mobile">{winner.mobile}</div>
                      </div>
                    </td>
                    <td>{winner.group}</td>
                    <td>{winner.drawMonth}</td>
                    <td>
                      <span className="rank-badge">#{winner.rank}</span>
                    </td>
                    <td className="prize-name">{winner.prize}</td>
                    <td className="prize-value">{winner.prizeValue}</td>
                    <td>{new Date(winner.announcedDate).toLocaleDateString('en-IN')}</td>
                    <td>{getStatusBadge(winner.redemptionStatus)}</td>
                    <td>
                      {winner.redemptionDate 
                        ? new Date(winner.redemptionDate).toLocaleDateString('en-IN')
                        : '-'
                      }
                    </td>
                    <td>{winner.deliveryMode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="no-data">
                    No winners found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FranchiseWinners;
