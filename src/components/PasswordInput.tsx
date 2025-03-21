import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface PasswordInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

export function PasswordInput({
  control,
  name,
  label,
  placeholder = "Enter your password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="!text-xpress-label-black font-medium">
            {label}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                className="rounded-sm"
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" color="#606060" />
              ) : (
                <Eye className="h-5 w-5" color="#606060" />
              )}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
