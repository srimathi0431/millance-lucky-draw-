import React, { useState } from 'react';
import '../../styles/franchise.css';

const FranchiseProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    franchiseId: 'FRAN-001',
    franchiseName: 'ABC Franchise Salem',
    franchiseHead: 'Ramesh Kumar',
    email: 'ramesh.kumar@abcfranchise.com',
    mobile: '+91 9876543210',
    alternativeMobile: '+91 9876543211',
    address: '125, Main Street, Opp. City Mall',
    city: 'Salem',
    state: 'Tamil Nadu',
    pincode: '636001',
    gstNumber: '33ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    accountHolderName: 'Ramesh Kumar',
    joiningDate: '2023-01-15',
    status: 'Active',
    commissionRate: '10%'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Franchise statistics
  const stats = {
    team1: {
      capacity: 500,
      registered: 245,
      active: 189,
      groups: 3
    },
    team2: {
      capacity: 1000,
      registered: 620,
      active: 512,
      groups: 5
    },
    collection: {
      total: 1563500,
      thisMonth: 350500,
      lastMonth: 421500
    },
    income: {
      total: 156350,
      thisMonth: 35050,
      lastMonth: 42150,
      pending: 35050
    },
    winners: {
      total: 23,
      redeemed: 18,
      pending: 4,
      expired: 1
    }
  };

  return (
    <div className="franchise-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Franchise Profile</h1>
          <p className="page-subtitle">View and manage your franchise information</p>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <button className="action-btn primary" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button className="action-btn success" onClick={handleSave}>
                ✓ Save Changes
              </button>
              <button className="action-btn danger" onClick={handleCancel}>
                ✗ Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid-4">
        <div className="franchise-card stat-card team1">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Team 1 Members</div>
            <div className="stat-value">{stats.team1.registered}/{stats.team1.capacity}</div>
            <div className="stat-detail">{stats.team1.active} Active</div>
          </div>
        </div>
        <div className="franchise-card stat-card team2">
          <div className="stat-icon">🎪</div>
          <div className="stat-content">
            <div className="stat-label">Team 2 Members</div>
            <div className="stat-value">{stats.team2.registered}/{stats.team2.capacity}</div>
            <div className="stat-detail">{stats.team2.active} Active</div>
          </div>
        </div>
        <div className="franchise-card stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Total Collection</div>
            <div className="stat-value">₹{stats.collection.total.toLocaleString('en-IN')}</div>
            <div className="stat-detail">This Month: ₹{stats.collection.thisMonth.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div className="franchise-card stat-card success">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">₹{stats.income.total.toLocaleString('en-IN')}</div>
            <div className="stat-detail">Pending: ₹{stats.income.pending.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Basic Information */}
        <div className="franchise-card profile-section">
          <div className="section-header">
            <h2>Basic Information</h2>
            <span className={`status-badge status-${formData.status.toLowerCase()}`}>
              {formData.status}
            </span>
          </div>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Franchise ID</label>
                <input 
                  type="text" 
                  name="franchiseId"
                  value={formData.franchiseId}
                  disabled
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Joining Date</label>
                <input 
                  type="text" 
                  value={new Date(formData.joiningDate).toLocaleDateString('en-IN')}
                  disabled
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Franchise Name</label>
                <input 
                  type="text" 
                  name="franchiseName"
                  value={formData.franchiseName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Franchise Head</label>
                <input 
                  type="text" 
                  name="franchiseHead"
                  value={formData.franchiseHead}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input 
                  type="text" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Alternative Mobile</label>
                <input 
                  type="text" 
                  name="alternativeMobile"
                  value={formData.alternativeMobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="franchise-card profile-section">
          <div className="section-header">
            <h2>Address Information</h2>
          </div>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group full-width">
                <label>Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-textarea"
                  rows="2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pincode</label>
                <input 
                  type="text" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="franchise-card profile-section">
          <div className="section-header">
            <h2>Business Information</h2>
          </div>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>GST Number</label>
                <input 
                  type="text" 
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>PAN Number</label>
                <input 
                  type="text" 
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Commission Rate</label>
                <input 
                  type="text" 
                  name="commissionRate"
                  value={formData.commissionRate}
                  disabled
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Information */}
        <div className="franchise-card profile-section">
          <div className="section-header">
            <h2>Bank Information</h2>
          </div>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group full-width">
                <label>Bank Name</label>
                <input 
                  type="text" 
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Account Holder Name</label>
                <input 
                  type="text" 
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Account Number</label>
                <input 
                  type="text" 
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>IFSC Code</label>
                <input 
                  type="text" 
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Summary */}
      <div className="franchise-card">
        <div className="section-header">
          <h2>Team Summary</h2>
        </div>
        <div className="team-summary-grid">
          <div className="team-summary-card team1">
            <h3>Team 1</h3>
            <div className="summary-stats">
              <div className="summary-item">
                <span className="summary-label">Capacity:</span>
                <span className="summary-value">{stats.team1.capacity}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Registered:</span>
                <span className="summary-value">{stats.team1.registered}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Active:</span>
                <span className="summary-value">{stats.team1.active}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Groups:</span>
                <span className="summary-value">{stats.team1.groups}</span>
              </div>
            </div>
            <div className="franchise-progress">
              <div 
                className="franchise-progress-fill team1"
                style={{ width: `${(stats.team1.registered / stats.team1.capacity) * 100}%` }}
              ></div>
            </div>
            <div className="progress-label">
              {((stats.team1.registered / stats.team1.capacity) * 100).toFixed(1)}% Filled
            </div>
          </div>

          <div className="team-summary-card team2">
            <h3>Team 2</h3>
            <div className="summary-stats">
              <div className="summary-item">
                <span className="summary-label">Capacity:</span>
                <span className="summary-value">{stats.team2.capacity}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Registered:</span>
                <span className="summary-value">{stats.team2.registered}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Active:</span>
                <span className="summary-value">{stats.team2.active}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Groups:</span>
                <span className="summary-value">{stats.team2.groups}</span>
              </div>
            </div>
            <div className="franchise-progress">
              <div 
                className="franchise-progress-fill team2"
                style={{ width: `${(stats.team2.registered / stats.team2.capacity) * 100}%` }}
              ></div>
            </div>
            <div className="progress-label">
              {((stats.team2.registered / stats.team2.capacity) * 100).toFixed(1)}% Filled
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="franchise-card">
        <div className="section-header">
          <h2>Performance Summary</h2>
        </div>
        <div className="performance-grid">
          <div className="performance-card">
            <div className="performance-icon">💰</div>
            <div className="performance-content">
              <div className="performance-label">Total Collection</div>
              <div className="performance-value">₹{stats.collection.total.toLocaleString('en-IN')}</div>
              <div className="performance-detail">
                This Month: ₹{stats.collection.thisMonth.toLocaleString('en-IN')} | 
                Last Month: ₹{stats.collection.lastMonth.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="performance-card success">
            <div className="performance-icon">💵</div>
            <div className="performance-content">
              <div className="performance-label">Total Income</div>
              <div className="performance-value">₹{stats.income.total.toLocaleString('en-IN')}</div>
              <div className="performance-detail">
                Pending: ₹{stats.income.pending.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="performance-card info">
            <div className="performance-icon">🏆</div>
            <div className="performance-content">
              <div className="performance-label">Total Winners</div>
              <div className="performance-value">{stats.winners.total}</div>
              <div className="performance-detail">
                Redeemed: {stats.winners.redeemed} | Pending: {stats.winners.pending} | Expired: {stats.winners.expired}
              </div>
            </div>
          </div>

          <div className="performance-card">
            <div className="performance-icon">👥</div>
            <div className="performance-content">
              <div className="performance-label">Total Members</div>
              <div className="performance-value">{stats.team1.registered + stats.team2.registered}</div>
              <div className="performance-detail">
                Active: {stats.team1.active + stats.team2.active} | Total Groups: {stats.team1.groups + stats.team2.groups}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseProfile;
