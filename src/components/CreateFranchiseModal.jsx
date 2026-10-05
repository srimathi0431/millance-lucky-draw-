import { useState } from 'react';
import { X, Eye, EyeOff, Building2, User, Phone, Mail, Lock, MapPin, Map } from 'lucide-react';

const CreateFranchiseModal = ({ isOpen, onClose, onSuccess, existingFranchises }) => {
  const [formData, setFormData] = useState({
    franchiseName: '',
    headName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: 'Active'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next franchise ID
  const generateFranchiseId = () => {
    if (existingFranchises.length === 0) {
      return 'FRAN-0001';
    }
    
    const ids = existingFranchises
      .map(f => parseInt(f.id.split('-')[1]))
      .filter(n => !isNaN(n));
    
    const maxId = Math.max(...ids, 0);
    const nextId = maxId + 1;
    return `FRAN-${String(nextId).padStart(4, '0')}`;
  };

  const franchiseId = generateFranchiseId();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.franchiseName.trim()) newErrors.franchiseName = 'Franchise name is required';
    if (!formData.headName.trim()) newErrors.headName = 'Head name is required';

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    } else if (existingFranchises.some(f => f.mobile === formData.mobile)) {
      newErrors.mobile = 'Mobile number already registered';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    } else if (existingFranchises.some(f => f.email === formData.email)) {
      newErrors.email = 'Email already registered';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    const pincodeRegex = /^\d{6}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Enter valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newFranchise = {
        id: franchiseId,
        name: formData.franchiseName,
        head: formData.headName,
        mobile: formData.mobile,
        email: formData.email,
        location: formData.city,
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        status: formData.status,
        totalUsers: 0,
        team1: { current: 0, capacity: 500 },
        team2: { current: 0, capacity: 1000 },
        collection: '₹0',
        income: '₹0',
        createdAt: new Date().toISOString()
      };

      onSuccess(newFranchise);
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      franchiseName: '', headName: '', mobile: '', email: '',
      password: '', confirmPassword: '', address: '', city: '',
      state: '', pincode: '', status: 'Active'
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
          maxWidth: '760px',
          width: '100%',
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '18px'
        }}
      >
        {/* HEADER - Fixed at top */}
        <div 
          className="px-6 py-3.5 border-b flex items-center justify-between relative" 
          style={{ 
            flexShrink: 0, 
            height: '86px',
            minHeight: '86px',
            maxHeight: '86px',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, #312E81, #1E3A8A)',
            borderBottom: '1px solid rgba(139,92,246,0.25)'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center justify-center"
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7C3AED, #2563EB)'
              }}
            >
              <Building2 style={{ width: '28px', height: '28px', color: '#FFFFFF' }} />
            </div>
            <div>
              <h2 
                className="font-bold text-white"
                style={{
                  fontSize: '28px',
                  lineHeight: '1.2',
                  margin: 0
                }}
              >
                Create New Franchise
              </h2>
              <p 
                style={{
                  fontSize: '16px',
                  lineHeight: '1.4',
                  color: '#AAB4C8',
                  marginTop: '4px'
                }}
              >
                Add a new franchise to the system
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

        {/* BODY - Scrollable Form Content */}
        <div 
          className="px-6 py-5 overflow-y-auto overflow-x-hidden" 
          style={{ 
            flex: 1, 
            minHeight: 0,
            paddingBottom: '24px'
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Franchise ID</label>
            <div className="px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg flex items-center justify-between">
              <span className="text-violet-400 font-mono font-bold">{franchiseId}</span>
              <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs font-semibold rounded">AUTO GENERATED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Franchise Name <span className="text-red-400">*</span></label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" name="franchiseName" value={formData.franchiseName} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.franchiseName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="Chennai Central Franchise" />
              </div>
              {errors.franchiseName && <p className="mt-1 text-xs text-red-400">{errors.franchiseName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Franchise Head Name <span className="text-red-400">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" name="headName" value={formData.headName} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.headName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="Rajesh Kumar" />
              </div>
              {errors.headName && <p className="mt-1 text-xs text-red-400">{errors.headName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Mobile Number <span className="text-red-400">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} maxLength="10"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.mobile ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="9876543210" />
              </div>
              {errors.mobile && <p className="mt-1 text-xs text-red-400">{errors.mobile}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address <span className="text-red-400">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="franchise@example.com" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 bg-slate-900 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-400 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 bg-slate-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-400 transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">City <span className="text-red-400">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.city ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="Chennai" />
              </div>
              {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">State <span className="text-red-400">*</span></label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" name="state" value={formData.state} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border ${errors.state ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                  placeholder="Tamil Nadu" />
              </div>
              {errors.state && <p className="mt-1 text-xs text-red-400">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Pincode <span className="text-red-400">*</span></label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} maxLength="6"
                className={`w-full px-4 py-2.5 bg-slate-900 border ${errors.pincode ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                placeholder="600001" />
              {errors.pincode && <p className="mt-1 text-xs text-red-400">{errors.pincode}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Status <span className="text-red-400">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none cursor-pointer">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="mb-0">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Address <span className="text-red-400">*</span></label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3"
              className={`w-full px-4 py-2.5 bg-slate-900 border ${errors.address ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none`}
              placeholder="123 Main Street, Area Name" />
            {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
          </div>
        </div>

        {/* FOOTER - Fixed at bottom */}
        <div 
          className="px-7 py-4 border-t border-slate-700 bg-slate-900/80 flex items-center justify-end gap-3" 
          style={{ flexShrink: 0, height: '80px' }}
        >
          <button type="button" onClick={handleClose} disabled={isSubmitting}
            className="px-6 py-2.5 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50"
            style={{ height: '46px' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting}
            className="px-6 py-2.5 text-white rounded-lg transition-all font-semibold disabled:opacity-50 flex items-center gap-2 shadow-lg"
            style={{ 
              height: '46px',
              background: 'linear-gradient(135deg, #8B5CF6, #2563EB)'
            }}>
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Building2 className="w-4 h-4" />
                Create Franchise
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFranchiseModal;
