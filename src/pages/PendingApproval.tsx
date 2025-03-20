
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-xpress-orange" />
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-xpress-orange mb-6">Pending</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          Your registration is awaiting approval from our partnership team
        </p>
        
        <button
          onClick={() => navigate("/signin")}
          className="w-full py-3 bg-xpress-blue text-white rounded-md font-medium button-transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
