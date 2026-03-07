import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './features/landing/pages/Landing';
import Login from './features/auth/pages/Login';
import Signup from './features/auth/pages/Signup';
import DashboardLayout from './features/dashboard/layouts/DashboardLayout';
import DashboardHome from './features/dashboard/pages/DashboardHome';
import CreateBiodata from './features/biodata/pages/CreateBiodata';
import EditBiodata from './features/biodata/pages/EditBiodata';
import MyBiodatas from './features/biodata/pages/MyBiodatas';
import ViewBiodata from './features/biodata/pages/ViewBiodata';
import Settings from './features/auth/pages/Settings';
import PremiumPlans from './features/payment/pages/PremiumPlans';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Navigation Wrapper to hide top nav on dashboard routes
const NavigationWrapper = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
  if (isDashboardRoute) return null;
  return <Navigation />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-montserrat bg-background text-textDark">
        <NavigationWrapper />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Dashboard Routes Wrapper */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                   <Route index element={<DashboardHome />} />
                   <Route path="create" element={<CreateBiodata />} />
                   <Route path="edit/:id" element={<EditBiodata />} />
                   <Route path="my-biodatas" element={<MyBiodatas />} />
                   <Route path="biodata/:id" element={<ViewBiodata />} />
                   <Route path="settings" element={<Settings />} />
                   <Route path="premium" element={<PremiumPlans />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
