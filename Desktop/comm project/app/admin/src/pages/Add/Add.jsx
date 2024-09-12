// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image,setImage] = useState(false);
  const [data,setData] = useState({ 
    name:"",
    description:"",
    price:"",
    category:"Vegatables"
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(); // Corrected case here
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price)); // Casting price to number
    formData.append("category", data.category);
    formData.append("image", image);
  
    try {
      const response = await axios.post(`${url}/api/item/add`, formData);
  
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "", // Updated to correct spelling and default category
        });
        setImage(false); // Reset image after successful submission
        console.log('Product added successfully!');

        toast.success(response.data.message)
      } else {
        console.log('Failed to add product.');

        toast.error(response.data.message)
      } 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
          </label>

          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
          </div>

          <div className="product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text"  name='name' placeholder='Enter product name' required/>
          </div>
          <div className="product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" id="" cols="30" rows="6" placeholder='Write description here' required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
                <select onChange={onChangeHandler} name="category">
                  <option value="Vegatables">Vegatables</option>
                  <option value="Literature">Literature</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Cutlery">Cutlery</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Bags">Bags</option>
                  <option value="Accessories">Accessories</option>
                </select>
            </div>
            <div className="price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Enter Price' required />
            </div>
          </div>
          <button type='submit'className='add-btn' >Add Product</button>
      </form>
    </div>
  )
}

export default Add
