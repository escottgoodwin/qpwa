import React from 'react'
import * as Cookies from "js-cookie"
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'

//const token1 = sessionStorage.getItem('auth_token')
const token1 = Cookies.get('auth_token')

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_SUB_SERVER,
  options: {
    reconnect: true,
    connectionParams: {
        authorization: token1 ? `Bearer ${token1}` : "",
    },
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

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  fullHttpLink,
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Route path="/" component={App} />
    </ApolloProvider>
  </Router>
, document.getElementById('root'))


serviceWorker.register();
