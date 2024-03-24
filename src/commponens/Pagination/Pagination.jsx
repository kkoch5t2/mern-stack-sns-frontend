import React from 'react'
import './Pagination.css'
import ReactPaginate from 'react-paginate';


export default function Pagination({totalPages, handlePageChange, currentPage}) {
  return (
    <>
      <div className='paginationWrapper'>
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          previousClassName='page-item-none'
          nextClassName='page-item-none'
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      </div>
    </>
  )
}
