import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CartCard = (props) => {

    const handleDelete=()=>{
        const id = props.state.id;
        const array = props.state.cartItems;
        const array2 = array.filter((ele,ind)=>{
            return ind!=id;
        })
        props.state.setCartItems(array2);
    }
  return (
    <Card sx={{ width: 345, boxShadow : "0px 10px 10px -5px rgba(0,0,0,0.4)"}}>
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
    <Button size="small" onClick={handleDelete}>Delete</Button>
    </CardActions>
  </Card>
  )
}

export default CartCard