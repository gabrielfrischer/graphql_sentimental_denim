import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'graphql-js-client';
import typeBundle from './types';
import './assets/shared.css'

export const client = new Client(typeBundle, {
  url: 'https://sentimental-denim.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_STOREFRONT_API_KEY
    }
  }
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
