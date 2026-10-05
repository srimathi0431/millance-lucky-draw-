import React, { useState } from 'react';
import '../../styles/franchise.css';

const FranchiseDraws = () => {
  const [activeTeam, setActiveTeam] = useState('team1');
  const [viewType, setViewType] = useState('current'); // current, previous, upcoming

  // Dummy data for Team 1 draws
  const team1Draws = {
    current: {
      drawId: 'DRW-T1-2024-10',
      month: 'October 2024',
      team: 'Team 1',
      capacity: 500,
      totalMembers: 245,
      drawDate: '2024-10-31',
      status: 'In Progress',
      prizes: [
        { rank: 1, prize: 'Royal Enfield Meteor 350', value: '₹2,15,000', quantity: 1 },
        { rank: 2, prize: 'iPhone 15 Pro Max', value: '₹1,59,900', quantity: 2 },
        { rank: 3, prize: 'Samsung 55" QLED TV', value: '₹89,990', quantity: 3 },
        { rank: 4, prize: 'Gold Coin (10g)', value: '₹65,000', quantity: 5 },
        { rank: 5, prize: 'Noise Smart Watch', value: '₹15,999', quantity: 10 }
      ],
      paidMembers: 189,
      eligibleMembers: 189,
      completionRate: 77
    },
    previous: [
      {
        drawId: 'DRW-T1-2024-09',
        month: 'September 2024',
        team: 'Team 1',
        totalMembers: 238,
        drawDate: '2024-09-30',
        status: 'Completed',
        winners: 21,
        prizes: [
          { rank: 1, prize: 'Bajaj Pulsar NS200', value: '₹1,45,000' },
          { rank: 2, prize: 'MacBook Air M2', value: '₹1,19,900' },
          { rank: 3, prize: 'LG 50" Smart TV', value: '₹54,990' }
        ]
      },
      {
        drawId: 'DRW-T1-2024-08',
        month: 'August 2024',
        team: 'Team 1',
        totalMembers: 225,
        drawDate: '2024-08-31',
        status: 'Completed',
        winners: 18,
        prizes: [
          { rank: 1, prize: 'Honda Activa 6G', value: '₹85,000' },
          { rank: 2, prize: 'iPad Pro 11"', value: '₹89,900' },
          { rank: 3, prize: 'Sony Home Theatre', value: '₹45,990' }
        ]
      },
      {
        drawId: 'DRW-T1-2024-07',
        month: 'July 2024',
        team: 'Team 1',
        totalMembers: 210,
        drawDate: '2024-07-31',
        status: 'Completed',
        winners: 20,
        prizes: [
          { rank: 1, prize: 'TVS Apache RTR 160', value: '₹1,25,000' },
          { rank: 2, prize: 'Samsung Galaxy S23', value: '₹74,999' },
          { rank: 3, prize: 'Bose Soundbar', value: '₹38,990' }
        ]
      }
    ],
    upcoming: {
      drawId: 'DRW-T1-2024-11',
      month: 'November 2024',
      team: 'Team 1',
      capacity: 500,
      drawDate: '2024-11-30',
      status: 'Upcoming',
      prizes: [
        { rank: 1, prize: 'Hero Splendor Plus', value: '₹75,000', quantity: 1 },
        { rank: 2, prize: 'Samsung Galaxy Tab S9', value: '₹69,999', quantity: 2 },
        { rank: 3, prize: 'LG Washing Machine', value: '₹35,990', quantity: 3 },
        { rank: 4, prize: 'Silver Coin (50g)', value: '₹40,000', quantity: 5 },
        { rank: 5, prize: 'JBL Bluetooth Speaker', value: '₹8,999', quantity: 10 }
      ],
      message: 'Prize allocation pending admin confirmation'
    }
  };

  // Dummy data for Team 2 draws
  const team2Draws = {
    current: {
      drawId: 'DRW-T2-2024-10',
      month: 'October 2024',
      team: 'Team 2',
      capacity: 1000,
      totalMembers: 620,
      drawDate: '2024-10-31',
      status: 'In Progress',
      prizes: [
        { rank: 1, prize: 'Honda CB350', value: '₹2,10,000', quantity: 1 },
        { rank: 2, prize: 'iPhone 15 Pro', value: '₹1,34,900', quantity: 3 },
        { rank: 3, prize: 'LG 65" OLED TV', value: '₹1,49,990', quantity: 2 },
        { rank: 4, prize: 'Gold Coin (5g)', value: '₹32,500', quantity: 8 },
        { rank: 5, prize: 'boAt Airdopes', value: '₹2,999', quantity: 15 }
      ],
      paidMembers: 512,
      eligibleMembers: 512,
      completionRate: 83
    },
    previous: [
      {
        drawId: 'DRW-T2-2024-09',
        month: 'September 2024',
        team: 'Team 2',
        totalMembers: 605,
        drawDate: '2024-09-30',
        status: 'Completed',
        winners: 29,
        prizes: [
          { rank: 1, prize: 'Yamaha FZS-FI V3', value: '₹1,25,000' },
          { rank: 2, prize: 'Samsung S23 Ultra', value: '₹1,24,999' },
          { rank: 3, prize: 'Sony 55" Bravia TV', value: '₹94,990' }
        ]
      },
      {
        drawId: 'DRW-T2-2024-08',
        month: 'August 2024',
        team: 'Team 2',
        totalMembers: 590,
        drawDate: '2024-08-31',
        status: 'Completed',
        winners: 31,
        prizes: [
          { rank: 1, prize: 'Suzuki Gixxer SF', value: '₹1,45,000' },
          { rank: 2, prize: 'OnePlus 11 5G', value: '₹56,999' },
          { rank: 3, prize: 'LG Refrigerator', value: '₹48,990' }
        ]
      },
      {
        drawId: 'DRW-T2-2024-07',
        month: 'July 2024',
        team: 'Team 2',
        totalMembers: 575,
        drawDate: '2024-07-31',
        status: 'Completed',
        winners: 28,
        prizes: [
          { rank: 1, prize: 'KTM Duke 125', value: '₹1,89,000' },
          { rank: 2, prize: 'iPad Air', value: '₹59,900' },
          { rank: 3, prize: 'Samsung AC 1.5 Ton', value: '₹42,990' }
        ]
      }
    ],
    upcoming: {
      drawId: 'DRW-T2-2024-11',
      month: 'November 2024',
      team: 'Team 2',
      capacity: 1000,
      drawDate: '2024-11-30',
      status: 'Upcoming',
      prizes: [
        { rank: 1, prize: 'TVS Raider 125', value: '₹95,000', quantity: 1 },
        { rank: 2, prize: 'Nothing Phone 2', value: '₹44,999', quantity: 3 },
        { rank: 3, prize: 'Mi Air Purifier', value: '₹18,999', quantity: 5 },
        { rank: 4, prize: 'Gold Coin (2g)', value: '₹13,000', quantity: 10 },
        { rank: 5, prize: 'Fire-Boltt Smart Watch', value: '₹4,999', quantity: 20 }
      ],
      message: 'Prize allocation pending admin confirmation'
    }
  };

  const currentDraws = activeTeam === 'team1' ? team1Draws : team2Draws;

  return (
    <div className="franchise-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Lucky Draws</h1>
          <p className="page-subtitle">View current, previous and upcoming draw information</p>
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

      {/* View Type Selector */}
      <div className="view-selector">
        <button
          className={`view-btn ${viewType === 'current' ? 'active' : ''}`}
          onClick={() => setViewType('current')}
        >
          📅 Current Draw
        </button>
        <button
          className={`view-btn ${viewType === 'previous' ? 'active' : ''}`}
          onClick={() => setViewType('previous')}
        >
          📜 Previous Draws
        </button>
        <button
          className={`view-btn ${viewType === 'upcoming' ? 'active' : ''}`}
          onClick={() => setViewType('upcoming')}
        >
          🔮 Upcoming Draw
        </button>
      </div>

      {/* Current Draw */}
      {viewType === 'current' && (
        <div className="draws-section">
          <div className="franchise-card">
            <div className="card-header">
              <h2>{currentDraws.current.month} - {currentDraws.current.team}</h2>
              <span className={`status-badge status-${currentDraws.current.status.toLowerCase().replace(' ', '-')}`}>
                {currentDraws.current.status}
              </span>
            </div>

            <div className="draw-info-grid">
              <div className="info-item">
                <span className="info-label">Draw ID</span>
                <span className="info-value">{currentDraws.current.drawId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Draw Date</span>
                <span className="info-value">{new Date(currentDraws.current.drawDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Members</span>
                <span className="info-value">{currentDraws.current.totalMembers} / {currentDraws.current.capacity}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Eligible Members</span>
                <span className="info-value">{currentDraws.current.eligibleMembers}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="progress-section">
              <div className="progress-header">
                <span>Payment Completion</span>
                <span className="progress-percent">{currentDraws.current.completionRate}%</span>
              </div>
              <div className="franchise-progress">
                <div 
                  className={`franchise-progress-fill ${activeTeam}`}
                  style={{ width: `${currentDraws.current.completionRate}%` }}
                ></div>
              </div>
              <div className="progress-details">
                <span>{currentDraws.current.paidMembers} Paid</span>
                <span>{currentDraws.current.totalMembers - currentDraws.current.paidMembers} Pending</span>
              </div>
            </div>

            {/* Prizes Table */}
            <div className="prizes-section">
              <h3 className="section-title">Prize Distribution</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Prize</th>
                      <th>Value</th>
                      <th>Quantity</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDraws.current.prizes.map((prize, index) => (
                      <tr key={index}>
                        <td>
                          <span className="rank-badge">#{prize.rank}</span>
                        </td>
                        <td className="prize-name">{prize.prize}</td>
                        <td className="prize-value">{prize.value}</td>
                        <td>{prize.quantity}</td>
                        <td className="prize-total">
                          ₹{(parseInt(prize.value.replace(/[₹,]/g, '')) * prize.quantity).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="draw-notice">
              <span className="notice-icon">ℹ️</span>
              <span>Only paid members are eligible for the lucky draw. Draw will be conducted on {new Date(currentDraws.current.drawDate).toLocaleDateString('en-IN')}.</span>
            </div>
          </div>
        </div>
      )}

      {/* Previous Draws */}
      {viewType === 'previous' && (
        <div className="draws-section">
          {currentDraws.previous.map((draw, index) => (
            <div key={index} className="franchise-card">
              <div className="card-header">
                <div>
                  <h3>{draw.month} - {draw.team}</h3>
                  <p className="draw-id">{draw.drawId}</p>
                </div>
                <span className={`status-badge status-${draw.status.toLowerCase()}`}>
                  {draw.status}
                </span>
              </div>

              <div className="draw-info-grid">
                <div className="info-item">
                  <span className="info-label">Draw Date</span>
                  <span className="info-value">{new Date(draw.drawDate).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Members</span>
                  <span className="info-value">{draw.totalMembers}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Winners</span>
                  <span className="info-value">{draw.winners}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value success">✓ Completed</span>
                </div>
              </div>

              <div className="prizes-compact">
                <h4>Prizes Distributed</h4>
                {draw.prizes.map((prize, pIndex) => (
                  <div key={pIndex} className="prize-compact-item">
                    <span className="rank-badge">#{prize.rank}</span>
                    <span className="prize-name">{prize.prize}</span>
                    <span className="prize-value">{prize.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Draw */}
      {viewType === 'upcoming' && (
        <div className="draws-section">
          <div className="franchise-card">
            <div className="card-header">
              <h2>{currentDraws.upcoming.month} - {currentDraws.upcoming.team}</h2>
              <span className={`status-badge status-${currentDraws.upcoming.status.toLowerCase()}`}>
                {currentDraws.upcoming.status}
              </span>
            </div>

            <div className="draw-info-grid">
              <div className="info-item">
                <span className="info-label">Draw ID</span>
                <span className="info-value">{currentDraws.upcoming.drawId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Draw Date</span>
                <span className="info-value">{new Date(currentDraws.upcoming.drawDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Team Capacity</span>
                <span className="info-value">{currentDraws.upcoming.capacity}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value pending">⏳ Pending</span>
              </div>
            </div>

            {/* Tentative Prizes */}
            <div className="prizes-section">
              <h3 className="section-title">Tentative Prize Distribution</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Prize</th>
                      <th>Value</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDraws.upcoming.prizes.map((prize, index) => (
                      <tr key={index}>
                        <td>
                          <span className="rank-badge">#{prize.rank}</span>
                        </td>
                        <td className="prize-name">{prize.prize}</td>
                        <td className="prize-value">{prize.value}</td>
                        <td>{prize.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="draw-notice warning">
              <span className="notice-icon">⚠️</span>
              <span>{currentDraws.upcoming.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FranchiseDraws;
