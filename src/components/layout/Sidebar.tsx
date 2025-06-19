
import React from 'react';
import { Home, Calendar, Users, Brain, LogOut, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  doctorName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout, doctorName }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Book Appointment', icon: Calendar },
    { id: 'patients', label: 'View Patients', icon: Users },
    { id: 'ai-prescription', label: 'AI Prescription', icon: Brain },
  ];

  return (
    <div className="w-64 bg-white border-r border-blue-100 h-screen flex flex-col shadow-sm">
      <div className="p-6 border-b border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600">MedFlow</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-blue-100">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800">Welcome back,</p>
          <p className="text-lg font-bold text-blue-900">{doctorName}</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start hover-lift ${
                    activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => onTabChange(item.id)}
                >
                  <IconComponent className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
