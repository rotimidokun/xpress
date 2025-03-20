
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MoreHorizontal, Plus, Search, Bell, User as UserIcon, ChevronDown } from "lucide-react";
import XpressLogo from "@/components/XpressLogo";
import StatusBadge from "@/components/StatusBadge";
import VerifierFilter from "@/components/VerifierFilter";
import UserAvatar from "@/components/UserAvatar";

interface Verifier {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  partner: string;
  location: string;
  status: "active" | "awaiting" | "deactivated";
}

const mockVerifiers: Verifier[] = Array.from({ length: 11 }, (_, index) => ({
  id: `verifier-${index + 1}`,
  firstName: "Temitope",
  lastName: "Adejumoke",
  phoneNumber: "+234800 000 0000",
  partner: "The Place",
  location: "Festac",
  status: index % 3 === 0 
    ? "active"
    : index % 3 === 1 
      ? "awaiting" 
      : "deactivated"
}));

const Dashboard = () => {
  const [verifiers, setVerifiers] = useState<Verifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/signin");
      toast({
        title: "Authentication required",
        description: "Please sign in to access the dashboard",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  // Fetch verifiers with mock API
  useEffect(() => {
    const fetchVerifiers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Apply filters to mock data
        let filteredData = [...mockVerifiers];
        
        // Apply status filter
        if (statusFilter !== "all") {
          filteredData = filteredData.filter(v => v.status === statusFilter);
        }
        
        // Apply search
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredData = filteredData.filter(v => 
            v.firstName.toLowerCase().includes(query) ||
            v.lastName.toLowerCase().includes(query) ||
            v.phoneNumber.includes(query) ||
            v.location.toLowerCase().includes(query)
          );
        }
        
        setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
        
        // Apply pagination
        const startIndex = (currentPage - 1) * rowsPerPage;
        const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
        
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
    };
    
    fetchVerifiers();
  }, [searchQuery, currentPage, rowsPerPage, statusFilter, toast]);

  const handleAddVerifier = () => {
    toast({
      title: "Add New Verifier",
      description: "This feature would open a form to add a new verifier."
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(verifiers.map(v => v.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("userLoggedIn");
    navigate("/signin");
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
  };

  const handleRowAction = (id: string) => {
    toast({
      title: "Action Menu",
      description: `Action menu for verifier ${id} would open here.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 md:px-8 py-3">
          <div className="flex items-center space-x-2">
            <XpressLogo className="h-8" />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <UserAvatar />
              
              <button 
                onClick={handleSignOut}
                className="hidden md:flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                <span>Admin User</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-60px)]">
          <nav className="pt-4">
            <ul className="space-y-1">
              <li>
                <a 
                  href="#verifiers" 
                  className="flex items-center px-6 py-3 text-sm font-medium text-xpress-blue bg-blue-50 border-l-4 border-xpress-blue"
                >
                  <span>Verifiers</span>
                </a>
              </li>
              <li>
                <a 
                  href="#deals" 
                  className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span>Deals</span>
                </a>
              </li>
              <li>
                <a 
                  href="#transactions" 
                  className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span>Transactions</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Page Header */}
            <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <h1 className="text-xl font-semibold text-gray-800">Verifiers</h1>
                  <div className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">11</div>
                </div>
                
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name/Phone no / Location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-xpress-blue focus:border-transparent w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <VerifierFilter
                    value={statusFilter}
                    onChange={setStatusFilter}
                  />
                  
                  <button
                    onClick={handleAddVerifier}
                    className="flex items-center justify-center px-4 py-2 bg-xpress-blue text-white rounded-md hover:bg-blue-600 button-transition"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add New Verifier</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 w-8">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={selectedRows.length === verifiers.length && verifiers.length > 0}
                        className="rounded border-gray-300 text-xpress-blue focus:ring-xpress-blue"
                      />
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">First Name</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Last Name</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Phone Number</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Partner</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Location</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
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
                    ))
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
                            onChange={() => handleSelectRow(verifier.id)}
                            className="rounded border-gray-300 text-xpress-blue focus:ring-xpress-blue"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{verifier.firstName}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{verifier.lastName}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{verifier.phoneNumber}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{verifier.partner}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{verifier.location}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={verifier.status} />
                        </td>
                        <td className="px-4 py-4">
                          <button 
                            onClick={() => handleRowAction(verifier.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-sm text-gray-700 mr-2">Rows per page</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-xpress-blue"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-button disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                  // Show first page, current page, and last page
                  let pageNum = i + 1;
                  if (totalPages > 3) {
                    if (i === 0) pageNum = 1;
                    else if (i === 1) pageNum = currentPage;
                    else pageNum = totalPages;
                  }
                  
                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-button disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
