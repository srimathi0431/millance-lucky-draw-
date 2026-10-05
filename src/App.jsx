import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import styles
import './styles/globals.css';
import './styles/animations.css';
import './styles/public.css';
import './styles/user.css';
import './styles/franchise.css';
import './styles/admin.css';

// Public website pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import Teams from './pages/public/Teams';
import TeamDetail from './pages/public/TeamDetail';
import Prizes from './pages/public/Prizes';
import Draw from './pages/public/Draw';
import Winners from './pages/public/Winners';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import ReferralRegistration from './pages/public/ReferralRegistration';

// User panel pages
import UserLogin from './pages/user/UserLogin';
import UserDashboard from './pages/user/UserDashboard';
import UserVault from './pages/user/UserVault';
import UserDraws from './pages/user/UserDraws';
import UserRedeem from './pages/user/UserRedeem';
import UserMyPlan from './pages/user/UserMyPlan';
import UserPayments from './pages/user/UserPayments';
import UserProfile from './pages/user/UserProfile';
import UserProfileEdit from './pages/user/UserProfileEdit';
import UserChangePassword from './pages/user/UserChangePassword';
import UserNotifications from './pages/user/UserNotifications';
import VerifyRedemption from './pages/VerifyRedemption';

// Franchise panel pages
import FranchiseLogin from './pages/franchise/FranchiseLogin';
import FranchiseLayout from './layouts/FranchiseLayout';
import FranchiseDashboard from './pages/franchise/FranchiseDashboard';
import FranchiseMembers from './pages/franchise/FranchiseMembers';
import FranchiseTeam1 from './pages/franchise/FranchiseTeam1';
import FranchiseTeam2 from './pages/franchise/FranchiseTeam2';
import FranchiseDraws from './pages/franchise/FranchiseDraws';
import FranchiseDrawSchedule from './pages/franchise/FranchiseDrawSchedule';
import FranchiseWinners from './pages/franchise/FranchiseWinners';
import FranchisePayments from './pages/franchise/FranchisePayments';
import FranchiseIncome from './pages/franchise/FranchiseIncome';
import FranchiseReports from './pages/franchise/FranchiseReports';
import FranchiseProfile from './pages/franchise/FranchiseProfile';

// Admin panel pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminFranchises from './pages/admin/AdminFranchises';
import AdminTeams from './pages/admin/AdminTeams';
import AdminMonthlyPrizes from './pages/admin/AdminMonthlyPrizes';
import AdminDraws from './pages/admin/AdminDraws';
import AdminDrawSchedules from './pages/admin/AdminDrawSchedules';
import AdminPayments from './pages/admin/AdminPayments';
import AdminFranchiseIncome from './pages/admin/AdminFranchiseIncome';
import AdminCollections from './pages/admin/AdminCollections';
import AdminWinners from './pages/admin/AdminWinners';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// Context providers
import { DrawScheduleProvider } from './contexts/DrawScheduleContext';

function App() {
  return (
    <DrawScheduleProvider>
      <Router>
        <Routes>
        {/* PUBLIC WEBSITE ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/team-1" element={<TeamDetail teamId={1} />} />
        <Route path="/teams/team-2" element={<TeamDetail teamId={2} />} />
        <Route path="/prizes" element={<Prizes />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Franchise Referral Registration */}
        <Route path="/join/:franchiseId/:team/:group" element={<ReferralRegistration />} />

        {/* USER PANEL ROUTES */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/vault" element={<UserVault />} />
        <Route path="/user/draws" element={<UserDraws />} />
        <Route path="/user/redeem" element={<UserRedeem />} />
        <Route path="/user/my-plan" element={<UserMyPlan />} />
        <Route path="/user/payments" element={<UserPayments />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/profile/edit" element={<UserProfileEdit />} />
        <Route path="/user/profile/change-password" element={<UserChangePassword />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        
        {/* Redemption Verification (Public) */}
        <Route path="/verify-redemption/:redemptionId" element={<VerifyRedemption />} />

        {/* FRANCHISE PANEL ROUTES */}
        <Route path="/franchise/login" element={<FranchiseLogin />} />
        <Route path="/franchise/dashboard" element={<FranchiseLayout><FranchiseDashboard /></FranchiseLayout>} />
        <Route path="/franchise/members" element={<FranchiseLayout><FranchiseMembers /></FranchiseLayout>} />
        <Route path="/franchise/team-1" element={<FranchiseLayout><FranchiseTeam1 /></FranchiseLayout>} />
        <Route path="/franchise/team-2" element={<FranchiseLayout><FranchiseTeam2 /></FranchiseLayout>} />
        <Route path="/franchise/draws" element={<FranchiseLayout><FranchiseDraws /></FranchiseLayout>} />
        <Route path="/franchise/draw-schedule" element={<FranchiseLayout><FranchiseDrawSchedule /></FranchiseLayout>} />
        <Route path="/franchise/winners" element={<FranchiseLayout><FranchiseWinners /></FranchiseLayout>} />
        <Route path="/franchise/payments" element={<FranchiseLayout><FranchisePayments /></FranchiseLayout>} />
        <Route path="/franchise/income" element={<FranchiseLayout><FranchiseIncome /></FranchiseLayout>} />
        <Route path="/franchise/reports" element={<FranchiseLayout><FranchiseReports /></FranchiseLayout>} />
        <Route path="/franchise/profile" element={<FranchiseLayout><FranchiseProfile /></FranchiseLayout>} />

        {/* ADMIN PANEL ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/franchises" element={<AdminFranchises />} />
        <Route path="/admin/teams" element={<AdminTeams />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/monthly-prizes" element={<AdminMonthlyPrizes />} />
        <Route path="/admin/draws" element={<AdminDraws />} />
        <Route path="/admin/draw-schedules" element={<AdminDrawSchedules />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/franchise-income" element={<AdminFranchiseIncome />} />
        <Route path="/admin/collections" element={<AdminCollections />} />
        <Route path="/admin/winners" element={<AdminWinners />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </DrawScheduleProvider>
  );
}

export default App;
