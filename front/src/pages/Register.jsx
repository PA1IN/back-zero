import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { REGISTER } from "../graphql/mutation";
import clientUser from "../graphql/apolloUserClient";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Register = () => {

    const [form, setForm] = useState({
        email: "",
        pass : "",
    });
    const [register, {data, loading, error}] = useMutation(REGISTER, {client: clientUser});
    const [userAgent, setUserAgent] = useState('');
    const time = new Date();


    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            setUserAgent(navigator.userAgent);
        }
    }, []);

    async function handleClick(event){

        event.preventDefault();
        if(form.pass === "" && form.email === ""){
            alert("Ingrese datos validos!")
            console.log("La contraseña no puede estar vacia")
        }

        const navegatorData = await getFingerprint();

        const operativeSystem = getSistemaOperativo(userAgent);
        const timeZone = navegatorData.components.timezone.value;
        const navigator = detectarNavegador(userAgent);

        if(!(form.email === "" && form.pass === "")){
            try {
                const response = await register({
                    variables:{
                        crearUserInput:{
                            email: form.email,
                            password: form.pass,
                            operatingSystem: operativeSystem,
                            timeZone: timeZone,
                            navigator: navigator,
                            time: time
                        }
                    }
                });

                localStorage.setItem("idDevice", response.data.register.idDevice);

            } catch (error) {
                console.log(error);
            };
        }
    };


    //############### Obtencion de datos
    const getFingerprint = async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result;
    };

    function getSistemaOperativo(ua) {
        const match = ua.match(/\(([^)]+)\)/);
        if (!match) return 'Desconocido';

        const contenidoEntreParentesis = match[1];
        const partes = contenidoEntreParentesis.split(';');
        return partes[0].trim();
    }

    function detectarNavegador(userAgent) {
        if (userAgent.includes('Edg')) return 'Edge';
        if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'Opera';
        if (userAgent.includes('Brave')) return 'Brave'; 
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
        return 'Desconocido';
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