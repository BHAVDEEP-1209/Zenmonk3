import React, { useEffect, useState } from 'react'
import "../Styles/HomePage.scss"
import Navbar from '../components/Navbar'
import homepage from "../assets/homepage.jpg"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const [userInfo, setUserInfo] = useState({});
  const [productInfo, setProductInfo] = useState({ name: "", desc: "", method: "product", img: "" });
  const [productsArray, setProductsArray] = useState([]);
  const [onLoad,setOnLoad] = useState(false);
  const [cart,setCart] = React.useState([]);
  const [cartLoad,setCartLoad] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const fetchProductsArray = () => {

    const temp = JSON.parse(localStorage.getItem('products'));
    if (temp != null) {
      setProductsArray(temp);
    }else{
      localStorage.setItem('products',JSON.stringify([]));
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductInfo((prev) => {
        return {
          ...prev,
          'img': reader.result
        }
      })
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    setProductsArray((prev)=>{
      return [...prev, productInfo]
    });
  }

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('loggedUser'));
    const user = JSON.parse(localStorage.getItem(`${email}`));
    setUserInfo(user);
    fetchProductsArray();
  }, [])

  useEffect(()=>{
    
      if(onLoad){
        console.log("delteding products array");
        localStorage.setItem('products',JSON.stringify(productsArray));
      }
      setOnLoad(true);
    
  },[productsArray])

  return (
    <>
      <Navbar />
      <div className="homepage_div">
        <div className="left_div">
          <h1>Welcome To Our</h1>
          <h2>ShopMonk World!</h2>
          <p>ShopMonk is the best buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet.</p>
          <div className="button_section">
            <button className='shop_button'>SHOP NOW</button>
          </div>
        </div>
        <div className="right_div">
          <img src={homepage} alt="" />
        </div>
      </div>

      {/* Add items to the homepage only allowed to role of admin and vendor */}
      {
        userInfo.role != "customer" && <div className="add_items_div">
          <h1 style={{ marginLeft: 30 }}>Add items</h1>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} className='grid_container'>
              <Grid item xs={12} >

                <TextField id="outlined-basic" label="Product Name" variant="outlined" onChange={handleChange} name="name" value={productInfo.name} />
              </Grid>
              <Grid item xs={12} >

                <TextField id="outlined-basic" label="Product description" variant="outlined" onChange={handleChange} name="desc" value={productInfo.desc} />
              </Grid>
              <Grid item xs={12} >
                <label htmlFor="product_img"></label>
                <input type="file" name="product_img" id="product_img" onChange={handleFileChange} />
              </Grid>
              <Grid item xs={12} >
                <TextField id="outlined-basic" label="Select Method" variant="outlined" onChange={handleChange} name="method" value={productInfo.method} />
              </Grid>
              <button className='shop_button' style={{ marginRight: 100 }} onClick={handleClick}>Add</button>
              {/* end of grid container */}
            </Grid>
          </Box>
        </div>
      }

      {/* displaying data  products array*/}


      <div className="products_arrays">
        <h1>Listed Products!</h1>
        <div className="products_arrays_card">
          {
            productsArray?.map((ele, ind) => {
              return <ProductCard state={{ ele, userInfo , ind,setProductsArray,productsArray,cart,setCart,cartLoad,setCartLoad}} key={ind} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default HomePage