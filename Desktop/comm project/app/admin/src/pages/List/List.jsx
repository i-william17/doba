// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/item/list`);
    console.log(response.data)
    if (response.data.success){
      setList(response.data.data);
      
    }
    else{
      toast.error("Couldn't obtain items list")
    }
  }

  const removeItem = async (itemId) => {
    const response = await axios.post(`${url}/api/item/remove`,{id:itemId});
    await fetchList();

    if (response.data.success){
    toast.success("Item removed successfully")
    }
    else{
      toast.error("Couldn't remove item. Try again")
    }
  }

  useEffect(()=>{
    fetchList();
  })

  return (
    <div className='list add flex-col'>
      <p>All Inventory</p>
      <div className='list-table'>
        <div className="table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div className="table-format" key={index}>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>sh {item.price}</p>
                <button onClick={()=>removeItem(item._id)}>Delete</button>
                <button>Edit</button>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default List
