import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import "../Styles/Cart.scss"
import CartCard from '../components/CartCard.jsx'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [onLoad,setOnLoad] = useState(false);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('cart'));
    if (temp != null) {
      setCartItems(temp);
    }
  }, [])

  useEffect(()=>{
    if(onLoad){
      localStorage.setItem('cart',JSON.stringify(cartItems));
    }
    setOnLoad(true);
  },[cartItems])

  return (
    <>
      <Navbar />
      <div className="cart_div_background">

        <div className="cart_div">
          {
            cartItems.length == 0 ? <h1>Cart is  Empty!</h1> : <>
              <h1>Cart Items!</h1>
              <div className="cart_items">
                {
                  cartItems?.map((ele, id) => {
                    return <CartCard state={{ ele, id ,cartItems,setCartItems}} key={id} />
                  })
                }
              </div>
            </>
          }

        </div>
      </div>
    </>
  )
}

export default Cart