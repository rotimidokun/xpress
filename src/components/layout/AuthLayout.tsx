import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import XpressLogo from "@/components/XpressLogo";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  alternateActionText: string;
  alternateActionLabel: string;
  alternateActionPath: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  alternateActionText,
  alternateActionLabel,
  alternateActionPath,
}: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <header className="py-5 px-8 sm:px-16">
        <div className="container mx-auto flex justify-between items-center">
          <XpressLogo />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-xpress-gray">
              {alternateActionText}
            </span>
            <button
              onClick={() => navigate(alternateActionPath)}
              className="text-xpress-blue font-medium hover:underline text-sm border border-xpress-blue rounded-sm px-3 py-2"
            >
              {alternateActionLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl form-card bg-white rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-xpress-blue">{title}</h1>
            <p className="text-xpress-gray mt-2 mb-4 text-xs">{subtitle}</p>
            <div className="h-0.5 bg-[#F5F6F8]" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
