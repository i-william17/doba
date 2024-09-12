// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");

    const {totalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        alert("Logged out successfully");
    }

  return (
    <div>
      <div className="navbar">
        <Link to='/'><img src={assets} className='logo' alt="" /></Link>
        <ul className="menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Catalog</a>
            <a href='#about' onClick={()=>setMenu("about")} className={menu==="about"?"active":""}>About</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
            
        </ul>
        <div className="navbar-right">
            <img src={assets.search} alt="" className='search'/>
            <div className="search-icon">
                <Link to='/cart'><img src={assets.basket} alt="" className='basket' /></Link>
                <div className={totalCartAmount()===0?"":"dot"}></div>
            </div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        :<div className='navbar-profile'>
            <img src={assets.profile} alt="" className='profile' />
            <ul className='nav-dropdown'>
              <li onClick={()=>navigate("/myorders")}><img src={assets.basket} alt="" /><p>Order</p></li>
              <hr />
              <li onClick={logOut}><img src={assets.logout} alt="" /><p>Logout</p></li>
            </ul>
            
        </div>
        
        }
        
      </div>
    </div>
  )
}

export default Navbar
