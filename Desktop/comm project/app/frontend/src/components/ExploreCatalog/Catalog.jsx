// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Catalog.css'
import { catalog } from '../../assets/assets'

const Catalog = ({category, setCategory}) => {

  return (
    <div className='catalog' id='explore'>
        <h1>This is our catalog</h1>
        <p className='explore-text'>This is what we offer to you</p>

        <div className="explore-list">
            {catalog.map((item,index) => {
                return (
                    <div onClick={() => setCategory(prev=>prev===item.name?"All":item.name)} key={index} className='list-item'>
                        <img src={item.image} alt="" className={category===item.name?"active":""} />
                        <p>{item.name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default Catalog
