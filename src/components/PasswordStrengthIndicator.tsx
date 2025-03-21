import { Check } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#]/.test(password);
  const hasMinLength = password.length >= 8;

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1 text-sm">
      <StrengthItem isValid={hasLowercase} text="Lowercase" />
      <StrengthItem isValid={hasUppercase} text="Uppercase" />
      <StrengthItem isValid={hasNumber} text="Number" />
      <StrengthItem isValid={hasSpecial} text="Special character" />
      <StrengthItem isValid={hasMinLength} text="8+ characters" />
    </div>
  );
}

interface StrengthItemProps {
  isValid: boolean;
  text: string;
}

function StrengthItem({ isValid, text }: StrengthItemProps) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`inline-flex items-center ${
          isValid ? "text-green-600" : "text-gray-500"
        }`}
      >
        {isValid ? (
          <Check className="h-3 w-3" />
        ) : (
          <span className="h-3 w-3 rounded-full border border-gray-400" />
        )}
        <span className="ml-1">{text}</span>
      </span>
    </div>
  );
}
