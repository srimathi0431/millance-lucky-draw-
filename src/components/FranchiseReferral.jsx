import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link2, Copy, Share2, QrCode, CheckCircle, Download } from 'lucide-react';
import QRCode from 'qrcode';

const FranchiseReferral = ({ franchiseId }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('team-1');
  const [selectedGroup, setSelectedGroup] = useState('group-a');

  // Team options
  const teamOptions = [
    { value: 'team-1', label: 'Team 1' },
    { value: 'team-2', label: 'Team 2' }
  ];

  // Group options per team
  const groupOptions = {
    'team-1': [
      { value: 'group-a', label: 'Group A' },
      { value: 'group-b', label: 'Group B' },
      { value: 'group-c', label: 'Group C' }
    ],
    'team-2': [
      { value: 'group-a', label: 'Group A' },
      { value: 'group-b', label: 'Group B' }
    ]
  };

  // Generate referral URL with team and group
  const referralUrl = `${window.location.origin}/join/${franchiseId}/${selectedTeam}/${selectedGroup}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Millance Lucky Draw',
          text: `Join Millance Lucky Draw through my franchise! Register here:`,
          url: referralUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback to copy if Web Share API is not supported
      handleCopyLink();
    }
  };

  const handleShowQR = async () => {
    try {
      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(referralUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#8B5CF6',
          light: '#1E293B'
        }
      });
      setQrCodeUrl(qrDataUrl);
      setShowQR(true);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.download = `referral-qr-${franchiseId}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="franchise-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Link2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Referral Link</h3>
          <p className="text-sm text-gray-400">Share this link to invite new members</p>
        </div>
      </div>

      {/* Team & Group Selection */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-2">Select Team</label>
          <select
            value={selectedTeam}
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              setSelectedGroup(groupOptions[e.target.value][0].value);
            }}
            className="w-full px-3 py-2 bg-slate-900 border border-cyan-500/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {teamOptions.map(team => (
              <option key={team.value} value={team.value}>{team.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-2">Select Group</label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-green-500/50 rounded-lg text-white text-sm focus:outline-none focus:border-green-400 cursor-pointer"
          >
            {groupOptions[selectedTeam]?.map(group => (
              <option key={group.value} value={group.value}>{group.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Referral URL Display */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-400 mb-2">Your Referral Link</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm text-violet-400 font-mono break-all">
            {referralUrl}
          </code>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 rounded-lg transition-all group"
        >
          {showCopied ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <Copy className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          )}
          <span className="text-xs font-semibold text-blue-400">
            {showCopied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/30 rounded-lg transition-all group"
        >
          <Share2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-purple-400">Share</span>
        </button>

        {/* QR Code */}
        <button
          onClick={handleShowQR}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-violet-600/20 to-violet-700/20 hover:from-violet-600/30 hover:to-violet-700/30 border border-violet-500/30 rounded-lg transition-all group"
        >
          <QrCode className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-violet-400">QR Code</span>
        </button>
      </div>

      {/* QR Code Modal - Using Portal */}
      {showQR && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
          style={{ zIndex: 10000 }}
          onClick={() => setShowQR(false)}
        >
          <div 
            className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            style={{ zIndex: 10001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-1">Referral QR Code</h3>
              <p className="text-sm text-gray-400">Scan to register</p>
            </div>

            {/* QR Code Display */}
            <div className="bg-slate-900 rounded-xl p-6 mb-4 relative group">
              <div className="flex items-center justify-center">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="Referral QR Code" 
                    className="w-full max-w-[250px] rounded-lg"
                  />
                )}
              </div>
              
              {/* Floating Download Button on QR */}
              <button
                onClick={handleDownloadQR}
                className="absolute top-4 right-4 p-2 bg-violet-600 hover:bg-violet-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="Download QR Code"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Franchise ID */}
            <div className="bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/30 rounded-lg p-3 mb-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Franchise ID</p>
              <p className="text-lg font-bold text-violet-400">{franchiseId}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownloadQR}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all"
              >
                Download QR
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default FranchiseReferral;
