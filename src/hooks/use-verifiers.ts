import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Verifier } from "@/components/dashboard/VerifiersTable";

// Mock data
const mockVerifiers: Verifier[] = Array.from({ length: 11 }, (_, index) => ({
  id: `verifier-${index + 1}`,
  firstName: "Temitope",
  lastName: "Adejumoke",
  phoneNumber: "+234800 000 0000",
  partner: "The Place",
  location: "Festac",
  status:
    index % 3 === 0 ? "active" : index % 3 === 1 ? "awaiting" : "deactivated",
}));

interface UseVerifiersOptions {
  initialPage?: number;
  initialRowsPerPage?: number;
  initialStatusFilter?: string;
}

export function useVerifiers({
  initialPage = 1,
  initialRowsPerPage = 10,
  initialStatusFilter = "all",
}: UseVerifiersOptions = {}) {
  const [verifiers, setVerifiers] = useState<Verifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  const { toast } = useToast();

  // Fetch verifiers with mock API
  const fetchVerifiers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTotalCount(mockVerifiers.length);

      // Apply filters to mock data
      let filteredData = [...mockVerifiers];

      // Apply status filter
      if (statusFilter !== "all") {
        filteredData = filteredData.filter((v) => v.status === statusFilter);
      }

      // Apply search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredData = filteredData.filter(
          (v) =>
            v.firstName.toLowerCase().includes(query) ||
            v.lastName.toLowerCase().includes(query) ||
            v.phoneNumber.includes(query) ||
            v.location.toLowerCase().includes(query)
        );
      }

      setFilteredCount(filteredData.length);
      setTotalPages(Math.ceil(filteredData.length / rowsPerPage));

      // Apply pagination
      const startIndex = (currentPage - 1) * rowsPerPage;
      const paginatedData = filteredData.slice(
        startIndex,
        startIndex + rowsPerPage
      );

      setVerifiers(paginatedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch verifiers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentPage, rowsPerPage, statusFilter, toast]);

  useEffect(() => {
    fetchVerifiers();
  }, [fetchVerifiers]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(verifiers.map((v) => v.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleRowAction = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "This feature is coming soon. Stay tuned for updates!",
    });
  };

  return {
    verifiers,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    statusFilter,
    setStatusFilter,
    selectedRows,
    totalCount,
    filteredCount,
    handleSelectAll,
    handleSelectRow,
    handleRowAction,
    refreshVerifiers: fetchVerifiers,
  };
}
