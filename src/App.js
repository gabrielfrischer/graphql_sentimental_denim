import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RouterContainer from './RouterContainer'
import Products from './components/Products';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Cart from './components/Cart';
import {gql} from 'babel-plugin-graphql-js-client-transform';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import LoginSlide from './LoginForm';
import Button from '@material-ui/core/Button';
import ProfileOutline from '@material-ui/icons/PermIdentity'
import CustomizedSnackbars from './Snackbars'
import RegisterSlide from './RegisterForm';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ContactSupportOutlined from '@material-ui/icons/ContactSupportOutlined';
import { loadCSS } from 'fg-loadcss';
import Icon from '@material-ui/core/Icon';




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navBar:{
    zIndex:0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
        <Slide direction="down" in={props.unmountLogin} >
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
        Account <ProfileOutline />
      </Button>
      </Slide>
 
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/track">Track Your Order</MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const StyledBadge = withStyles(theme => ({
  badge: {
    top: 2,
    right: -4,
    background:'rgba(1,2,4,0.2)',
    // The border color match the background color.
    border: `1.4px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

function HideOnScroll(props) {
  const { children, viewOpenState } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();
console.log("Children: ",props)
  
     return (
   
    <Slide appear={false} direction="down" in={!trigger &&!viewOpenState}>
      {children} 
    </Slide>
  );
  
  
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  };



function HideOnScrollBottom(props) {
  const { children, viewOpenState } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();
console.log("Children: ",props)
  
     return (
   
    <Slide appear={false} direction="up" in={!viewOpenState && !trigger}>
      {children} 
    </Slide>
  );
  
  
}

HideOnScrollBottom.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
};

const useStylesBottomNav = makeStyles({
  root: {
    width: '100vw',
    position:'fixed',
    bottom:-5,
  },
  selected: {
    fontSize:'15px !important',
  }
  });



  function TieIcon() {
  
    useEffect(() => {
      loadCSS(
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css',
        document.querySelector('#font-awesome-css'),
      );
    }, []);
  
    return (
      <div>
        <Icon className="fab fa-black-tie" />
      </div>
    );
  }

function SimpleBottomNavigation({location, ...props}) {
  const classes = useStylesBottomNav();
  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      <HideOnScrollBottom {...props}>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/" label="Home"  classes={{ selected: classes.selected }} icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/tie" label="The Tie"  classes={{ selected: classes.selected }} icon={<TieIcon />} />
      <BottomNavigationAction component={Link} to="/about" label="About"  classes={{ selected: classes.selected }}  icon={<FavoriteIcon />} />
      <BottomNavigationAction component={Link} to="/contact" label="Contact"   classes={{ selected: classes.selected }}
  icon={<ContactSupportOutlined />} />
    </BottomNavigation>
    </HideOnScrollBottom>
        </React.Fragment>
  );
}

function HideAppBar(props) {
    const classes = useStyles();
    const [cartState, cartOpen] = useState(false)
    console.log("Cart State: ", cartState)
    const [signUpError,setsignUpError] = useState(props.signUpError)

    useEffect(
      () => {
        console.log('signUpError',signUpError)
      },
      [signUpError],
    );
    
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>{props.shopName}</Typography>
            {console.log('UserFirstName',props.userFirstName)}
  {props.unmountLogin ?  <SimpleMenu logout={props.logout} unmountLogin={props.unmountLogin} />: <LoginSlide loginHandle={props.loginHandle} loadedcAT={props.loadedcAT} authenticated={props.authenticated} key={1} />}
    {props.unmountSignup || props.unmountLogin ? null :  <RegisterSlide registerHandle={props.registerHandle}  signedUp={props.signedUp} signUpError={props.signUpError} key={2} />}

      <IconButton aria-label="cart" color="inherit" onClick={props.openCart}>
      <StyledBadge badgeContent={props.itemCount} >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    
    </React.Fragment>
  );
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      loadingCheckout: true,
      checkout: { lineItems: [] },
      loggedIn:false,
      loggedOut:true,
      quantity : 0,
      products: [],
      shop: {},
      customerAccessToken:'',
      customerAccessTokenExpire:'',
      customerID:'',
      signedUp:null,
      loadedcAT:false,
      authenticated:false,
      unmountLogin:false,
      unmountSignup:false,
      noInternetCheckout:'',
      noInternetShop:'',
      viewOpen:false,
      signUpError:''
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
    this.SlideToggle = this.SlideToggle.bind(this)
  }




  UNSAFE_componentWillMount() {

    const input = this.state.customerAccessToken
  
    console.log("CustomerOrderObject:", JSON.stringify(input))
  try{
    this.props.client.send(gql(this.props.client)`
      query {
        customer(customerAccessToken: $input) {
          orders(first: 5) {
            edges {
              node {
                lineItems(first: 5) {
                  edges {
                    node {
                      quantity
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
          `,{...input}).then(res => {
          
              console.log("Orders: ",res)
    
            
            
    
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      
                  
      
          });
        }
        catch(e){
          console.log(e)
        }
    
    try{
          this.props.client.send(gql(this.props.client)`
      mutation {
        checkoutCreate(input: {}) {
          userErrors {
            message
            field
          }
          checkout {
            id
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `).then((res) => {
      this.setState({
        loadingCheckout: false,
        checkout: res.model.checkoutCreate.checkout,
      });
    }).catch((err) => {
      this.setState({noInternetCheckout:'You are not connected to the Internet.'})
      console.log('No Internet Message: ',this.state.noInternet)
    } );
    }
    catch(e){
      console.log(e)
    }
  
    try{
    this.props.client.send(gql(this.props.client)`
      query {
        shop {
          name
          description
          products(first:1) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                options {
                  name
                  values
                }
                variants(first: 10) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      title
                      selectedOptions {
                        name
                        value
                      }
                      image {
                        src
                      }
                      price
                    }
                  }
                }
                images(first: 20) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `).then((res) => {
      this.setState({
        shop: res.model.shop,
        products: res.model.shop.products,
      });
      console.log("Products: ",this.state.products)
    })
    .catch((err) => {
      this.setState({noInternetShop:'Could not fetch products from internet.'})
      console.log("Could not fetch products from internet. Hey")
    })
  }
  catch(e){
    console.log(e)
  }


  }

  


SlideToggle(viewerOpen){
  console.log('Slide Toggle Viewer Open:', viewerOpen)
this.setState({viewOpen:viewerOpen})
}

UpdateQuantity(){
  
  if(this.state.checkout.lineItems[0] !== undefined){
           this.setState({quantity:this.state.checkout.lineItems[0].quantity}) 
           console.log("Quantity: ", this.state.quantity)
       }
       else{
         console.log("Nothing in cart")
       }    
 }






    
validator(){
  console.log('Validator Here')
  if(this.state.customerAccessToken==null){
    console.log('Validator: No Customer Access Token ')
    return false
  }
  else{
    console.log('Validator: Customer Access Token Exists')
    return true
  }
}

registerValidator(){
  console.log('Validator Here')
  if(this.state.customerID===''){
    console.log('Register Validator: No Customer ID, not signed up ')
    return false
  }
  else{
    console.log('Validator: Customer ID Exists, Signed Up: ', this.state.customerID)
    return true
  }
}

unmountLogin(){
  setTimeout(() => {
    if(this.state.authenticated){
      this.setState({unmountLogin:true})
    }
    else{
          this.setState({unmountLogin:false})

  }
  }, 100);
  
}

unmountSignup(){
  setTimeout(() => {
    if(this.state.signedUp){
      this.setState({unmountSignup:true})
    }
    else{
          this.setState({unmountSignup:false})

  }
  }, 300);
  
}

logout(){
  this.setState({customerAccessToken:'', authenticated:false, unmountSignup:false, customerID:'' })
  console.log('Logged Out current Auth',this.state.authenticated)
  this.unmountLogin()
}


customerOrder(CID){


  
  
  this.props.client.send(gql(this.props.client)`
  {
    customer(id: "gid://shopify/Customer/98495135746") {
      lastOrder {
        lineItems(first: 5) {
          edges {
            node {
              name
              quantity
            }
          }
        }
      }
    }
  }
      `,{CID}).then(res=> {
       
          console.log("Orders: ",res)

        
        

    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  
              
  
      });
  
}





login(loginEmail, loginPassword){

const input = {"input": {"email":loginEmail, "password": loginPassword} }

console.log("LoginInputObject:", JSON.stringify(input))
try{
this.props.client.send(gql(this.props.client)`
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    userErrors {
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    
  }
}
    `,{...input}).then(res => {
      this.validator()
      console.log("Res: ",res)
      
      this.setState({
        customerAccessToken: res.data.customerAccessTokenCreate.customerAccessToken.accessToken,
        customerAccessTokenExpire: res.data.customerAccessTokenCreate.customerAccessToken.expiresAt,
        loadedcAT:true,
      });
      this.setState({
        authenticated:this.validator()
      })
      this.validator()
      this.unmountLogin()
      

  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser

            

      console.log('Authenticated? : ', this.state.authenticated)
      console.log('LoadedcAT? : ', this.state.loadedcAT)

      console.log("Local Storage cAT before setting in LocalStorage: ", localStorage.getItem('cAT'))
      localStorage.setItem('cAT', this.state.customerAccessToken)
      console.log("Local Storage cAT: ", localStorage.getItem('cAT'))
            console.log("CustomerAccessToken: ",this.state.customerAccessToken, this.state.customerAccessTokenExpire)
    });
  }
  catch(e){
    console.log(e)
  }

  }






  register(loginEmail, loginPassword){



const input = {"input": {"email":loginEmail, "password": loginPassword} }

console.log("RegisterInputObject:", JSON.stringify(input))
try{
this.props.client.send(gql(this.props.client)`
     mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    userErrors {
      field
      message
    }
    customer {
      id
    }
  }
}

    `,{...input}).then(res => {
      this.registerValidator()
      console.log("Res customer: ",res)
 
      this.setState({
        customerID: res.data.customerCreate.customer.id,
      }, ()=>{
        localStorage.setItem('CID', this.state.customerID)
        console.log('localStorage customerID: ', localStorage.getItem('CID'))
      });
      this.setState({
        signedUp:this.registerValidator()
      })
      this.registerValidator()
      this.unmountSignup()
      
      
      

  this.setState({
    signUpError:res.data.customerCreate.userErrors[0].message
  })
  console.log('Sign Up Error', this.state.signUpError)
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser

    
    });
  }
  catch(e){
    console.log(e)
  }
  }
  
 

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItems = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    this.props.client.send(gql(this.props.client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `, {checkoutId, lineItems}).then(res => {
      this.setState({
        checkout: res.model.checkoutLineItemsAdd.checkout,
        quantity: res.model.checkoutLineItemsAdd.checkout.lineItems[0].quantity,
      });
      
      
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItems = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    
    this.props.client.send(gql(this.props.client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `, {checkoutId, lineItems}).then(res => {
   
      this.setState({
        checkout: res.model.checkoutLineItemsUpdate.checkout,
      });
     

    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id;

    this.props.client.send(gql(this.props.client)`
      mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  variant {
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `, {checkoutId, lineItemIds: [lineItemId]}).then(res => {
      this.setState({
        checkout: res.model.checkoutLineItemsRemove.checkout,
      });
    });

  }



  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }


  render() {
    return (

<Router>
      <div className="App">
<CustomizedSnackbars authenticated={this.state.authenticated} signedUp={this.state.signedUp} noInternetCheckout={this.state.noInternetCheckout} noInternetShop={this.state.noInternetShop}  />
<HideAppBar shopName={this.state.shop.name} viewOpenState={this.state.viewOpen} loginHandle={this.login} registerHandle={this.register} loadedcAT={this.state.loadedcAT} authenticated={this.state.authenticated} unmountSignup={this.state.unmountSignup} signedUp={this.state.signedUp} userFirstName={'Hello Gabriel'} logout={this.logout} unmountLogin={this.state.unmountLogin} openCart={()=>this.setState({isCartOpen:true})} itemCount={this.state.quantity} signUpError={this.state.signUpError}/> 
        
        <RouterContainer products={this.state.products}  addVariantToCart={this.addVariantToCart} authenticated={this.state.authenticated} viewOpen={this.SlideToggle} viewOpenState={this.state.viewOpen} orderInfo={this.customerOrder}
           />
        <Cart
          loadingCheckout={this.state.loadingCheckout}
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
        <SimpleBottomNavigation viewOpenState={this.state.viewOpen}/>
              </div>
  </Router>

    
    );
  }
}

export default App;
