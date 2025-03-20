import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface VerifierFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const VerifierFilter = ({ value, onChange }: VerifierFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDisplayText = () => {
    switch (value) {
      case "all":
        return "All";
      case "active":
        return "Active Verifiers";
      case "awaiting":
        return "Pending Verifiers";
      case "deactivated":
        return "Deactivated Verifiers";
      default:
        return "All";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-56 flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-xpress-blue text-left"
      >
        <span>{getDisplayText()}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg dropdown-animation">
          <div className="py-1">
            <button
              onClick={() => {
                onChange("all");
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm ${
                value === "all" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                onChange("active");
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm ${
                value === "active"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              Active Verifiers
            </button>
            <button
              onClick={() => {
                onChange("awaiting");
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm ${
                value === "awaiting"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              Pending Verifiers
            </button>
            <button
              onClick={() => {
                onChange("deactivated");
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm ${
                value === "deactivated"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              Deactivated Verifiers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifierFilter;
