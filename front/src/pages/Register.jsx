import { useMutation } from "@apollo/client"
import { useState } from "react"
import { REGISTER } from "../graphql/mutation";
import clientUser from "../graphql/apolloUserClient";

const Register = () => {

    const [form, setForm] = useState({
        email: "",
        pass : "",
    });

    const [register, {data, loading, error}] = useMutation(REGISTER, {client: clientUser});

    async function handleClick(event){
        event.preventDefault();
        if(form.pass === "" && form.email === ""){
            alert("Ingrese datos validos!")
            console.log("La contraseña no puede estar vacia")
        }

        if(!(form.email === "" && form.pass === "")){
            try {
                const response = await register({
                    variables:{
                        loginInput:{
                            email: form.email,
                            pass: form.pass
                        }
                    }
                });

                alert(response.data.idDevice);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (

        <>
            <title>Register</title>
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

                    <div className="btn-container">
                        <button
                            type="submit"
                        >Registrar</button>
                    </div>

            </form>
        </>
        
    )

}

export default Register;