import React from 'react'
import Slider from '../components/Slider'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsleter from '../components/Newsleter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Products/>
      <Newsleter/>
      <Footer/>
    </div>
  )
}

export default Home
