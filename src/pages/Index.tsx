
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import BookAppointment from '@/components/appointments/BookAppointment';
import PatientList from '@/components/patients/PatientList';
import AIPrescription from '@/components/ai/AIPrescription';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctorName, setDoctorName] = useState('');

  const handleLogin = (username: string) => {
    setDoctorName(username);
    setIsAuthenticated(true);
  };

  const handleSignup = (username: string) => {
    setDoctorName(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDoctorName('');
    setActiveTab('dashboard');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard doctorName={doctorName} />;
      case 'appointments':
        return <BookAppointment />;
      case 'patients':
        return <PatientList />;
      case 'ai-prescription':
        return <AIPrescription />;
      default:
        return <Dashboard doctorName={doctorName} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">MedFlow Dashboard</h1>
            <p className="text-gray-600">Professional Medical Practice Management</p>
          </div>
          
          {isLogin ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToSignup={() => setIsLogin(false)}
            />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        doctorName={doctorName}
      />
      <main className="flex-1 overflow-auto">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Index;
