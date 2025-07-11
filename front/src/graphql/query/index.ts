import { gql, useMutation } from "@apollo/client";

export const PRINTEO = gql`
    query Printeo($operation: String!, $variables: String) {
        printeo(operation: $operation, variables: $variables)
    }
`;

/*export const PROXY = gql`
    query ProxyRequest {
        requestToken
    }
`;*/

export const PROXY = gql`
    query ProxyRequest($operation: String!, $variables: String)
    {
        proxyRequest(operation: $operation, variables: $variables)
    }
`;

