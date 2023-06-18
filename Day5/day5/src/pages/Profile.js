import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import "../Styles/Profile.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [updatedFormValues,setUpdatedFormValues] = useState({address: "", number : "", city : "", state : ""});
  const [userInfo,setUserInfo] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem(`${userInfo.email}`, JSON.stringify({ ...userInfo, "img": reader.result }))
      setImage(reader.result);
    }
  }

   // handle on change event on input values of form
   const handleChange=(event)=>{
    const {name,value} = event.target;
    setUserInfo((prev)=>{
      return {
        ...prev,
        [name] : ""
      }
    })

     setUpdatedFormValues((prev)=>{
        return {
          ...prev,
          [name] : value
        }
      })
   }

   const handleCancel=()=>{
    const empty = {address: "", number : "", city : "", state : ""}
    setUpdatedFormValues(empty);
   }

   const handleSave=()=>{
      localStorage.setItem(`${userInfo.email}`,JSON.stringify({...userInfo,...updatedFormValues}));
      navigate("/homepage");
   }



  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('loggedUser'));
    const user = JSON.parse(localStorage.getItem(`${email}`));
    setUserInfo(user);
    setImage(userInfo.img)
  }, [image])

  console.log(userInfo);
  return (
    <>
      <Navbar />
      <div className="profile_div">
        <div className="profile_left_div">
          <div className="avatar_section">
            <div className="avatar">
              <img src={image} alt="" />
            </div>
            <input type="file" className='image_change_button' onChange={handleFileChange} />
          </div>
          <div className="footer">
            <h1>Hello!..</h1>
            <h2>{userInfo.fName} {userInfo.lName}</h2>
            <h2 style={{fontSize:30}}>{userInfo.role}</h2>
          </div>
        </div>
        <div className="profile_right_div">
          <h1>Edit Details</h1>
          <div className="profile_right_details_div">
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

              <TextField id="outlined-basic" label="Email" variant="outlined" value={userInfo.email}/>
               </Grid>
               <Grid item xs={12} >

              <TextField id="outlined-basic" label="Address" variant="outlined" name="address" value={!userInfo.address ? updatedFormValues.address : userInfo.address} onChange={handleChange}/>
               </Grid>
               <Grid item xs={12} >

              <TextField id="outlined-basic" label="Contact Number" variant="outlined" name="number" value={!userInfo.number ? updatedFormValues.number : userInfo.number} onChange={handleChange}/>
               </Grid>
               <Grid item xs={12} >

              <TextField id="outlined-basic" label="City" variant="outlined" name="city" value={!userInfo.city ? updatedFormValues.city : userInfo.city} onChange={handleChange}/>
               </Grid>
               <Grid item xs={12} >

              <TextField id="outlined-basic" label="State" variant="outlined" name="state" value={!userInfo.state ? updatedFormValues.state : userInfo.state} onChange={handleChange}/>
               </Grid>
              
              {/* end of grid container */}
               </Grid>
            </Box>
            <button className='profile_details_cancel_button' onClick={handleCancel}>Cancel</button>
            <button className='profile_details_save_button' onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile


