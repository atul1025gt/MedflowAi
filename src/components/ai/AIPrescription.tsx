
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Loader2, Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AIPrescription: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    weight: '',
    allergies: ''
  });
  const [apiKey, setApiKey] = useState('');
  const [prescription, setPrescription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePrescription = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the patient's symptoms",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google Gemini API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Construct the prompt for the AI
      const prompt = `Act as a medical assistant. Given the following patient information and symptoms, provide a structured medical assessment:

Patient Information:
- Name: ${patientInfo.name || 'Not provided'}
- Age: ${patientInfo.age || 'Not provided'}
- Weight: ${patientInfo.weight || 'Not provided'}
- Known Allergies: ${patientInfo.allergies || 'None mentioned'}

Symptoms: ${symptoms}

Please provide a structured response with:
1. Possible Diagnosis (with confidence level)
2. Recommended Medications (name, dosage, frequency, duration)
3. Additional Advice and Precautions
4. When to seek immediate medical attention
5. Follow-up recommendations

Important: This is for educational/assistance purposes only and should not replace professional medical judgment.`;

      // Mock API call to Google Gemini (replace with actual API call)
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate prescription');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      // Parse the response into structured format
      const structuredPrescription = {
        patientName: patientInfo.name || 'Patient',
        symptoms: symptoms,
        generatedAt: new Date().toLocaleString(),
        content: generatedText,
        doctor: 'AI Assistant (Review Required)'
      };

      setPrescription(structuredPrescription);
      
      toast({
        title: "Prescription Generated",
        description: "AI prescription has been generated successfully. Please review carefully.",
      });

    } catch (error) {
      console.error('Error generating prescription:', error);
      
      // Fallback mock response for demonstration
      const mockPrescription = {
        patientName: patientInfo.name || 'Patient',
        symptoms: symptoms,
        generatedAt: new Date().toLocaleString(),
        content: `**POSSIBLE DIAGNOSIS:**
Based on the symptoms "${symptoms}", possible conditions may include:
- Viral upper respiratory infection (Common cold) - High confidence
- Allergic rhinitis - Moderate confidence

**RECOMMENDED MEDICATIONS:**
1. Paracetamol 500mg
   - Dosage: 1-2 tablets every 6-8 hours
   - Duration: 3-5 days
   - For fever and body ache

2. Cetirizine 10mg
   - Dosage: 1 tablet once daily
   - Duration: 5-7 days
   - For allergic symptoms

**ADDITIONAL ADVICE:**
- Get adequate rest (7-8 hours of sleep)
- Increase fluid intake (8-10 glasses of water daily)
- Use warm salt water gargles for throat irritation
- Avoid cold foods and beverages

**PRECAUTIONS:**
- Monitor temperature regularly
- Avoid contact with others to prevent spread
- Do not exceed recommended medication dosages

**SEEK IMMEDIATE MEDICAL ATTENTION IF:**
- Fever exceeds 102°F (39°C)
- Difficulty breathing or chest pain
- Symptoms worsen after 3-4 days
- Severe headache or neck stiffness

**FOLLOW-UP:**
- Revisit if symptoms persist beyond 7 days
- Return for evaluation if new symptoms develop

*Note: This AI-generated prescription is for reference only. Please review and verify all recommendations before prescribing.*`,
        doctor: 'AI Assistant (Review Required)'
      };

      setPrescription(mockPrescription);
      
      toast({
        title: "Demo Prescription Generated",
        description: "Using demo data since API key may be invalid. Please review carefully.",
        variant: "default",
      });
    }

    setIsLoading(false);
  };

  const copyToClipboard = () => {
    if (prescription) {
      navigator.clipboard.writeText(prescription.content);
      toast({
        title: "Copied to Clipboard",
        description: "Prescription content has been copied",
      });
    }
  };

  const downloadPrescription = () => {
    if (prescription) {
      const element = document.createElement('a');
      const file = new Blob([prescription.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `prescription_${prescription.patientName}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Download Started",
        description: "Prescription has been downloaded",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Prescription Generator</h1>
        <p className="text-gray-600 mt-2">Generate AI-powered medical recommendations based on symptoms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-600 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Patient Information & Symptoms
            </CardTitle>
            <CardDescription>Enter patient details and symptoms for AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  placeholder="Patient's full name"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Patient's age"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  placeholder="Patient's weight"
                  value={patientInfo.weight}
                  onChange={(e) => setPatientInfo({ ...patientInfo, weight: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="Any known allergies"
                  value={patientInfo.allergies}
                  onChange={(e) => setPatientInfo({ ...patientInfo, allergies: e.target.value })}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">Google Gemini API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Google Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-500">
                Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Patient Symptoms *</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe the patient's symptoms in detail (e.g., fever, body ache, cough, headache, duration, severity, etc.)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="border-blue-200 focus:border-blue-400 min-h-[120px]"
              />
            </div>

            <Button
              onClick={generatePrescription}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Prescription...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate AI Prescription
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Prescription */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-600">Generated Prescription</CardTitle>
            <CardDescription>AI-generated medical recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {prescription ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{prescription.patientName}</h3>
                      <p className="text-sm text-gray-600">Generated: {prescription.generatedAt}</p>
                      <p className="text-sm text-gray-600">By: {prescription.doctor}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyToClipboard}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={downloadPrescription}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Symptoms Analyzed:</h4>
                  <p className="text-gray-700 mb-4">{prescription.symptoms}</p>
                  
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                      {prescription.content}
                    </pre>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> This AI-generated prescription is for reference only. 
                    Please review, verify, and modify as necessary based on your professional medical judgment 
                    before prescribing to patients.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No prescription generated yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Enter patient symptoms and click "Generate AI Prescription" to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIPrescription;
