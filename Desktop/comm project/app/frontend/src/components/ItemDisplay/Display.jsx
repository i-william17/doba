// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import './Display.css'
import { StoreContext } from '../../context/StoreContext'
import Item from '../Item/Item';

const Display = ({ category }) => {
  const { item_list } = useContext(StoreContext);

  return (
    <div className='display' id='display'>
      <h2>Our Items</h2>
      <div className="display-list">
        {item_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Item
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Display;
