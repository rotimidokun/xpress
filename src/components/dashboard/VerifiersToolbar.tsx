import { Plus, Search } from "lucide-react";
import VerifierFilter from "@/components/VerifierFilter";

interface VerifiersToolbarProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddVerifier: () => void;
}

export function VerifiersToolbar({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  onAddVerifier,
}: VerifiersToolbarProps) {
  return (
    <div className="py-4 md:py-6 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row md:justify-between w-full space-y-3 md:space-y-0 md:space-x-3">
          <VerifierFilter
            value={statusFilter}
            onChange={onStatusFilterChange}
          />

          <div className="flex gap-x-4 justify-between">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Name/Phone no / Location"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="text-xs pl-9 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <button
              onClick={onAddVerifier}
              className="flex items-center justify-center px-4 py-2 bg-xpress-blue text-white rounded-sm hover:bg-blue-600 button-transition"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span>Add New Verifier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
