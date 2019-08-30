import React from 'react'
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  Route, // for later
  Redirect, // for later
  Switch,
  NavLink, // for later
  withRouter
} from 'react-router-dom'
import './assets/transition.css'
import Products from './components/Products';
import Home from './Home';



function RouterContainer({ location, ...rest }) {
  return (
    <Wrapper>
{console.log("Rest:", rest)}

      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>
              <Route exact path="/" render={(props)=><Home images={rest.products[0]} slideToggle={rest.viewOpen}/> }/>
              <Route path="/tie" render={(props)=><Products products={rest.products} updateQuantity={rest.quantity} addVariantToCart={rest.addVariantToCart} images={rest.products[0]}/> }/>
              <Route path="/login" render={()=><h1>Login</h1>} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

export default withRouter(RouterContainer);
