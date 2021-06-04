import { Fragment } from "react";
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
    <Fragment>
      <button className="discover-pagination-button" onClick={previousPage}>
        Previous
      </button>
      <div className="discover-pagination-page-info">
        {currentPage}/{totalPages}
      </div>
      <button className="discover-pagination-button" onClick={nextPage}>
        Next
      </button>
    </Fragment>
  );
};

export default Pagination;
