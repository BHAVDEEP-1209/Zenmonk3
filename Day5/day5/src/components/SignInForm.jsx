import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import google from "../assets/google.svg";
import {Link, useNavigate} from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInForm() {

  const navigate = useNavigate();

// initializing form values in sing in from
const intialValues = {email : "", password : ""};
const [formValues,setFormValues] = React.useState(intialValues);

// updating the values in the input filed or formValues on typing
const handleChange=(event)=>{
    const {name,value} = event.target;
    setFormValues((prev)=>{
        return {
            ...prev,
            [name] : value
        }
    })
}

// validation
const [formErrors,setFormErrors] = React.useState({});
const [isSubmit, setIsSubmit] = React.useState(false);


const validate=(values)=>{
    const errors = {};

    try{
        if(!values.email){
            errors.email = "Email required!"
        }
        if(!values.password){
            errors.password = "Password required!"
        }
        if(values.email && values.password){
            const user = JSON.parse(localStorage.getItem(`${values.email}`));
            if(user.password != values.password){
                errors.password = "Incorrect credentails : Wrong Password!"
            }
        }
    }catch{
        errors.email = "Incorrect credentails : Wrong Email!"
    }

    return errors;
}

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  React.useEffect(()=>{
    if(Object.keys(formErrors).length===0 && isSubmit){
        localStorage.setItem('loggedUser',JSON.stringify(formValues.email));
        navigate("/homepage")
    }
  },[formErrors])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

            {/* header section  */}
            <div className="header">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello Again!
          </Typography>
        </div>
        <Typography component="p" variant="p" className='header_info'>
            Enter credentails to Login In!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formValues.email}
              onChange={handleChange}
            />
            <p className='error'>{formErrors.email}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className='error'>{formErrors.password}</p>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: '#916BBF' }}
            >
              Sign In
            </Button>

            {/* horizontal below the sign up button  */}

            <div className="or_section">
              <hr className='line'/><span style={{color : "#D8D8D8"}}>or</span> <hr className='line'/>
            </div>

            {/* sign up with google section */}
            <div className="google_section">
              <Button fullWidth variant='outlined' style={{color : '#916BBF'}}><img src={google} alt="" style={{marginRight: "30px"}}/><p>Signin with Google</p></Button>
            </div>

            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
              <span style={{fontFamily : 'Montserrat', fontWeight: 500, marginRight: "10px"}}>Don't have an account?</span>
                <Link to="/">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}