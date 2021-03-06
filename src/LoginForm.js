import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
/* import {gql} from 'babel-plugin-graphql-js-client-transform';
import client from './index' */


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
}));



export default function LoginSlide(props) {
  const classes = useStyles();
  const [query, setQuery] = useState('idle');
  const timerRef = React.useRef();
  const [open, setOpen] = useState(false);
  const [loadedcAT, setcAT] = useState(props.loadedcAT)
  const [authenticated, setAuth] = useState(props.authenticated)

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

   const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  setInterval(() => {
    
  }, 1000);

  

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );


 


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };


  function handleClickQuery() {
    clearTimeout(timerRef.current);

    

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }


       setQuery('progress');





      
timerRef.current = setTimeout(() => {
        setQuery('success');
        
    }, 600);
  
      
    
}



function handleCloseTransition(){

  setTimeout(() => {
      if(props.authenticated === true && query === 'success'){
          handleClose()


      }
  }, 200);
}

function keyPress(e){
      if(e.keyCode == 13){
        console.log('Enter Pressed')
 props.loginHandle(values.email, values.password)
  handleClickQuery();       // put the login here
      }
   }


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>Login</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Login to Sentimental Denim"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Enter your email and password below, if you can't login, select forgot password below.
          </DialogContentText>

           <div className={classes.root}>
      <div className={classes.placeholder}>
      
        {props.authenticated === true && query === 'success' ? (
          <Typography>Success! {handleCloseTransition()}</Typography>
        ) : props.authenticated === false && query === 'success' ? (
                  <Typography>Invalid Credentials, check your password or click 'Forgot Password'?</Typography>

        ) : (
           <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '100ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        )}
        
      </div>
    </div>
           
          <TextField
        id="outlined-with-placeholder"
        label="Email Address"
        placeholder=""
        margin="normal"
        fullWidth
        type="email"
        onChange={handleChange('email')}
        variant="outlined"
      />
      <OutlinedInput
          id="adornment-password"
          label="Password"
          placeholder="Password"
          fullWidth
          type={values.showPassword ? 'text' : 'password'}
          onKeyDown={keyPress}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          {console.log("Login Form Values: ", values)}
          <Button onClick={() => { props.loginHandle(values.email, values.password); handleClickQuery();}} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}