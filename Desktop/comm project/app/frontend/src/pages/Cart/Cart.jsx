// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import "./Cart.css"
import {StoreContext} from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {

  const {cartItems,item_list,removeFromCart,totalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {item_list.map((item,index)=>{
            if (cartItems[item._id]>0){
              return(
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'> 
                    <img src={url+"/images/"+item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>Ksh{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>Ksh{item.price * cartItems[item._id]}</p>
                    <p><img onClick={() => removeFromCart(item._id)} className='bin' src={assets.bin} alt=''/></p>
                    </div>
                    <hr />
                    </div> 
                    );
                  }
                })}
              
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total Checkout</h2>
          <div>
            <div className="total-details">
              <p>Subtotal</p>
              <p>sh {totalCartAmount()}</p>
            </div>
            <div className="total-details">
              <p>Delivery Fee</p>
              <p>sh {totalCartAmount()===0?0:45}</p>
            </div>
            <hr />
            <div className="total-details">
              <b>Total</b>
              <b>sh {totalCartAmount()===0?0:totalCartAmount()+45}</b>
            </div>
            <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
      </div>

  )
}

export default Cart
