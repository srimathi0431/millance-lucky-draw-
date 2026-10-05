import { useState } from 'react';
import { X, Eye, EyeOff, User, Phone, Mail, Lock, Users, Grid3x3 } from 'lucide-react';

const CreateUserModal = ({ isOpen, onClose, onSuccess, franchiseId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: '',
    group: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Team and Group options
  const teamOptions = [
    { value: 'Team 1', label: 'Team 1' },
    { value: 'Team 2', label: 'Team 2' }
  ];

  const groupOptions = {
    'Team 1': ['Group A', 'Group B', 'Group C'],
    'Team 2': ['Group A', 'Group B']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Reset group when team changes
      if (name === 'team') {
        updated.group = '';
      }
      return updated;
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit mobile number';
    } else {
      // Check uniqueness
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.some(u => u.phone === formData.phone)) {
        newErrors.phone = 'Phone number already exists';
      }
    }

    // Email validation (optional but must be unique if provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Enter valid email address';
      } else {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (existingUsers.some(u => u.email === formData.email)) {
          newErrors.email = 'Email already exists';
        }
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Team & Group
    if (!formData.team) {
      newErrors.team = 'Please select a team';
    }
    if (!formData.group) {
      newErrors.group = 'Please select a group';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMemberId = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.length === 0) {
      return 'ML001';
    }
    
    const ids = existingUsers
      .map(u => parseInt(u.memberId.replace('ML', '')))
      .filter(n => !isNaN(n));
    
    const maxId = Math.max(...ids, 0);
    const nextId = maxId + 1;
    return `ML${String(nextId).padStart(3, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const memberId = generateMemberId();
      
      const newUser = {
        memberId,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || '',
        password: formData.password, // In production, hash this
        franchiseId: franchiseId,
        team: formData.team,
        group: formData.group,
        registrationDate: new Date().toISOString(),
        status: 'Active',
        paid: '₹0',
        pending: '₹10,000',
        month: 5,
        createdBy: 'franchise'
      };

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      onSuccess(newUser);
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      fullName: '', phone: '', email: '', password: '', 
      confirmPassword: '', team: '', group: ''
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-50 bg-black/60 backdrop-blur-sm animate-fadeIn"
      style={{ 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '60px',
        paddingBottom: '60px',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      <div 
        className="bg-slate-800 shadow-2xl animate-modalSlideUp"
        style={{ 
          maxWidth: '700px',
          width: '100%',
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '18px'
        }}
      >
        {/* HEADER */}
        <div 
          className="px-6 py-3.5 border-b flex items-center justify-between relative" 
          style={{ 
            flexShrink: 0, 
            height: '80px',
            minHeight: '80px',
            maxHeight: '80px',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, #1E3A8A, #7C3AED)',
            borderBottom: '1px solid rgba(139,92,246,0.25)'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center justify-center"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6, #2563EB)'
              }}
            >
              <User style={{ width: '26px', height: '26px', color: '#FFFFFF' }} />
            </div>
            <div>
              <h2 
                className="font-bold text-white"
                style={{
                  fontSize: '26px',
                  lineHeight: '1.2',
                  margin: 0
                }}
              >
                Create New User
              </h2>
              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: '1.4',
                  color: '#AAB4C8',
                  marginTop: '4px'
                }}
              >
                Add a new member to {franchiseId}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose} 
            className="hover:bg-white/10 transition-colors"
            style={{
              position: 'absolute',
              right: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: '#94A3B8'
            }}
          >
            <X style={{ width: '22px', height: '22px' }} />
          </button>
        </div>

        {/* BODY */}
        <div 
          className="px-6 py-5 overflow-y-auto overflow-x-hidden" 
          style={{ 
            flex: 1, 
            minHeight: 0,
            paddingBottom: '24px'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name <span className="text-red-400">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="Rajesh Kumar" 
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number <span className="text-red-400">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  maxLength="10"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.phone ? 'border-red-500' : 'border-blue-500'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all`}
                  placeholder="9876543210" 
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-purple-500'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all`}
                  placeholder="user@example.com" 
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 bg-slate-900 border ${errors.password ? 'border-red-500' : 'border-pink-500'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all`}
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 bg-slate-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-pink-500'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all`}
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
            </div>

            {/* Team */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Team <span className="text-red-400">*</span></label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
                <select 
                  name="team" 
                  value={formData.team} 
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-900 border ${errors.team ? 'border-red-500' : 'border-cyan-500'} rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer`}
                >
                  <option value="">Select Team</option>
                  {teamOptions.map(team => (
                    <option key={team.value} value={team.value}>{team.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.team && <p className="mt-1 text-xs text-red-400">{errors.team}</p>}
            </div>

            {/* Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Group <span className="text-red-400">*</span></label>
              <div className="relative">
                <Grid3x3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
                <select 
                  name="group" 
                  value={formData.group} 
                  onChange={handleChange}
                  disabled={!formData.team}
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-900 border ${errors.group ? 'border-red-500' : 'border-green-500'} rounded-lg text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <option value="">Select Group</option>
                  {formData.team && groupOptions[formData.team]?.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.group && <p className="mt-1 text-xs text-red-400">{errors.group}</p>}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div 
          className="px-7 py-4 border-t border-slate-700 bg-slate-900/80 flex items-center justify-end gap-3" 
          style={{ flexShrink: 0, height: '76px' }}
        >
          <button 
            type="button" 
            onClick={handleClose} 
            disabled={isSubmitting}
            className="px-6 py-2.5 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50"
            style={{ height: '44px' }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="px-6 py-2.5 text-white rounded-lg transition-all font-semibold disabled:opacity-50 flex items-center gap-2 shadow-lg"
            style={{ 
              height: '44px',
              background: 'linear-gradient(135deg, #8B5CF6, #2563EB)'
            }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                Create User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
