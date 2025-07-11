import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const clientUser = new ApolloClient({
    link: new HttpLink({ uri: 'http://192.168.1.2:3002/graphql' }),
    cache: new InMemoryCache(),
});

export default clientUser;
