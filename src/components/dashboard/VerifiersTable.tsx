import { MoreIconHorizontal } from "@/assets";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";

export interface Verifier {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  partner: string;
  location: string;
  status: "active" | "awaiting" | "deactivated";
}

interface VerifiersTableProps {
  verifiers: Verifier[];
  isLoading: boolean;
  selectedRows: string[];
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  onRowAction: (id: string) => void;
}

export function VerifiersTable({
  verifiers,
  isLoading,
  selectedRows,
  onSelectAll,
  onSelectRow,
  onRowAction,
}: VerifiersTableProps) {
  const { toast } = useToast();

  return (
    <div className="overflow-hidden w-full bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[500px] w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  onChange={onSelectAll}
                  checked={
                    selectedRows.length === verifiers.length &&
                    verifiers.length > 0
                  }
                  className="rounded border-gray-300 text-xpress-blue focus:ring-xpress-blue"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                First Name
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                Last Name
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                Phone Number
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                Partner
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                Location
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-bold text-xpress-label-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <TableLoadingSkeleton />
            ) : verifiers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No verifiers found matching your criteria
                </td>
              </tr>
            ) : (
              verifiers.map((verifier) => (
                <tr key={verifier.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(verifier.id)}
                      onChange={() => onSelectRow(verifier.id)}
                      className="rounded border-gray-300 text-xpress-blue focus:ring-xpress-blue"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {verifier.firstName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {verifier.lastName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {verifier.phoneNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {verifier.partner}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {verifier.location}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={verifier.status} />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => onRowAction(verifier.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreIconHorizontal />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableLoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="animate-pulse">
          <td className="px-4 py-4">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-8 bg-gray-200 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
}
