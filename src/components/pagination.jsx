/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PaginationButton from './paginationButton'

import '../styles/pagination.css'

export default function Pagination (props) {
  let [indexOfPage, setIndexOfPage] = useState(props.indexOfPage)
  const buttons = []
  const numberOfActivePage = props.indexOfPage + 1
  const changePage = pageNum => {
    props.certainPage(pageNum)
  }
  for (let i = 0, j = 1; i < props.count; i += props.previewCardsPerPage, j++) {
    const item = (
      <PaginationButton
        key={j}
        value={j}
        certainPage={changePage.bind(this, j)}
        numberOfPage={numberOfActivePage}
      />
    )
    buttons.push(item)
  }
  return (
    <div>
      {props.count && (
        <div className='Pagination'>
          <ul className='Pagination-items'>
            <li
              className={`Pagination-item ${
                props.indexOfPage <= 0 ? 'disabled' : ''
              }`}
            >
              <a onClick={props.prevPage} className='Pagination-link'>
                {'Prev Page'}
              </a>
            </li>
            {buttons}
            <li
              className={`Pagination-item ${
                props.count / props.previewCardsPerPage <= props.indexOfPage + 1
                  ? 'disabled'
                  : ''
              }`}
            >
              <a onClick={props.nextPage} className='Pagination-link'>
                {'Next Page'}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
