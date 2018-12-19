/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PreviewCard from './previewCard'
import axios from 'axios'
import Pagination from './pagination'
import SearchForm from './search'

import '../styles/pokedex.css'

export default function Pokedex (props) {
  let [previewCardsPerPage, setPreviewCardsPerPage] = useState(150)
  let [indexOfPage, setIndexOfPage] = useState(null)
  let [pokemonsData, setPokemonsData] = useState(undefined)
  let [loading, setLoading] = useState(true)
  let [count, setCount] = useState(null)
  let [links, setLinks] = useState([])
  let [names, setNames] = useState([])
  const certainPage = num => {
    const index = num - 1
    setIndexOfPage(index)
  }

  const getData = url => {
    const data = axios.get(url).then(res => {
      return res.data
    })
    return data
  }

  const getPokemonsInfo = async () => {
    if (indexOfPage === null) {
      certainPage(1)
    }
    setLoading(true)
    const data = await axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then(response => {
        return response.data.results
      })
    const _count = data.length
    setCount(_count)
    let _links = []
    let _names = []
    data.map(item => {
      _names.push(item.name)
      _links.push(item.url)
      return null
    })
    setLinks(_links)
    setNames(_names)

    const _previewCardsPerPage = previewCardsPerPage
    const _startPoint = indexOfPage * _previewCardsPerPage
    const _endPointForPage = _startPoint + _previewCardsPerPage
    const _endPoint = _endPointForPage > _count ? _count : _endPointForPage
    const _pokemonsData = []
    console.log(count, 'count')
    for (let i = _startPoint, j = 0; i < _endPoint; i++, j++) {
      _pokemonsData[j] = getData(_links[i])
    }
    Promise.all(_pokemonsData).then(results => {
      setPokemonsData(results)
      setLoading(false)
    })
  }
  useEffect(
    () => {
      getPokemonsInfo()
    },
    [indexOfPage]
  )
  const prevPage = () => {
    setIndexOfPage(indexOfPage - 1)
  }
  const nextPage = () => {
    setIndexOfPage(indexOfPage + 1)
  }

  return (
    <div className='Pokedex'>
      <SearchForm names={names} />
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        count={count}
        previewCardsPerPage={previewCardsPerPage}
        certainPage={certainPage}
        indexOfPage={indexOfPage}
      />
      {loading ? (
        <div className='Pokedex-cardsContainer'>Loading...</div>
      ) : (
        <div className='Pokedex-cardsContainer'>
          {pokemonsData.map((item, id) => {
            return <PreviewCard {...item} key={id} />
          })}
        </div>
      )}
    </div>
  )
}
