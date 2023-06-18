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
import { Link , useNavigate} from 'react-router-dom';
import Role from "./Role.jsx"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpForm() {

  // intializing form values
  const initialValues = {fName : "", lName : "", email : "", password : "" ,role : "admin" , img : ""}
  const [formValues,setFormValues] = React.useState(initialValues);
  const [isSubmit,setIsSubmit] = React.useState(false);

  const navigate = useNavigate();

   // handle on change event on input values of form
   const handleChange=(event)=>{
    const {name,value} = event.target;
      setFormValues((prev)=>{
        return {
          ...prev,
          [name] : value
        }
      })
   }

   const handleFileChange=(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setFormValues((prev)=>{
          return {
            ...prev,
            'img' : reader.result
          }
      })
    }
}

   //validation of form Values
   const [formErrors,setFormErrors] = React.useState({});

  const validate=(values)=>{
    const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const special = /[!@#$%^&*(),.?":{}|<>]/g
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if(!values.fName){
      errors.fName = "First Name required!";
    }
    if(!values.lName){
      errors.lName = "Last Name required!";
    }
    if(!values.email){
      errors.email = "Email required!";
    }else if(!regex.test(values.email)){
      errors.email = "Invalid Email Address!"
    }
    if(!values.password){
      errors.password = "Password required!";
    }else if(!values.password.match(special)){
      errors.password = "Password should contain a special character!";
    }else if(!values.password.match(lowerCase)){
      errors.password = "Password should contain lowercase letters!";
    }else if(!values.password.match(upperCase)){
      errors.password = "Password should contain uppercase letters!";
    }else if(!values.password.match(numbers)){
      errors.password = "Password should contain numbers!";
    }else if(values.password.length<6){
      errors.password = "Password too short!"
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);  
  };

  React.useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length===0 && isSubmit){
      console.log(formValues)
      localStorage.setItem(`${formValues.email}`,JSON.stringify(formValues));
      navigate("/signin");
    }
  },[formErrors])


  // material ui form
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
          <Avatar sx={{ m: 1, bgcolor: '#916BBF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Account
          </Typography>
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="fName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={formValues.fName}
                />
              </Grid>
              <p className='error'>{formErrors.fName}</p>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={formValues.lName}
                />
              </Grid>
              <p className='error'>{formErrors.lName}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={formValues.email}
                />
              </Grid>
              <p className='error'>{formErrors.email}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={formValues.password}
                />
              </Grid>
              <p className='error'>{formErrors.password}</p>
              <Role state={{formValues,setFormValues}}/>
              

              {/* image uploading section */}
              <div className="img_upload_section" style={{position : "relative",left: 20 , marginBottom : 5}}>
              <label htmlFor="imgUpload">Upload Image!</label>
              <input type="file" name="" id="imgUpload" onChange={handleFileChange}/>
              </div>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I agree with Terms of services"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#916BBF' }}
            >
              Sign Up
            </Button>

            {/* horizontal below the sign up button  */}

            <div className="or_section">
              <hr className='line'/><span style={{color : "#D8D8D8"}}>or</span> <hr className='line'/>
            </div>

            {/* sign up with google section */}
            <div className="google_section">
              <Button fullWidth variant='outlined' style={{color : '#916BBF'}}><img src={google} alt="" style={{marginRight: "30px"}}/><p>Signup with Google</p></Button>
            </div>

            {/* footer  */}
            <Grid container justifyContent="flex-end" className='footer'>
              <Grid item>
              <span style={{fontFamily : 'Montserrat', fontWeight: 500, marginRight: "10px"}}>Already have an account?</span>
                <Link to="signin">
                   Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}