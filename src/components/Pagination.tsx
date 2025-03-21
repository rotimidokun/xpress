interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  return (
    <div className="px-6 py-4 bg-white shadow-top-sm border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-4 gap-x-4 sm:mb-0">
        <span className="text-sm font-normal text-xpress-gray mr-2 whitespace-nowrap">
          Rows per page
        </span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-xpress-blue w-max sm:min-w-[80px]"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
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
              onClick={() => onPageChange(pageNum)}
              className={`pagination-button ${
                currentPage === pageNum ? "active" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
