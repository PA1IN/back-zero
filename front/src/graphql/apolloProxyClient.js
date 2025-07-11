import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext(async (_, { headers }) => {
    const token = await localStorage.getItem('userToken');
    console.log("token a proxy ->>>>>>>>", token);
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const afterware = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext();
        const tokenNuevo = context.response.headers.get('x-access-token');
        if(tokenNuevo)
            {
                localStorage.setItem('userToken', tokenNuevo);
            } 
        return response;
    })
})

const httpLink = new HttpLink({ uri: 'http://192.168.1.3:3003/graphql' });

const clientProxy = new ApolloClient({
    //Aca se cambia la ip para el proxy
    link: from([authLink, afterware, httpLink]),
    cache: new InMemoryCache(),
});

export default clientProxy;
