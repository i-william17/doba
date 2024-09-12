// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="options">
        <NavLink to='/add' className="option">
            <img src={assets.add} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="option">
            <img src={assets.checklist} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className="option">
            <img src={assets.order} alt="" />
            <p>Order</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
