import React from "react";

import { usePagination, DOTS } from "../../../hooks/usePagination.js";
import "./pagination.css";

const Pagination = ({
  currentPage,
  siblingCount = 1,
  totalPageCount,
  onPageChange
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount
  });


  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className={`previous ${currentPage === 1 ? "disabled" : ""}`}
      >
        &lt;
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <button key={index} className="dots">
              {pageNumber}
            </button>
          );
        }

        return (
          <button
            key={index}
            className={`pagination-item ${
              currentPage === pageNumber ? "selected" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className={`next ${currentPage === lastPage ? "disabled" : ""}`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
