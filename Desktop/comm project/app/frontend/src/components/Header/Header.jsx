// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Header.css'

const Header = () => {

  const [setMenu] = useState("home");

  return (
    <div>
      <div className="header">
        <div className="contents">
            <h2>Get what you need here</h2>
            <p>We bring you all you need at you own convenience.
                With affordable prices and good service, it calways gets better with us.
                This is us. Enjoy.
            </p>
            <p>Get Started</p>
            <div className="header-btn">
            <button><a href='#explore' onClick={()=>setMenu("menu")}>View Catalog</a></button>
            <button>Become Seller</button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Header
