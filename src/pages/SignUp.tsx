
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Upload } from "lucide-react";
import XpressLogo from "@/components/XpressLogo";

interface SignUpData {
  step: number;
  // Step 1
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessCategory: string;
  accountNo: string;
  logo: File | null;
  // Step 2
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpData>({
    step: 1,
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessCategory: "",
    accountNo: "",
    logo: null,
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Maximum upload size is 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setFormData((prev) => ({ ...prev, logo: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    // Validate step 1
    if (formData.step === 1) {
      if (!formData.businessName || !formData.businessEmail || !formData.businessPhone || 
          !formData.businessCategory || !formData.accountNo) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    
    setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate step 2
    if (!formData.houseNumber || !formData.street || !formData.city || !formData.state ||
        !formData.contactName || !formData.contactPhone || !formData.contactEmail ||
        !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration successful",
        description: "Your registration is awaiting approval",
      });
      
      navigate("/pending");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
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
            <span className="text-sm text-gray-600">Already have an account?</span>
            <button 
              onClick={() => navigate("/signin")}
              className="text-xpress-blue font-medium hover:underline text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl form-card bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome to Xpress Rewards</h1>
            <p className="text-gray-600 mt-2">Complete the form below to get started</p>
          </div>

          <form onSubmit={formData.step === 2 ? handleSubmit : nextStep} className="space-y-6">
            {formData.step === 1 && (
              <>
                <h2 className="text-xl font-medium text-xpress-blue">Business Information</h2>
                
                <div className="space-y-2">
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700">
                    Business Email Address
                  </label>
                  <input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700">
                    Business Phone Number
                  </label>
                  <input
                    id="businessPhone"
                    name="businessPhone"
                    type="text"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700">
                    Business Category
                  </label>
                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition appearance-none"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="retail">Retail</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="accountNo" className="block text-sm font-medium text-gray-700">
                    Account No
                  </label>
                  <input
                    id="accountNo"
                    name="accountNo"
                    type="text"
                    value={formData.accountNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image (Logo)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    {logoPreview ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="h-32 object-contain mb-2" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLogoPreview(null);
                            setFormData(prev => ({ ...prev, logo: null }));
                          }}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-xpress-blue" />
                        <p className="mt-2 text-sm text-gray-600">Drag here or click the button below to upload</p>
                        <label 
                          htmlFor="logo-upload" 
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-xpress-blue hover:bg-blue-600 focus:outline-none cursor-pointer"
                        >
                          Choose file
                        </label>
                        <input 
                          id="logo-upload" 
                          name="logo" 
                          type="file" 
                          onChange={handleFileChange}
                          accept="image/*" 
                          className="sr-only" 
                        />
                        <p className="mt-2 text-xs text-gray-500">Maximum upload size: 10MB (.jpg)</p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {formData.step === 2 && (
              <>
                <h2 className="text-xl font-medium text-xpress-blue">Business Address</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                      House Number
                    </label>
                    <input
                      id="houseNumber"
                      name="houseNumber"
                      type="text"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition appearance-none"
                    >
                      <option value="" disabled>Select a state</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="rivers">Rivers</option>
                      <option value="kano">Kano</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <h2 className="text-xl font-medium text-xpress-blue pt-4">Contact Person Information</h2>
                
                <div className="space-y-2">
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                    Contact Name
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Contact Phone Number
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="text"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                    Contact Email Address
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                  />
                </div>

                <h2 className="text-xl font-medium text-xpress-blue pt-4">Password</h2>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent input-transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between items-center">
              {formData.step === 1 ? (
                <div className="text-gray-500 text-sm">Step 1 of 2</div>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              <button
                type={formData.step === 2 ? "submit" : "button"}
                disabled={isLoading}
                className="px-8 py-2 bg-xpress-blue text-white rounded-md font-medium button-transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formData.step === 1 ? "Next" : isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
