
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (username: string) => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      // Simulate authentication
      onLogin(credentials.username);
      toast({
        title: "Login Successful",
        description: "Welcome to MedFlow Dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both username and password",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto medical-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-blue-600">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your MedFlow account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            onClick={onSwitchToSignup}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
