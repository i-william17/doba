// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="content">
        <div className="content-left">
            <img className='content-logo' src={assets} alt="" />
            <p>Get what you need here. All  you can get</p>
            <div className="social-icons">
                <img src={assets.facebook} alt="" />
                <img src={assets.twitter} alt="" />
                <img src={assets.instagram} alt="" />
                <img src={assets.linked} alt="" />
            </div>
        </div>
        <div className="content-center">
            <h2>Asian Quarters Delivery</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="content-right">
            <h2>Reach out to us</h2>
            <ul>
                <li>4253646464</li>
                <li>contact@del.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'> Copywight 2024 Asian Quarters Delivery - All Rights Reserved</p>
    </div>
  )
}

export default Footer
