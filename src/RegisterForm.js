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
  formControl: {
    width:'100%'
  },
}));



export default function RegisterSlide(props) {
  const classes = useStyles();
  const [query, setQuery] = useState('idle');
  const timerRef = React.useRef();
  const [open, setOpen] = useState(false);
  const [loadedcAT, setcAT] = useState(props.loadedcAT)
  const [signedUp, setAuth] = useState(props.signedUp)
  const [passwordsMatch, setMatch] = useState(false)
  const [passwordLength, setLength ] = useState(0)

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword:"",
    showPassword: false,
  });


  




   const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    console.log(values)

   
    
  };


  const checkMatch = () => {
        if(values.password === values.repeatPassword){
      setMatch(false)
    }
    else{
      setMatch(true)
    }

  };





  useEffect(
     () => {
      checkMatch()
    },
    [values.password],
  );

  useEffect(
    () => {
      checkMatch()
    },
    [values.repeatPassword],
  );


  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

    useEffect(
    () => () => {
      console.log('Use Effect Triggered')
      checkMatch()
    },
    [values.password, values.repeatPassword],
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
      if(props.signedUp === true && query === 'success'){
          handleClose()


      }
  }, 200);
}





  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>Sign Up</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Sign Up for Sentimental Denim"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Enter your email and create a password below to create an account.
          </DialogContentText>

           <div className={classes.root}>
      <div className={classes.placeholder}>
      
        {props.signedUp === true && query === 'success' ? (
          <Typography>Success! {handleCloseTransition()}</Typography>
        ) : props.signedUp === false && query === 'success' ? (
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
        required={true}
        type="email"
        onChange={handleChange('email')}
        variant="outlined"
      />
            <FormControl className={classes.formControl}>
      <OutlinedInput
          id="adornment-password"
          label="Password"
          placeholder="Password *"
          fullWidth
          error={passwordsMatch}
          required={true}
          type={values.showPassword ? 'text' : 'password'}
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
        <FormHelperText></FormHelperText>
        </FormControl>
        <OutlinedInput
          id="adornment-password"
          label="Repeat Password"
          placeholder="Confirm Password Again *"
          fullWidth
          error={passwordsMatch}
          required={true}
          type={values.showPassword ? 'text' : 'password'}
          value={values.repeatPassword}
          onChange={handleChange('repeatPassword')}
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
          <Button onClick={() => { props.registerHandle(values.email, values.password); handleClickQuery();}} disabled={passwordsMatch || values.password.length===0 || values.email.length<3} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}