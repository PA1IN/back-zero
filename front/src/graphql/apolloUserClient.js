import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const clientUser = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3002/graphql' }),
    cache: new InMemoryCache(),
});

export default clientUser;
