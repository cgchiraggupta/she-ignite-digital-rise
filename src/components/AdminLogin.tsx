import { useState } from "react";
import { signIn } from "@/lib/authService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SupabaseTest from "./SupabaseTest";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      onLogin();
    } catch (err: any) {
      console.error("Login error:", err);
      
      if (err.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please check your credentials and try again.");
      } else if (err.message.includes("Database error")) {
        setError("Authentication service error. Click 'Run Diagnostics' below to troubleshoot.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showDiagnostic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowDiagnostic(false)}>
              ← Back to Login
            </Button>
            <img 
              src="/she-leads-logo.png" 
              alt="SHE Leads India" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <SupabaseTest />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/she-leads-logo.png" 
              alt="SHE Leads India" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-muted-foreground">Access the blog admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDiagnostic(true)}
              className="w-full"
            >
              🔧 Run Diagnostics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 