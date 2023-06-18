import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard(props) {

  const handleClick=()=>{
    let id = props.state.ind;
    const array = props.state.productsArray;
    const array2 = array.filter((ele,pos)=>{
        return pos!=id;
    })
    props.state.setProductsArray(array2);
  }

  const handleAddToCart=()=>{
    let id = props.state.ind;
    const array = props.state.productsArray;
    const item = array.at(id);
    
    props.state.setCart((prev)=>{
      return [...prev,item]
    })
  }

  React.useEffect(()=>{

    if(props.state.cartLoad){
    localStorage.setItem('cart',JSON.stringify(props.state.cart));
    }
    props.state.setCartLoad(true);
  },[props.state.cart])

  return (
    <Card sx={{ width: 345 , marginRight: '10px' , boxShadow : "0px 10px 10px -5px rgba(0,0,0,0.4)"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.state.ele.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.state.ele.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.state.ele.desc}
        </Typography>
      </CardContent>
      <CardActions>
        {
          props.state.userInfo.role=="admin" && <Button size="small" onClick={handleClick}>delete</Button> 
        }
          
          <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
       
        
      </CardActions>
    </Card>
  );
}
