import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import RouterContainer from './RouterContainer'
import Products from './components/Products';
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
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import AlertDialogSlide from './LoginForm';



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
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
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
  window: PropTypes.func,
};

function HideAppBar(props) {
    const classes = useStyles();
    const [cartState, cartOpen] = useState(false)
    {console.log("Cart State: ", cartState)} 

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
          {console.log("Props: ",props)}
            <Typography variant="h6" className={classes.title}>{props.shopName}</Typography>
            <AlertDialogSlide/>
      <IconButton aria-label="cart" onClick={props.openCart}>
      <StyledBadge badgeContent={props.itemCount} color="primary">
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
      quantity : 0,
      products: [],
      shop: {}
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }




  componentWillMount() {
    const client = this.props.client;
      setInterval(() => {
 if(this.state.checkout.lineItems[0] !== undefined){
          this.setState({quantity:this.state.checkout.lineItems[0].quantity}) 
          console.log("Quantity: ", this.state.quantity)
      }
      else{
        console.log("It's Undefined")
      }    
              }, 2000);

  

    
      

    client.send(gql(client)`
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
    });

    client.send(gql(client)`
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
                images(first: 10) {
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
    });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItems = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.send(gql(this.props.client)`
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
      });
      
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItems = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.send(gql(this.props.client)`
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

    return this.props.client.send(gql(this.props.client)`
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

  countItems(){
  }

  componentDidMount() {

  }


  

  render() {
    return (

<Router>
      <div className="App">
      
<HideAppBar shopName={this.state.shop.name} openCart={()=>this.setState({isCartOpen:true})} itemCount={this.state.quantity}/> 
        <header className="App__header">
          {!this.state.isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>Cart</button>
            </div>
          }
         
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          
        </header>
        <RouterContainer/>

        <Products
          products={this.state.products}
          addVariantToCart={this.addVariantToCart}
        />
        <Cart
          loadingCheckout={this.state.loadingCheckout}
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>
  </Router>

    
    );
  }
}

export default App;
