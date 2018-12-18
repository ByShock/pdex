/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import FullCard from './fullCard'
import axios from 'axios';

import '../styles/search.css'

export default class SearchForm extends Component {
   constructor(props) {
      super(props)
      this.state = {
         inputValue: '',
         hints: undefined,
         fullCardIsOpen: false,
         pokemonData: []
      }
   }
   handleChange = (e) => {
      this.setState({
         inputValue: e.target.value
      })
      const inputValue = e.target.value.toLowerCase()
      if(this.props.names.length){
         const names = this.props.names
         const tmpArr = names.filter((item) => {
            return ~item.toLowerCase().indexOf(inputValue)
         })
         this.setState({
            hints: tmpArr
         })
      } else {
         console.log('no names')
      }
          
   }
   // По клику на подсказку открывать FullCard!11
   handleClick = (e) => {
      const name = e.target.attributes['data-name'].value
      console.log(name)
      this.setState({
            inputValue: name
      })
      
      this.handleSubmit(e)
   }

   handleSubmit = async (e) => {
      e.preventDefault()
      const value = e.target.attributes["data-name"].value.toLowerCase()// мракобесие из за асинхронности сетстейта. Fix this please !1
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
         .then((response) => {
            return response.data
         })
      this.setState({
         fullCardIsOpen: true,
         pokemonData: data
      })
   }

   closeCard = (e) => {
      this.setState({
        fullCardIsOpen: false
      })
    }
   render() {
      return(
         <div className="search_container">
            <form role="search" onSubmit={e => e.preventDefault()}>
               <div>
               <fieldset>
                  <legend>
                  Find pokemon by name:
                  </legend>
                  <input type="text"
                         placeholder="Start typing here..."
                         value={this.state.inputValue}
                         onChange={this.handleChange}
                         id="searchInput"
                  />
               </fieldset>
               </div>
               <div className="search_hints_container">
               {/*<button type="submit" className="btn btn-primary search_submit">Search</button>*/}
               {
                  this.state.hints &&
                  this.state.hints.length < 20 ?
                  this.state.hints.map((item, id) => {
                     return <div key={id}
                                 className="search_hint"
                                 data-name={item}
                                 onClick={this.handleClick}
                                 >{item}</div>
                  }) : null
               }
               {
                  this.state.fullCardIsOpen && <FullCard {...this.state.pokemonData} closeCard={this.closeCard}/>
               }
               </div>
            </form>
         </div>
      )
   }
}