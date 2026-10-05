import { useAdminFilter } from '../contexts/AdminFilterContext';
import { ChevronDown, Building2, Users, Layers, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const AdminFilterBar = () => {
  const {
    selectedFranchise,
    selectedTeam,
    selectedGroup,
    franchises,
    teams,
    availableGroups,
    setSelectedFranchise,
    setSelectedTeam,
    setSelectedGroup,
    resetFilters,
    getCurrentSelection,
  } = useAdminFilter();

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = {
    franchise: useRef(null),
    team: useRef(null),
    group: useRef(null),
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [dropdownRefs.franchise, dropdownRefs.team, dropdownRefs.group];
      const clickedOutside = refs.every(
        ref => ref.current && !ref.current.contains(event.target)
      );
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleFranchiseSelect = (franchiseId) => {
    setSelectedFranchise(franchiseId);
    setOpenDropdown(null);
  };

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
    setOpenDropdown(null);
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId);
    setOpenDropdown(null);
  };

  const currentSelection = getCurrentSelection();

  return (
    <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        {/* Filter Label */}
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-semibold text-gray-300">Filter By:</span>
        </div>

        {/* Dropdowns Container */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Franchise Dropdown */}
          <div ref={dropdownRefs.franchise} className="relative min-w-[200px]">
            <label className="block text-xs text-gray-400 mb-1">Franchise</label>
            <button
              type="button"
              onClick={() => toggleDropdown('franchise')}
              className="w-full h-[44px] px-4 bg-slate-800 border border-slate-700 rounded-lg 
                         flex items-center justify-between text-white hover:bg-slate-700 hover:border-slate-600 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">
                  {currentSelection.franchise ? currentSelection.franchise.name : 'Select Franchise'}
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'franchise' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === 'franchise' && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg 
                              shadow-xl overflow-hidden animate-dropdown">
                <div className="max-h-60 overflow-y-auto">
                  {franchises.map((franchise) => (
                    <button
                      key={franchise.id}
                      type="button"
                      onClick={() => handleFranchiseSelect(franchise.id)}
                      className={`w-full px-4 py-3 text-left transition-colors duration-150
                        ${selectedFranchise === franchise.id 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-300 hover:bg-slate-700'
                        }`}
                    >
                      <div className="text-sm font-semibold">{franchise.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{franchise.id} • {franchise.location}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Team Dropdown */}
          <div ref={dropdownRefs.team} className="relative min-w-[180px]">
            <label className="block text-xs text-gray-400 mb-1">Team</label>
            <button
              type="button"
              onClick={() => toggleDropdown('team')}
              disabled={!selectedFranchise}
              className="w-full h-[44px] px-4 bg-slate-800 border border-slate-700 rounded-lg 
                         flex items-center justify-between text-white hover:bg-slate-700 hover:border-slate-600 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">
                  {currentSelection.team ? currentSelection.team.name : 'Select Team'}
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'team' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === 'team' && selectedFranchise && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg 
                              shadow-xl overflow-hidden animate-dropdown">
                <div className="max-h-60 overflow-y-auto">
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => handleTeamSelect(team.id)}
                      className={`w-full px-4 py-3 text-left transition-colors duration-150
                        ${selectedTeam === team.id 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-300 hover:bg-slate-700'
                        }`}
                    >
                      <div className="text-sm font-semibold">{team.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{team.capacity} Capacity</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Group Dropdown */}
          <div ref={dropdownRefs.group} className="relative min-w-[180px]">
            <label className="block text-xs text-gray-400 mb-1">Group</label>
            <button
              type="button"
              onClick={() => toggleDropdown('group')}
              disabled={!selectedTeam}
              className="w-full h-[44px] px-4 bg-slate-800 border border-slate-700 rounded-lg 
                         flex items-center justify-between text-white hover:bg-slate-700 hover:border-slate-600 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">
                  {currentSelection.group ? currentSelection.group.name : 'Select Group'}
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'group' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === 'group' && selectedTeam && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg 
                              shadow-xl overflow-hidden animate-dropdown">
                <div className="max-h-60 overflow-y-auto">
                  {availableGroups.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-400 text-center">
                      No groups available
                    </div>
                  ) : (
                    availableGroups.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => handleGroupSelect(group.id)}
                        className={`w-full px-4 py-3 text-left transition-colors duration-150
                          ${selectedGroup === group.id 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-300 hover:bg-slate-700'
                          }`}
                      >
                        <div className="text-sm font-semibold">{group.name}</div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        {(selectedFranchise || selectedTeam || selectedGroup) && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 h-[44px] bg-slate-800 hover:bg-slate-700 
                       border border-slate-700 text-gray-300 rounded-lg transition-colors text-sm font-medium
                       mt-6 lg:mt-0"
            title="Reset all filters"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Current Selection Display */}
      {currentSelection.scopeKey && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="text-gray-400">Current Scope:</span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-mono font-semibold">
            {currentSelection.scopeKey}
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminFilterBar;
