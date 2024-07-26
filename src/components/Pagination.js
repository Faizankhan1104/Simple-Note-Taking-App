import React from 'react';

const Pagination = ({ notesPerPage, totalNotes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="px-2">
            <button onClick={() => paginate(number)} className="px-3 py-1 bg-blue-500 text-white rounded">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
