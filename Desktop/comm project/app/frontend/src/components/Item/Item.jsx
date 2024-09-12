// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './Item.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Item = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Log the props to see if item_name is being passed correctly
  console.log('Item Props:', { id, name, price, description, image });

  return (
    <div className='item'>
      <div className="item-image-container">
        <img 
          className='item-image' 
          src={`${url}/images/${image}`} 
          alt={name} 
          onError={(e) => e.target.src = assets.fallbackImg} // Fallback image
        />
        {
          !cartItems[id] ? (
            <img 
              onClick={() => addToCart(id)} 
              className='add' 
              src={assets.add} 
              alt='Add to cart' 
              aria-label={`Add ${name} to cart`}
            />
          ) : (
            <div className='item-counter'>
              <img 
                onClick={() => removeFromCart(id)} 
                src={assets.remove} 
                alt='Remove one item' 
                aria-label={`Remove one ${name} from cart`}
              />
              <p>{cartItems[id]}</p>
              <img 
                onClick={() => addToCart(id)} 
                src={assets.add} 
                alt='Add one more item' 
                aria-label={`Add one more ${name}`}
              />
            </div>
          )
        }
      </div>
      <div className="item-info">
        <div className="item-rating">
          <p>{name ? name : 'No Name Available'}</p>  {/* Fallback if item_name is undefined */}
        </div>
        <p className="description">{description}</p>
        <p className="price">Ksh {price}</p>
      </div>
    </div>
  );
}

export default Item;
