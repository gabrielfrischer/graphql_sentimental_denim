import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route, // for later
  Redirect, // for later
  Switch, // for later
} from 'react-router-dom'

class Router extends Component {
  render() {
    return (
      <Router>
        <div style={styles.fill}>
            
        </div>
      </Router>
    )
  }
}

let styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

export default Router