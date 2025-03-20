
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import XpressLogo from "@/components/XpressLogo";
import { loginUser } from "@/services/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const signInSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type SignInFormData = yup.InferType<typeof signInSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      
      // Attempt login
      const success = loginUser(data.email, data.password);
      
      if (success) {
        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
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
              className="text-xpress-blue font-medium hover:underline text-sm border border-xpress-blue rounded-md px-3 py-1"
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-xpress-blue text-white py-2 rounded-md font-medium button-transition"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
