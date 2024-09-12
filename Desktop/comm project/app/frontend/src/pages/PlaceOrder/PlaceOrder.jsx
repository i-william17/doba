// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  
  const {totalCartAmount,token,url,item_list,cartItems} = useContext(StoreContext);
  console.log("StoreContext:", useContext(StoreContext));

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    constituency: "",
    zipCode: "",
    phoneNumber: ""
  });

  const onChangeHandler = (event) => {  
    const name = event.target.name; 
    const value = event.target.value;

    setData(data => ({...data,[name]: value}));
  };

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    item_list.map((item) => {
      if (cartItems[item._id] > 0) { 
        let itemInfo = item; 
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo); 
      } 
    });
    console.log(orderItems);

    let orderData = {
      address:data,
      items:orderItems,
      amount: totalCartAmount() + 45
    }
    let response = await axios.post(url+"/api/order/place",orderData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.success) {
      console.log(response.data); 
    }
    else{
      alert("Error");
    }

    if (!token) {
      navigate("/login");
      
    }else if(totalCartAmount()===0){
      navigate("/cart");
    }
  };

  return (
    <form onSubmit={placeOrder} className="order" >
      <div className="order-left">
        <p className='title'>Delivery Information</p>
        <div className='fields'>
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required/>
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required/>
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required/>
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>
        <div className='fields'>
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name="constituency" onChange={onChangeHandler} value={data.constituency} type="text" placeholder='Constituency'/>
        </div>
        <div className='fields'>
          <input name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' required/>
          <input name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} type="text" placeholder='Phone Number' required/>
        </div>
      </div>

      <div className="order-right">
        <div className="cart-total">
          <h2>Total Checkout</h2>
          <div>
            <div className="total-details">
              <p>Subtotal</p>
              <p>sh {totalCartAmount()}</p>
            </div>
            <div className="total-details">
              <p>Delivery Fee</p>
              <p>sh {totalCartAmount() === 0 ? 0 : 45}</p>
            </div>
            <hr />
            <div className="total-details">
              <b>Total</b>
              <b>sh {totalCartAmount() === 0 ? 0 : totalCartAmount() + 45}</b>
            </div>
            <button type="submit">Proceed to payment</button>
            
            <button type='submit' onClick={() => navigate('/mpesa')}>Lipa na M-PESA</button>
            
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
