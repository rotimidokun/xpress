
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import XpressLogo from "@/components/XpressLogo";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to session storage
      sessionStorage.setItem("userLoggedIn", "true");
      
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <header className="py-5 px-8 sm:px-16">
        <div className="container mx-auto flex justify-between items-center">
          <XpressLogo />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">New to Xpress Rewards?</span>
            <button 
              onClick={() => navigate("/signup")}
              className="text-xpress-blue font-medium hover:underline text-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md form-card bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600 mt-2">Sign in to your Xpress reward partner's dashboard</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-600">Forgot Password?</span>{" "}
                <button 
                  type="button"
                  className="text-xpress-blue font-medium hover:underline"
                  onClick={() => toast({
                    title: "Password Reset",
                    description: "Password reset functionality would be implemented here.",
                  })}
                >
                  Reset it
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-xpress-blue text-white py-2 rounded-md font-medium button-transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
