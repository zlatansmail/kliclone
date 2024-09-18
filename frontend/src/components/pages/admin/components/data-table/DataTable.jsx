import React from "react";

import Pagination from "../../../../common/pagination/Pagination";

import "./data-table.css";

const DataTable = ({
  tableHeaderTitleList,
  searchKeyword,
  searchKeyworOnChangedHandler,
  pageTitle,
  searchKeywordOnSubmitHandler,
  searchInputPlaceholder,
  isLoading,
  isFetching,
  isError,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers
}) => {
  const totalPageCount = headers?.["x-totalpagecount"]
    ? JSON.parse(headers["x-totalpagecount"])
    : 0;
  return (
    <div className="screen-container">
      <div className="heading-wrapper">
        <h1 className="heading">{pageTitle}</h1>
        <form onSubmit={searchKeywordOnSubmitHandler}>
          <input
            type="text"
            id="myInput"
            placeholder={searchInputPlaceholder}
            onChange={searchKeyworOnChangedHandler}
            value={searchKeyword}
          />
          <button type="submit" className="search-button">
            Pretraži
          </button>
        </form>
      </div>
      <table className="table">
        <thead className="table-header">
          <tr>
            {tableHeaderTitleList.map((title, index) => (
              <th key={index} scope="col">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="myTable">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan="5" className="loading">
                Ucitava se...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td className="error">Greška pri dohvaćanju podataka</td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="loading">
                Nema podataka za prikaz
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
      {!isLoading && (
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPageCount={totalPageCount}
        />
      )}
    </div>
  );
};

export default DataTable;
