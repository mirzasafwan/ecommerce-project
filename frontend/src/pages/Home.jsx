import React from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import Banner from '../components/Banner'
import FeaturedProduct from '../components/FeaturedProduct'
import FragnanceProduct from '../components/FragnanceProduct'
import AkEnterprise from '../components/AkEnterprise'


function Home() {

  return (
    <div>
      <div>
        <div>
          <Banner/>
        </div>
        <div>
          <FeaturedProduct/>  
        </div>
        <div>
          <FragnanceProduct/>  
        </div>
        <div>
          <AkEnterprise/>  
        </div>
      </div>
    </div>
  )
}

export default Home