import React from 'react'
import SignUp from './SignUp'
import {Routes, Route} from "react-router-dom"
import SignIn from './SignIn'
import HomePage from './HomePage'
import Profile from './Profile'
import Cart from "./Cart"

const RoutePath = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart/> } />
    </Routes>
    </>
  )
}

export default RoutePath