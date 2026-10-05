import { useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const VerifyRedemption = () => {
  const { redemptionId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // In production, validate with backend
  // For demo, basic validation
  const validateRedemption = () => {
    if (!redemptionId || !token) {
      return { valid: false, reason: 'INVALID_QR' };
    }

    try {
      const decoded = atob(token);
      const parts = decoded.split(':');
      
      if (parts[0] !== redemptionId) {
        return { valid: false, reason: 'MISMATCH' };
      }

      // In production, check against database
      return { 
        valid: true, 
        data: {
          redemptionId: parts[0],
          rewardId: parts[1],
          memberId: parts[2],
          timestamp: parts[3]
        }
      };
    } catch (error) {
      return { valid: false, reason: 'INVALID_TOKEN' };
    }
  };

  const validation = validateRedemption();

  return (
    <div className="verify-redemption-page">
      <div className="verify-redemption-container">
        <div className="verify-redemption-header">
          <h1 className="verify-redemption-brand">MILLANCE</h1>
          <p className="verify-redemption-subtitle">Lucky Draw Redemption Verification</p>
        </div>

        {validation.valid ? (
          <div className="verify-redemption-card verify-redemption-valid">
            <div className="verify-redemption-icon verify-icon-valid">
              <CheckCircle size={64} />
            </div>
            
            <h2 className="verify-redemption-title">Redemption Verified</h2>
            <p className="verify-redemption-message">This redemption is valid and active</p>
            
            <div className="verify-redemption-details">
              <div className="verify-detail-row">
                <span className="verify-detail-label">Redemption ID:</span>
                <span className="verify-detail-value">{redemptionId}</span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Member ID:</span>
                <span className="verify-detail-value">{validation.data.memberId}</span>
              </div>
              <div className="verify-detail-row">
                <span className="verify-detail-label">Status:</span>
                <span className="verify-status verify-status-valid">VALID</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="verify-redemption-card verify-redemption-invalid">
            <div className="verify-redemption-icon verify-icon-invalid">
              {validation.reason === 'INVALID_QR' || validation.reason === 'INVALID_TOKEN' ? (
                <XCircle size={64} />
              ) : (
                <AlertTriangle size={64} />
              )}
            </div>
            
            <h2 className="verify-redemption-title">
              {validation.reason === 'INVALID_QR' && 'Invalid Redemption QR'}
              {validation.reason === 'INVALID_TOKEN' && 'Invalid Verification Token'}
              {validation.reason === 'MISMATCH' && 'Redemption Not Found'}
            </h2>
            
            <p className="verify-redemption-message">
              {validation.reason === 'INVALID_QR' && 'The QR code you scanned is not valid. Please check and try again.'}
              {validation.reason === 'INVALID_TOKEN' && 'The verification token is invalid or corrupted.'}
              {validation.reason === 'MISMATCH' && 'This redemption ID does not exist in our system.'}
            </p>
            
            {redemptionId && (
              <div className="verify-redemption-details">
                <div className="verify-detail-row">
                  <span className="verify-detail-label">Redemption ID:</span>
                  <span className="verify-detail-value">{redemptionId}</span>
                </div>
                <div className="verify-detail-row">
                  <span className="verify-detail-label">Status:</span>
                  <span className="verify-status verify-status-invalid">INVALID</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyRedemption;
