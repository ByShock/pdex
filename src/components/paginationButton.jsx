/* eslint-disable no-unused-vars */
import React from 'react'

export default function PaginationButton (props) {
  return (
    <li
      data-value={props.value}
      onClick={props.certainPage}
      className={`
               Pagination-item
               ${props.numberOfPage === props.value ? ' active' : ''}
            `}
    >
      <a className='page-link' data-value={props.value}>
        {props.value}
      </a>
    </li>
  )
}
