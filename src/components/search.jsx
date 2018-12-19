/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import FullCard from './fullCard'
import axios from 'axios'

import '../styles/search.css'

export default function SearchForm (props) {
  let [fullCardIsOpen, toggleFullCard] = useState(false)
  let [inputValue, changeInputValue] = useState('')
  let [hints, makeHints] = useState(null)
  let [pokemonData, setPokemonData] = useState([])

  const handleChange = e => {
    changeInputValue(e.target.value)
    const inputValue = e.target.value.toLowerCase()
    if (props.names.length) {
      const names = props.names
      const tmpArr = names.filter(item => {
        return ~item.toLowerCase().indexOf(inputValue)
      })
      makeHints(tmpArr)
    } else {
      console.error('no names')
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const value = e.target.attributes['data-name'].value.toLowerCase() // мракобесие из за асинхронности сетстейта. Fix this please !1
    const data = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
      .then(response => {
        return response.data
      })
    setPokemonData(data)
    toggleFullCard(true)
  }

  const handleClick = e => {
    const name = e.target.attributes['data-name'].value
    changeInputValue(name)
    handleSubmit(e)
  }

  const closeCard = e => {
    toggleFullCard(false)
  }

  return (
    <div className='Search'>
      <form role='search' onSubmit={e => e.preventDefault()}>
        <div>
          <fieldset>
            <legend>Find pokemon by name:</legend>
            <input
              type='text'
              placeholder='Start typing here...'
              value={inputValue}
              onChange={handleChange}
              id='searchInput'
            />
          </fieldset>
        </div>
        <div className='Search-hintsContainer'>
          {/* <button type="submit" className="btn btn-primary search_submit">Search</button> */}
          {hints && hints.length < 20
            ? hints.map((item, id) => {
              return (
                <div
                  key={id}
                  className='Search-hint'
                  data-name={item}
                  onClick={handleClick}
                >
                  {item}
                </div>
              )
            })
            : null}
          {fullCardIsOpen && (
            <FullCard {...pokemonData} closeCard={closeCard} />
          )}
        </div>
      </form>
    </div>
  )
}
