import "./pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  previousPage: () => void;
  nextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  previousPage,
  nextPage
}) => {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={previousPage}
      >
        Previous
      </button>
      <div className="pagination-page-info">
        {currentPage}/{totalPages}
      </div>
      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
