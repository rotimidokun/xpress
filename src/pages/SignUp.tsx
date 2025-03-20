import { useState, useEffect, useRef, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Check } from "lucide-react";
import XpressLogo from "@/components/XpressLogo";
import { registerUser } from "@/services/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RegistrationSuccessModal from "@/components/RegistrationSuccessModal";
import { step1Schema, step2Schema } from "@/validations/authValidation";
import { Separator } from "@/components/ui/separator";
import { PaperClipIcon, UploadIcon } from "@/assets";

// Merge schemas for both steps
const fullFormSchema = step1Schema.concat(step2Schema);

type FormData = yup.InferType<typeof fullFormSchema>;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  // Password validation states
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Use the appropriate schema based on the current step
  const currentSchema = step === 1 ? step1Schema : fullFormSchema;

  const form = useForm<FormData>({
    resolver: yupResolver(currentSchema),
    mode: "onChange",
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      businessCategory: "",
      accountNo: "",
      logo: undefined,
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch the password field to provide live feedback
  const password = form.watch("password");

  // Update validation states whenever password changes
  useEffect(() => {
    if (password) {
      setHasLowercase(/[a-z]/.test(password));
      setHasUppercase(/[A-Z]/.test(password));
      setHasNumber(/\d/.test(password));
      setHasSpecial(/[@$!%*?&#]/.test(password));
      setHasMinLength(password.length >= 8);
    } else {
      setHasLowercase(false);
      setHasUppercase(false);
      setHasNumber(false);
      setHasSpecial(false);
      setHasMinLength(false);
    }
  }, [password]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "File too large",
          description: "Maximum upload size is 10MB",
          variant: "destructive",
        });
        return;
      }

      setLogoFile(file);
      form.setValue("logo", file, { shouldValidate: true });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set isDragging to false if we're leaving the drop area itself
    // not when leaving its children
    if (e.currentTarget === dropAreaRef.current) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      // Reuse your existing file validation logic
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "File too large",
          description: "Maximum upload size is 10MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      setLogoFile(file);
      form.setValue("logo", file, { shouldValidate: true });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = async () => {
    // Validate only the fields for step 1
    const result = await form.trigger([
      "businessName",
      "businessEmail",
      "businessPhone",
      "businessCategory",
      "accountNo",
      "logo",
    ]);

    if (result) {
      console.log("All form values before setting:", form.getValues());

      // Pre-fill contact information from business information
      const businessName = form.getValues("businessName");
      console.log("🚀 ~ nextStep ~ businessName:", businessName);
      const businessPhone = form.getValues("businessPhone");
      console.log("🚀 ~ nextStep ~ businessPhone:", businessPhone);
      const businessEmail = form.getValues("businessEmail");
      console.log("🚀 ~ nextStep ~ businessEmail:", businessEmail);
      const accountNo = form.getValues("accountNo");
      console.log("🚀 ~ nextStep ~ accountNo:", accountNo);

      form.setValue("contactName", businessName);
      form.setValue("contactPhone", businessPhone);
      form.setValue("contactEmail", businessEmail);

      setStep(2);
    } else {
      toast({
        title: "Missing Information",
        description: "Please complete all fields in the form",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Register user
      const success = registerUser({
        businessName: data.businessName,
        businessEmail: data.businessEmail,
        businessPhone: data.businessPhone,
        businessCategory: data.businessCategory,
        accountNo: data.accountNo,
        logo: logoPreview,
        houseNumber: data.houseNumber,
        street: data.street,
        city: data.city,
        state: data.state,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        password: data.password,
      });

      if (success) {
        toast({
          title: "Registration successful",
          description: "Your registration is awaiting approval",
          variant: "success",
        });

        setShowSuccessModal(true);
      } else {
        toast({
          title: "Registration Unsuccessful",
          description: "An account with this email already exists",
          variant: "destructive",
        });
      }
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
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <button
              onClick={() => navigate("/signin")}
              className="text-xpress-blue font-medium hover:underline text-sm border border-xpress-blue rounded-sm px-3 py-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl form-card bg-white rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-xpress-blue">
              Welcome to Xpress Rewards
            </h1>
            <p className="text-xpress-gray mt-2 mb-4 text-xs ">
              Complete the form below to get started
            </p>

            <Separator />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {step === 1 ? (
                <>
                  <h2 className="text-sm font-medium text-xpress-blue pb-4">
                    Business Information
                  </h2>

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Business name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm"
                              placeholder="Enter business name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Business Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm"
                              placeholder="Enter business email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Business Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm"
                              placeholder="e.g. 08012345678"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Business Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-sm">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="hospitality">
                                Hospitality
                              </SelectItem>
                              <SelectItem value="technology">
                                Technology
                              </SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Account No
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm"
                              placeholder="Enter account number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Image (Logo)
                      </label>
                      <div
                        ref={dropAreaRef}
                        className={`border border-dashed border-[#ABA7AF] rounded-md p-4 text-center transition-colors ${
                          isDragging
                            ? "border-xpress-blue bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
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
                                setLogoFile(null);
                              }}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <UploadIcon className="mx-auto h-12 w-12 " />
                            <p className="mt-2 text-xs font-normal text-xpress-gray">
                              {isDragging
                                ? "Drop your file here"
                                : "Drag here or click the button below to upload"}
                            </p>
                            <label
                              htmlFor="logo-upload"
                              className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-normal rounded-md shadow-sm text-white bg-xpress-blue hover:bg-blue-600 focus:outline-none cursor-pointer"
                            >
                              <PaperClipIcon className="mr-2" /> Choose file
                            </label>
                            <input
                              id="logo-upload"
                              name="logo"
                              type="file"
                              onChange={handleFileChange}
                              accept="image/*"
                              className="sr-only"
                            />
                            <p className="mt-2 text-sm text-xpress-gray">
                              Maximum upload size: 10MB (.jpg)
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-x-4 items-center">
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="px-10 py-2 bg-xpress-blue text-white rounded-sm text-sm font-medium button-transition"
                      >
                        Next
                      </Button>
                      <div className="text-xpress-gray text-sm">
                        Step 1 of 2
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-sm font-medium text-xpress-blue pb-4">
                    Business Address
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-10 gap-4">
                      <FormField
                        control={form.control}
                        name="houseNumber"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel className="!text-xpress-label-black font-medium">
                              House Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded-sm"
                                placeholder="Enter house number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem className="col-span-7">
                            <FormLabel className="!text-xpress-label-black font-medium">
                              Street
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded-sm"
                                placeholder="Enter street"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="!text-xpress-label-black font-medium">
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded-sm"
                                placeholder="Enter city"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="!text-xpress-label-black font-medium">
                              State
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-sm">
                                  <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="lagos">Lagos</SelectItem>
                                <SelectItem value="abuja">Abuja</SelectItem>
                                <SelectItem value="rivers">Rivers</SelectItem>
                                <SelectItem value="kano">Kano</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <h2 className="text-xl font-medium text-xpress-blue pt-4">
                      Contact Person Information
                    </h2>

                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Contact Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm capitalize"
                              placeholder="Enter contact name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Contact Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm"
                              value={field.value}
                              placeholder="e.g. 08012345678"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Contact Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-sm"
                              placeholder="Enter contact email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <h2 className="text-xl font-medium text-xpress-blue pt-4">
                      Password
                    </h2>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Password
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                className="rounded-sm"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...field}
                              />
                            </FormControl>
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

                          {/* Password strength indicators */}
                          {password && (
                            <div className="mt-2 space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <span
                                  className={`inline-flex items-center ${
                                    hasLowercase
                                      ? "text-green-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {hasLowercase ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <span className="h-3 w-3 rounded-full border border-gray-400" />
                                  )}
                                  <span className="ml-1">Lowercase</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`inline-flex items-center ${
                                    hasUppercase
                                      ? "text-green-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {hasUppercase ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <span className="h-3 w-3 rounded-full border border-gray-400" />
                                  )}
                                  <span className="ml-1">Uppercase</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`inline-flex items-center ${
                                    hasNumber
                                      ? "text-green-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {hasNumber ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <span className="h-3 w-3 rounded-full border border-gray-400" />
                                  )}
                                  <span className="ml-1">Number</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`inline-flex items-center ${
                                    hasSpecial
                                      ? "text-green-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {hasSpecial ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <span className="h-3 w-3 rounded-full border border-gray-400" />
                                  )}
                                  <span className="ml-1">
                                    Special character
                                  </span>
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`inline-flex items-center ${
                                    hasMinLength
                                      ? "text-green-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {hasMinLength ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <span className="h-3 w-3 rounded-full border border-gray-400" />
                                  )}
                                  <span className="ml-1">8+ characters</span>
                                </span>
                              </div>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-xpress-label-black font-medium">
                            Confirm Password
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                className="rounded-sm"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between items-center">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="px-4 py-2 text-sm border border-gray-300 rounded-sm hover:bg-gray-50"
                      >
                        Back
                      </Button>

                      <div className="text-gray-500 text-sm mr-auto ml-4">
                        Step 2 of 2
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="px-10 py-2 bg-xpress-blue text-white rounded-sm font-medium button-transition"
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </Form>
        </div>
      </main>

      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/signin");
        }}
      />
    </div>
  );
};

export default SignUp;
