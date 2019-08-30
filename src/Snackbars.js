import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";





const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(2)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing(2)
  }
});

class CustomizedSnackbars extends React.Component {
  
  state = {
    openSuccess: false,
    openSuccessLogout: false,
    openSuccessSignedUp: false,
    openError:false,
    numberOfTimesSuccess:0,
    numberOfTimesSuccessSignup:0,
    numberOfTimesError:0,
    noIntMessage:'You do not have an internet connection.',
    loggedIn:false,
    signedUp:false,

  };



componentWillReceiveProps(nextProps) {
 console.log('componentWillReceiveProps', nextProps);
 if (this.props !== nextProps && this.props.authenticated ==true && this.state.numberOfTimesSuccess==0 ) {
    this.setState({ openSuccess: true });
    setTimeout(() => {
          this.setState({ openSuccess: false, numberOfTimesSuccess:1 });

    }, 4000);
 }

  if (this.props !== nextProps && this.props.signedUp ==true && this.state.numberOfTimesSuccessSignup==0 ) {
    this.setState({ openSuccessSignedUp: true, numberOfTimesSuccessSignup:1 });
    setTimeout(() => {
          this.setState({ openSuccessSignedUp: false });

    }, 4000);
 }




 if(this.props !== nextProps && this.props.noInternetCheckout.length > 0){
   this.setState({openError:true})
 }

  if(this.props !== nextProps && this.state.numberOfTimesSuccess ==1 && this.props.authenticated == false){
   this.setState({openSuccessLogout:true, numberOfTimesSuccess:0})
   setTimeout(() => {
          this.setState({ openSuccessLogout: false});

    }, 4000);
 }

 


}




  


  handleCloseSuccessSignUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessSignedUp: false });
  };

    handleCloseSuccessLogout = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessLogout: false });
  };
  


  handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccess: false });
  };

  handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openError: false });
  };

  render() {
    const { classes } = this.props;
    const {openSuccess, openError, openSuccessSignedUp, openSuccessLogout} = this.state 


    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openSuccess}
          autoHideDuration={4000}
          onClose={this.handleCloseSuccess}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSuccess}
            variant="success"
            message="You've been logged in successfully!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openSuccessSignedUp}
          autoHideDuration={4000}
          onClose={this.handleCloseSuccessSignUp}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSuccessSignUp}
            variant="success"
            message="Congratulations! You've signed up. Now login."
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openSuccessLogout}
          autoHideDuration={4000}
          onClose={this.handleCloseSuccessLogout}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSuccessLogout}
            variant="success"
            message="You have logged out successfully."
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openError}
          autoHideDuration={4000}
          onClose={this.handleCloseError}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseError}
            variant="error"
            message={this.props.noInternetCheckout.length>0 ? this.state.noIntMessage : null }
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(CustomizedSnackbars);
