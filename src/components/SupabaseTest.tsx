import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupabaseTest() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, message]);
  };

  const runTests = async () => {
    setLoading(true);
    setResults([]);
    
    // Test 1: Basic connection
    try {
      addResult("✅ Testing Supabase connection...");
      const { data, error } = await supabase.from('posts').select('count', { count: 'exact', head: true });
      if (error) {
        addResult(`❌ Connection test failed: ${error.message}`);
      } else {
        addResult(`✅ Connection successful! Posts table accessible.`);
      }
    } catch (err: any) {
      addResult(`❌ Connection error: ${err.message}`);
    }

    // Test 2: Auth configuration
    try {
      addResult("✅ Testing auth configuration...");
      const { data: { session } } = await supabase.auth.getSession();
      addResult(`✅ Auth service accessible. Current session: ${session ? 'Active' : 'None'}`);
    } catch (err: any) {
      addResult(`❌ Auth configuration error: ${err.message}`);
    }

    // Test 3: Try to get user (should fail gracefully)
    try {
      addResult("✅ Testing user retrieval...");
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        addResult(`ℹ️ No user logged in (expected): ${error.message}`);
      } else {
        addResult(`✅ User service working. Current user: ${user ? user.email : 'None'}`);
      }
    } catch (err: any) {
      addResult(`❌ User retrieval error: ${err.message}`);
    }

    // Test 4: Test sign up capability (without actually creating user)
    try {
      addResult("✅ Testing auth providers...");
      // This should give us info about what auth methods are available
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@nonexistent.com',
        password: 'test123'
      });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          addResult(`✅ Email auth is working (got expected 'invalid credentials' error)`);
        } else if (error.message.includes('Database error')) {
          addResult(`❌ Database error suggests auth setup issue: ${error.message}`);
        } else {
          addResult(`ℹ️ Auth response: ${error.message}`);
        }
      } else {
        addResult(`⚠️ Unexpected success with test credentials`);
      }
    } catch (err: any) {
      addResult(`❌ Auth provider test error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Supabase Diagnostic Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={runTests} disabled={loading} className="mb-4">
          {loading ? "Running Tests..." : "Run Diagnostic Tests"}
        </Button>
        
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="text-sm font-mono p-2 bg-muted rounded">
              {result}
            </div>
          ))}
        </div>
        
        {results.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <ul className="text-sm space-y-1">
              <li>• If you see "Database error", check Supabase Auth settings</li>
              <li>• Go to Authentication → Settings in your Supabase dashboard</li>
              <li>• Ensure Email provider is enabled</li>
              <li>• Turn OFF email confirmations</li>
              <li>• Add your site URLs to redirect URLs</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 