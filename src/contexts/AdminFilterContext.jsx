import { createContext, useContext, useState, useEffect } from 'react';

const AdminFilterContext = createContext();

export const useAdminFilter = () => {
  const context = useContext(AdminFilterContext);
  if (!context) {
    throw new Error('useAdminFilter must be used within AdminFilterProvider');
  }
  return context;
};

export const AdminFilterProvider = ({ children }) => {
  const [selectedFranchise, setSelectedFranchise] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  // Mock franchise data - in real app, this would come from API
  const franchises = [
    { id: 'FRAN-001', name: 'ABC Franchise Salem', location: 'Salem, TN' },
    { id: 'FRAN-002', name: 'XYZ Franchise Chennai', location: 'Chennai, TN' },
    { id: 'FRAN-003', name: 'PQR Franchise Coimbatore', location: 'Coimbatore, TN' },
  ];

  // Teams available for each franchise
  const teams = [
    { id: 'TEAM-1', name: 'Team 1', capacity: 500 },
    { id: 'TEAM-2', name: 'Team 2', capacity: 1000 },
  ];

  // Groups available for each franchise + team combination
  const getGroupsForFranchiseTeam = (franchiseId, teamId) => {
    // In real app, this would be fetched from API based on franchise and team
    const groupsMap = {
      'FRAN-001': {
        'TEAM-1': [
          { id: 'GROUP-A', name: 'Group A' },
          { id: 'GROUP-B', name: 'Group B' },
          { id: 'GROUP-C', name: 'Group C' },
        ],
        'TEAM-2': [
          { id: 'GROUP-A', name: 'Group A' },
          { id: 'GROUP-B', name: 'Group B' },
          { id: 'GROUP-C', name: 'Group C' },
        ],
      },
      'FRAN-002': {
        'TEAM-1': [
          { id: 'GROUP-A', name: 'Group A' },
          { id: 'GROUP-B', name: 'Group B' },
        ],
        'TEAM-2': [
          { id: 'GROUP-A', name: 'Group A' },
          { id: 'GROUP-B', name: 'Group B' },
          { id: 'GROUP-C', name: 'Group C' },
          { id: 'GROUP-D', name: 'Group D' },
        ],
      },
      'FRAN-003': {
        'TEAM-1': [
          { id: 'GROUP-A', name: 'Group A' },
        ],
        'TEAM-2': [
          { id: 'GROUP-A', name: 'Group A' },
          { id: 'GROUP-B', name: 'Group B' },
        ],
      },
    };

    return groupsMap[franchiseId]?.[teamId] || [];
  };

  // When franchise changes, reset team and group
  const handleFranchiseChange = (franchiseId) => {
    setSelectedFranchise(franchiseId);
    setSelectedTeam('');
    setSelectedGroup('');
  };

  // When team changes, reset group
  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId);
    setSelectedGroup('');
  };

  // When group changes
  const handleGroupChange = (groupId) => {
    setSelectedGroup(groupId);
  };

  // Get available groups based on current franchise and team selection
  const availableGroups = selectedFranchise && selectedTeam
    ? getGroupsForFranchiseTeam(selectedFranchise, selectedTeam)
    : [];

  // Get current selection details
  const getCurrentSelection = () => {
    const franchise = franchises.find(f => f.id === selectedFranchise);
    const team = teams.find(t => t.id === selectedTeam);
    const group = availableGroups.find(g => g.id === selectedGroup);

    return {
      franchise,
      team,
      group,
      // Unique identifier for data scoping: FRAN-001+TEAM-1+GROUP-A
      scopeKey: selectedFranchise && selectedTeam && selectedGroup
        ? `${selectedFranchise}+${selectedTeam}+${selectedGroup}`
        : null,
    };
  };

  // Check if filters are fully selected
  const isFullySelected = () => {
    return Boolean(selectedFranchise && selectedTeam && selectedGroup);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFranchise('');
    setSelectedTeam('');
    setSelectedGroup('');
  };

  const value = {
    // State
    selectedFranchise,
    selectedTeam,
    selectedGroup,
    
    // Data
    franchises,
    teams,
    availableGroups,
    
    // Actions
    setSelectedFranchise: handleFranchiseChange,
    setSelectedTeam: handleTeamChange,
    setSelectedGroup: handleGroupChange,
    resetFilters,
    
    // Helpers
    getCurrentSelection,
    isFullySelected,
    getGroupsForFranchiseTeam,
  };

  return (
    <AdminFilterContext.Provider value={value}>
      {children}
    </AdminFilterContext.Provider>
  );
};

export default AdminFilterContext;
