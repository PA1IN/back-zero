import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/apolloProxyClient.js'
import clientDevice from './graphql/apolloDeviceClient.js'
import clientUser from './graphql/apolloUserClient.js'

createRoot(document.getElementById('root')).render(

    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>

)
