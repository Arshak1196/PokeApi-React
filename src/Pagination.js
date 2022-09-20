import React from 'react'

function Pagination({gotoNextPage,gotoPrevPage}) {
  return (
    <div className='pagination'>
        {gotoPrevPage && <button className='paginationButton' onClick={gotoPrevPage}>Previous</button>}
        {gotoNextPage && <button className='paginationButton' onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
 
export default Pagination