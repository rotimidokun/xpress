import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/services/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "@/components/ui/form";
import RegistrationSuccessModal from "@/components/RegistrationSuccessModal";
import { step1Schema, step2Schema } from "@/validations/authValidation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { BusinessInfoStep } from "@/components/auth/BusinessInfoStep";
import { ContactInfoStep } from "@/components/auth/ContactInfoStep";

// Merge schemas for both steps
const fullFormSchema = step1Schema.concat(step2Schema);

type FormData = yup.InferType<typeof fullFormSchema>;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const nextStep = async () => {
    const result = await form.trigger([
      "businessName",
      "businessEmail",
      "businessPhone",
      "businessCategory",
      "accountNo",
      "logo",
    ]);

    if (result) {
      // Pre-fill contact information from business information
      const businessName = form.getValues("businessName");
      const businessPhone = form.getValues("businessPhone");
      const businessEmail = form.getValues("businessEmail");

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
    <AuthLayout
      title="Welcome to Xpress Rewards"
      subtitle="Complete the form below to get started"
      alternateActionText="Already have an account?"
      alternateActionLabel="Sign In"
      alternateActionPath="/signin"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 ? (
            <BusinessInfoStep
              control={form.control}
              onNext={nextStep}
              logoPreview={logoPreview}
              setLogoPreview={setLogoPreview}
              setLogoFile={setLogoFile}
            />
          ) : (
            <ContactInfoStep
              control={form.control}
              onPrevious={prevStep}
              isLoading={isLoading}
              password={password}
            />
          )}
        </form>
      </Form>

      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/signin");
        }}
      />
    </AuthLayout>
  );
};

export default SignUp;
