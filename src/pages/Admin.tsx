import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Netlify CMS admin panel
    window.location.href = "/admin/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Admin Panel...</h1>
        <p className="text-muted-foreground mb-4">
          If you're not redirected automatically, click the button below.
        </p>
        <button 
          onClick={() => window.location.href = "/admin/"}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to Admin Panel
        </button>
      </div>
    </div>
  );
};

export default Admin; 