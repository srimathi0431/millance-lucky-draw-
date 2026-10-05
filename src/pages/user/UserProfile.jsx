import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserLayout from '../../layouts/UserLayout';
import { 
  User, Mail, Phone, MapPin, Users, Building2, Calendar, 
  Shield, Edit, IdCard, CheckCircle, Camera, Upload, X
} from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [savedProfileImage, setSavedProfileImage] = useState(null);
  
  // Load saved profile image from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userProfileImage');
    if (saved) {
      setSavedProfileImage(saved);
    }
  }, []);
  
  // User Profile Data (should be synced with global state/context)
  const profileData = {
    name: 'Rajesh Kumar',
    memberId: 'ML001',
    mobile: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    address: '123, Main Street, Chennai, Tamil Nadu - 600001',
    team: 'Team 1',
    group: 'Group A',
    franchise: 'Chennai Central Franchise',
    registrationDate: 'Nov 22, 2023',
    status: 'ACTIVE'
  };

  const handleEditProfile = () => {
    navigate('/user/profile/edit');
  };

  const handleChangePassword = () => {
    navigate('/user/profile/change-password');
  };

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload/save
  const handleSaveImage = () => {
    if (!tempImage) return;
    
    // Save to localStorage
    localStorage.setItem('userProfileImage', tempImage);
    setSavedProfileImage(tempImage);
    
    // TODO: Implement API call to upload image
    // const formData = new FormData();
    // formData.append('profileImage', profileImage);
    // await uploadProfileImage(formData);
    
    setShowImageModal(false);
    setTempImage(null);
  };

  // Remove profile picture
  const handleRemoveImage = () => {
    localStorage.removeItem('userProfileImage');
    setSavedProfileImage(null);
    setTempImage(null);
    setShowImageModal(false);
  };

  // Close modal without saving
  const handleCloseModal = () => {
    setShowImageModal(false);
    setTempImage(null);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showImageModal]);

  // Get status color
  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'user-profile-status-active';
      case 'INACTIVE': return 'user-profile-status-inactive';
      case 'SUSPENDED': return 'user-profile-status-suspended';
      default: return 'user-profile-status-default';
    }
  };

  return (
    <UserLayout>
      <div className="user-dashboard-bubbles-v2">
        <div className="user-bubble-v2 user-bubble-v2-1"></div>
        <div className="user-bubble-v2 user-bubble-v2-2"></div>
        <div className="user-bubble-v2 user-bubble-v2-3"></div>
        <div className="user-bubble-v2 user-bubble-v2-4"></div>
      </div>

      <div className="user-dashboard-compact">
        {/* Compact Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="user-profile-header-card"
        >
          <div className="user-profile-avatar-wrapper">
            <div className="user-profile-avatar">
              {savedProfileImage ? (
                <img src={savedProfileImage} alt="Profile" className="user-profile-avatar-img" />
              ) : (
                <User size={32} />
              )}
            </div>
            
            {/* Camera Icon - Upload Trigger */}
            <label htmlFor="profile-image-input" className="user-profile-camera-btn">
              <Camera size={16} />
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          
          <div className="user-profile-header-info">
            <h1 className="user-profile-name">{profileData.name}</h1>
            <div className="user-profile-meta">
              <span className="user-profile-member-id">
                <IdCard size={14} />
                <span>{profileData.memberId}</span>
              </span>
              <span className={`user-profile-status ${getStatusClass(profileData.status)}`}>
                <CheckCircle size={14} />
                <span>{profileData.status}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Image Change Modal */}
        <AnimatePresence>
          {showImageModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="user-profile-modal-backdrop"
                onClick={handleCloseModal}
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%'
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="user-profile-image-modal"
                style={{
                  position: 'fixed',
                  zIndex: 9999
                }}
              >
                <div className="user-profile-modal-header">
                  <h3>Change Profile Picture</h3>
                  <button onClick={handleCloseModal} className="user-profile-modal-close">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="user-profile-modal-body">
                  <div className="user-profile-modal-preview">
                    {tempImage && (
                      <img src={tempImage} alt="Preview" className="user-profile-modal-img" />
                    )}
                  </div>
                </div>
                
                <div className="user-profile-modal-actions">
                  <button onClick={handleSaveImage} className="user-profile-modal-btn-save">
                    <Upload size={16} />
                    <span>Save</span>
                  </button>
                  <button onClick={handleCloseModal} className="user-profile-modal-btn-remove">
                    Cancel
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="user-card-compact"
        >
          <h3 className="user-section-title">Profile Information</h3>
          
          <div className="user-profile-info-grid">
            <div className="user-profile-info-item">
              <User className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Full Name</span>
                <span className="user-profile-info-value">{profileData.name}</span>
              </div>
            </div>
            
            <div className="user-profile-info-item">
              <Phone className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Mobile</span>
                <span className="user-profile-info-value">{profileData.mobile}</span>
              </div>
            </div>
            
            <div className="user-profile-info-item">
              <Mail className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Email</span>
                <span className="user-profile-info-value">{profileData.email}</span>
              </div>
            </div>
            
            <div className="user-profile-info-item user-profile-info-full">
              <MapPin className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Address</span>
                <span className="user-profile-info-value">{profileData.address}</span>
              </div>
            </div>
            
            <div className="user-profile-info-item">
              <Users className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Team & Group</span>
                <span className="user-profile-info-value">{profileData.team} - {profileData.group}</span>
              </div>
            </div>
            
            <div className="user-profile-info-item">
              <Building2 className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Franchise</span>
                <span className="user-profile-info-value">{profileData.franchise}</span>
              </div>
            </div>
            
            <div className="user-profile-info-item">
              <Calendar className="user-profile-info-icon" />
              <div>
                <span className="user-profile-info-label">Registration Date</span>
                <span className="user-profile-info-value">{profileData.registrationDate}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="user-card-compact"
        >
          <h3 className="user-section-title">Account Actions</h3>
          
          <div className="user-profile-actions-grid">
            <button
              onClick={handleEditProfile}
              className="user-profile-action-btn user-profile-btn-edit"
            >
              <Edit size={18} />
              <span>Edit Profile</span>
            </button>
            
            <button
              onClick={handleChangePassword}
              className="user-profile-action-btn user-profile-btn-password"
            >
              <Shield size={18} />
              <span>Change Password</span>
            </button>
          </div>
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
