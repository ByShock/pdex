/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react'
import FullCard from './fullCard'

import '../styles/previewCard.css'

export default function PreviewCard (props) {
  let [fullCardIsOpen, toggleFullCard] = useState(false)
  const openCard = () => {
    toggleFullCard(true)
  }
  const closeCard = () => {
    toggleFullCard(false)
  }
  return (
    <div className='PreviewCard'>
      <div>
        <div className='PreviewCard-pokemonName'>
          {props.name[0].toUpperCase() + props.name.slice(1)}
        </div>
        <img
          className='PreviewCard-image'
          src={props.sprites.front_default}
          alt={props.name}
        />
        <div>
          <p>ID: {props.id}</p>
        </div>
        <button className='PreviewCard-button' onClick={openCard}>
          More info...
        </button>
      </div>
      {
        fullCardIsOpen ? (
          <FullCard {...props} closeCard={closeCard} />
        ) : null
      }
    </div>
  )
}
