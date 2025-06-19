
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  doctorName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ doctorName }) => {
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dashboardStats = [
    {
      title: "Today's Appointments",
      value: "8",
      description: "3 pending confirmations",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Patients",
      value: "247",
      description: "15 new this week",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Pending Reviews",
      value: "5",
      description: "Medical reports awaiting",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Urgent Cases",
      value: "2",
      description: "Require immediate attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const upcomingAppointments = [
    { time: "09:00 AM", patient: "John Smith", reason: "Routine Checkup", status: "confirmed" },
    { time: "10:30 AM", patient: "Maria Garcia", reason: "Follow-up", status: "pending" },
    { time: "02:00 PM", patient: "David Johnson", reason: "Consultation", status: "confirmed" },
    { time: "03:30 PM", patient: "Sarah Wilson", reason: "Diagnosis Review", status: "confirmed" },
  ];

  const notifications = [
    { type: "new", message: "New patient registration: Emily Brown", time: "5 minutes ago" },
    { type: "reminder", message: "Lab results ready for John Smith", time: "15 minutes ago" },
    { type: "appointment", message: "Appointment rescheduled by Maria Garcia", time: "1 hour ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. {doctorName}!</h1>
        <p className="text-gray-600">{todayDate}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="medical-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Today's Schedule</CardTitle>
            <CardDescription>Your upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-blue-600 min-w-[70px]">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Recent Notifications</CardTitle>
            <CardDescription>Stay updated with important alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'new' ? 'bg-blue-500' :
                    notification.type === 'reminder' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
