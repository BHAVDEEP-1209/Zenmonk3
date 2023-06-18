import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import "../Styles/Navbar.scss"
import {Link, useNavigate} from "react-router-dom";

export default function ProfileButton(props) {

  const navigate = useNavigate();

  const handleLogOut=()=>{
    localStorage.setItem('loggedUser',"");
    navigate("/signin");
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}  className="profile_button"> 
            {props.state}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem><Link to="/profile" style={{textDecoration: "none"}}>Profile</Link></MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}