import React, { useState } from 'react'

import '../styles/fullCard.css'

export default function FullCard (props) {
  const sprites = props.sprites
  let [activeImage, setActiveImage] = useState(sprites.front_default)

  let imageUrls = []
  for (let key in sprites) {
    if (sprites[key]) {
      const imgUrl = sprites[key]
      imageUrls.push(imgUrl)
    }
  }

  return (
    <div className='FullCard'>
      <h1 className='FullCard-header'>
        {props.name[0].toUpperCase() + props.name.slice(1)}
      </h1>
      <div className='FullCard-content'>
        <div className={'FullCard-imageBlock'}>
          <img
            className='FullCard-bigImage'
            src={activeImage || props.sprites.front_default}
          />
          <div>
            {
              imageUrls.map((item, id) => {
                return <img
                  className={
                    activeImage === item
                      ? 'FullCard-smallImg FullCard-activeImage'
                      : 'FullCard-smallImg'}
                  src={item}
                  key={id}
                  alt={'pokemon'}
                  onClick={setActiveImage.bind(null, item)} />
              })
            }
          </div>
        </div>
        <div className='fullCard_info'>
          <table className='table'>
            <caption>Main Information</caption>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{props.id}</td>
              </tr>
              <tr>
                <td>Height:</td>
                <td>{props.height}</td>
              </tr>
              <tr>
                <td>Weight:</td>
                <td>{props.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className='table'>
            <caption>Main Stats</caption>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {props.stats.map((item, id) => {
                if (!item) {
                  return (
                    <tr>
                      <td>Something went wrong...</td>
                    </tr>
                  )
                }
                return (
                  <tr key={id}>
                    <td>{item.stat.name}</td>
                    <td>
                      <progress value={item.base_stat} max='100' />
                      <span className='fullCard_progressDescription'>
                        {item.base_stat}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='FullCard-closeButton' onClick={props.closeCard}>
        X
      </div>
    </div>
  )
}
