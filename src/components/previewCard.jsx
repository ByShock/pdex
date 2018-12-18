/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import FullCard from './fullCard'

import '../styles/previewCard.css'
export default class PreviewCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullCardIsOpen: false
    }
  }
  openCard = e => {
    this.setState({
      fullCardIsOpen: true
    })
  }
  closeCard = e => {
    this.setState({
      fullCardIsOpen: false
    })
  }
  render () {
    return (
      <div className='previewCard_container'>
        <div>
          <div className='previewCard_name'>
            {this.props.name[0].toUpperCase() + this.props.name.slice(1)}
          </div>
          <img
            className='previewCard_image'
            src={this.props.sprites.front_default}
            alt={this.props.name}
          />
          <div>
            <p>ID: {this.props.id}</p>
            {/* <li className="list-group-item">Height: { this.props.height }</li> */}
          </div>
          <button className='previewCard_button' onClick={this.openCard}>
            More info...
          </button>
        </div>
        {this.state.fullCardIsOpen ? (
          <FullCard {...this.props} closeCard={this.closeCard} />
        ) : null}
      </div>
    )
  }
}
