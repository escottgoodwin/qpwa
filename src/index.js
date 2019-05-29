import React from 'react'
import * as Cookies from "js-cookie"
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

const authLink = setContext( async (_, { headers }) => {
  const token = Cookies.get('auth_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const fullHttpLink = authLink.concat(httpLink)

const client = new ApolloClient({
  link: fullHttpLink,
  cache: new InMemoryCache()
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Route path="/" component={App} />
    </ApolloProvider>
  </Router>
, document.getElementById('root'))

serviceWorker.register();
