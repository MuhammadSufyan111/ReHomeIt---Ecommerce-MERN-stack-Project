import React from 'react'
import Header from './header'
import Navbar from './navbar'
import Banner from './banner'
import Category from './category'
import Recommend from './RecommendedProducts'
import Brands from './brands'
import Footer from './footer'

const Home = () => {
  return (
    <>

    <Banner/>
    <Category/>
    <Recommend/>
    <Brands/>
    </>
  )
}

export default Home