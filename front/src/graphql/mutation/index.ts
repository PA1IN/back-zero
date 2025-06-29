import { gql } from "@apollo/client";


export const LOGIN = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            token
        }
    }
` 
export const REGISTER = gql`
    mutation Register($crearUserInput: CrearUserInput!) {
        register(crearUserInput: $crearUserInput) {
            idDevice
        }
    }
`