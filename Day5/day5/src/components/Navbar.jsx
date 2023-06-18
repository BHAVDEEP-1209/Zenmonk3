import React, { useEffect, useState } from 'react'
import "../Styles/Navbar.scss"
import logo from "../assets/logo.png"
import cart from "../assets/cart.svg"
import ProfileButton from './ProfileButton'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [loggedUser,setLoggedUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        try{
            const email = JSON.parse(localStorage.getItem('loggedUser'));
            const userInfo = JSON.parse(localStorage.getItem(`${email}`));
            setLoggedUser(userInfo);
        }catch(error){
            window.alert(error)
        }
    },[])

    return (
        <>
            <div className="navbar_div">
                <div className="left_section">
                    <img src={logo} alt="" />
                    <h1>ShopMonk</h1>
                </div>
                <div className="right_section">
                    <img src={cart} alt="" onClick={()=>{navigate("/cart")}}/>
                    <button className='home_button' onClick={()=>{navigate("/homepage")}}>Home</button>
                    <ProfileButton state={loggedUser.fName}/>
                </div>
            </div>
        </>
    )
}

export default Navbar