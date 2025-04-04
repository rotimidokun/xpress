import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-xpress-blue">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <button
          onClick={() => navigate("/signin")}
          className="px-6 py-2 bg-xpress-blue text-white rounded-md font-medium button-transition"
        >
          Return to Sign In
        </button>
      </div>
    </div>
  );
};

export default NotFound;
