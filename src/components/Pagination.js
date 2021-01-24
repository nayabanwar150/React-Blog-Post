import React from "react";

const Pagination = ({ totalEntries, entryPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEntries / entryPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-4">
          {pageNumbers.map((number) => {
            return (
              <li className="page-item" key={number}>
                <p className="page-link" onClick={() => paginate(number)}>
                  {number}
                </p>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
