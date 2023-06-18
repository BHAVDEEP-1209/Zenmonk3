import React from 'react'
import video from "../assets/Sample.mp4"
import "../Styles/SignUp.scss"
import SignUpForm from '../components/SignUpForm'
import logo from "../assets/logo.png"
import mobile from "../assets/mobile.jpg"
import lock from  "../assets/lock.svg"
import like from  "../assets/like.svg"
import leaf from  "../assets/leaf.svg"
import SignInForm from '../components/SignInForm'

const SignIn = () => {
  return (
    <>
    <div className="signup_div">
    <div className="signup_left_div">
            <div className="header">
            <img src={logo} alt="" />
            <h1>Welcome Back!</h1>
            </div>
            <img src={lock} alt="" className='lock_image'/>
            <img src={like} alt="" className='like_image'/>
            <img src={leaf} alt="" className='leaf_image'/>
            <img src={mobile} alt="" className='mobile_image'/>
        </div>
        <div className="signup_right_div">
          <SignInForm />
        </div></div>
       
        
    </>
  
  )
}

export default SignIn