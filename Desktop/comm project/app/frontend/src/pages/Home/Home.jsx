// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Catalog from '../../components/ExploreCatalog/Catalog'
import Display from '../../components/ItemDisplay/Display'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  useEffect(()=>{
    AOS.init({
      duration:2000});

  },[])

  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <Catalog category={category} setCategory={setCategory}/>
      <Display category = {category} data-aos='zoom'/>
    </div>
  )
}

export default Home
