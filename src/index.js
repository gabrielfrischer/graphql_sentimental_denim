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
      'X-Shopify-Storefront-Access-Token': '9563e8cb7fb3f7105af13c789b15aa9c'
    }
  }
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
