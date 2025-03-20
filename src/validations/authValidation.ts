import * as yup from "yup";

// Nigerian phone regex pattern
const phoneRegex = /^(?:\+234|0)[789]\d{9}$/;

export const step1Schema = yup.object({
  businessName: yup.string().required("Business name is required"),
  businessEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Business email is required"),
  businessPhone: yup
    .string()
    .matches(phoneRegex, "Please enter a valid Nigerian phone number")
    .required("Business phone is required"),
  businessCategory: yup.string().required("Please select a business category"),
  accountNo: yup.string().required("Account number is required"),
  logo: yup.mixed().required("Business logo is required"),
});

export const step2Schema = yup.object({
  houseNumber: yup.string().required("House number is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("Please select a state"),
  contactName: yup.string().required("Contact name is required"),
  contactPhone: yup
    .string()
    .matches(phoneRegex, "Please enter a valid Nigerian phone number")
    .required("Contact phone is required"),
  contactEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Contact email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});
