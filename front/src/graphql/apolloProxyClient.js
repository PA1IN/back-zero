import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext(async (_, { headers }) => {
    const token = await localStorage.getItem('userToken');
    return {
        headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const clientProxy = new ApolloClient({
    //Aca se cambia la ip para el proxy
    link: authLink.concat(new HttpLink({ uri: 'http://localhost:3003/graphql' })),
    cache: new InMemoryCache(),
});

export default clientProxy;
