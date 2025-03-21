import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { isLoggedIn } from "@/services/authService";
import { VerifiersToolbar } from "@/components/dashboard/VerifiersToolbar";
import { VerifiersTable } from "@/components/dashboard/VerifiersTable";
import { Pagination } from "@/components/Pagination";
import { useVerifiers } from "@/hooks/use-verifiers";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const {
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
    handleSelectAll,
    handleSelectRow,
    handleRowAction,
  } = useVerifiers();

  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/signin");
      toast({
        title: "Authentication required",
        description: "Please sign in to access the dashboard",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  const handleAddVerifier = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is coming soon. Stay tuned for updates!",
    });
  };

  return (
    <DashboardLayout title="Verifiers" count={totalCount}>
      <VerifiersToolbar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddVerifier={handleAddVerifier}
      />

      <VerifiersTable
        verifiers={verifiers}
        isLoading={isLoading}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onRowAction={handleRowAction}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
