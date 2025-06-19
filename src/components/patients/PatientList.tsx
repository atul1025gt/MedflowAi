
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Calendar, Phone, Mail } from 'lucide-react';

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-25",
      condition: "Hypertension",
      status: "Active",
      medicalHistory: [
        { date: "2024-01-15", diagnosis: "Hypertension", treatment: "Lisinopril 10mg daily", notes: "Blood pressure stable" },
        { date: "2023-12-10", diagnosis: "Annual Checkup", treatment: "Routine examination", notes: "All vitals normal" },
        { date: "2023-09-20", diagnosis: "Flu", treatment: "Rest and fluids", notes: "Recovered completely" }
      ]
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 987-6543",
      email: "maria.garcia@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-30",
      condition: "Diabetes Type 2",
      status: "Active",
      medicalHistory: [
        { date: "2024-01-10", diagnosis: "Diabetes Follow-up", treatment: "Metformin 500mg twice daily", notes: "HbA1c improved to 7.2%" },
        { date: "2023-11-15", diagnosis: "Diabetes Management", treatment: "Diet counseling", notes: "Good adherence to meal plan" }
      ]
    },
    {
      id: 3,
      name: "David Johnson",
      age: 28,
      gender: "Male",
      phone: "+1 (555) 456-7890",
      email: "david.johnson@email.com",
      lastVisit: "2024-01-08",
      nextAppointment: null,
      condition: "Healthy",
      status: "Active",
      medicalHistory: [
        { date: "2024-01-08", diagnosis: "Sports Physical", treatment: "Cleared for activities", notes: "Excellent physical condition" }
      ]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      age: 55,
      gender: "Female",
      phone: "+1 (555) 321-0987",
      email: "sarah.wilson@email.com",
      lastVisit: "2023-12-20",
      nextAppointment: "2024-02-01",
      condition: "Arthritis",
      status: "Active",
      medicalHistory: [
        { date: "2023-12-20", diagnosis: "Rheumatoid Arthritis", treatment: "Methotrexate 15mg weekly", notes: "Joint pain reduced significantly" },
        { date: "2023-10-15", diagnosis: "Arthritis Flare", treatment: "Prednisone short course", notes: "Inflammation controlled" }
      ]
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const PatientDetailModal = ({ patient, onClose }: { patient: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-600">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <span className="text-sm font-bold text-gray-900">{patient.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Age:</span>
                  <span className="text-sm text-gray-900">{patient.age} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Gender:</span>
                  <span className="text-sm text-gray-900">{patient.gender}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{patient.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="text-sm text-gray-900">{patient.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">{patient.status}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-600">Medical Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Current Condition:</span>
                  <span className="text-sm font-bold text-gray-900">{patient.condition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Last Visit:</span>
                  <span className="text-sm text-gray-900">{patient.lastVisit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Next Appointment:</span>
                  <span className="text-sm text-gray-900">{patient.nextAppointment || 'Not scheduled'}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-600">Medical History</CardTitle>
              <CardDescription>Complete treatment history and notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medicalHistory.map((record: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4 py-3 bg-blue-50 rounded-r-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{record.diagnosis}</h4>
                      <span className="text-sm text-blue-600 font-medium">{record.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1"><strong>Treatment:</strong> {record.treatment}</p>
                    <p className="text-sm text-gray-600"><strong>Notes:</strong> {record.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
        <p className="text-gray-600 mt-2">Manage and view patient information</p>
      </div>

      <Card className="medical-card mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-400"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="medical-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-900">{patient.name}</CardTitle>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {patient.status}
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-600">
                {patient.age} years • {patient.gender}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {patient.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last visit: {patient.lastVisit}
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Condition:</span>
                  <span className="text-sm font-bold text-blue-600">{patient.condition}</span>
                </div>
              </div>

              <Button
                onClick={() => setSelectedPatient(patient)}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No patients found matching your search.</p>
        </div>
      )}

      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientList;
