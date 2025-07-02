import { useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import "../style/login.css";
import { LOGIN } from "../graphql/mutation";
import { useMutation, useLazyQuery } from "@apollo/client";
import clientUser from "../graphql/apolloUserClient";
import { PRINTEO } from "../graphql/query";

const Login = () =>{
    const [form, setForm] = useState({
        email: "",
        pass : "",
    });

    const [login,{data, loading, error}] = useMutation(LOGIN,{client:clientUser});
    const [printeo] = useLazyQuery(PRINTEO, { client: clientUser });

    const getFingerprint = async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result;
    };

    async function handleClick(event) {

        event.preventDefault();
        if(form.pass === "" && form.email === ""){
            alert("Ingrese datos validos!")
            console.log("La contraseña no puede estar vacia")
        }

        const navegatorData = await getFingerprint();
        console.log(navegatorData);

        if(!(form.email === "" && form.pass === "")){
            try {
            const response = await login({
                variables:{
                    loginInput:{
                        email: form.email,
                        password: form.pass
                    }
                }
            });
            alert("Token user recibido! :  "+ response.data.login.token);
            localStorage.setItem("authUserToken", response.data.login.token);
            fetch("http://localhost:3003/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authUserToken")}`
                },
                body: JSON.stringify({
                    operationName: "Echo",
                    query: `
                    query Echo {
                        printeo(operation: "query { dummy }", variables: "{ \\"mensaje\\": \\"hola del front\\" }")
                    }
                    `
                })
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }


    }

    return (
        <>
            <title>Login</title>
            <form onSubmit={handleClick}>
                <label htmlFor="email">
                    <div className="title-container">
                        Ingresa tu correo:
                    </div>
                    <input
                        value = {form.email}
                        type="email"
                        onChange = {e => {
                            setForm({
                                ...form,
                                email : e.target.value
                            });
                        }}
                    />
                </label>

                <br/>

                <label>
                    <div className="title-container">
                        Ingresa tu contraseña:
                    </div>
                    <input
                        value = {form.pass}
                        type="password"
                        onChange = {e => {
                            setForm({
                                ...form,
                                pass : e.target.value
                            });
                        }}
                    />
                </label>

                <br/>

                <div className="btn-container">
                    <button
                        type="submit"
                    >Iniciar Sesión</button>
                </div>
                
            </form>
        </>
    )
}

export default Login;