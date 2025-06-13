import { gql, useMutation } from "@apollo/client";

export const PRINTEO = gql`
    query Printeo($operation: String!, $variables: String) {
        printeo(operation: $operation, variables: $variables)
    }
`;
