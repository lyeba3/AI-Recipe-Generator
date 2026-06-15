import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {

        try {

            const res = await fetch(

                "http://127.0.0.1:5000/register",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        full_name: fullName,
                        email: email,
                        username: username,
                        password: password

                    })

                }

            );

            const data = await res.json();

            alert(data.message);

            navigate("/");

        }

        catch(error){

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div
        style={{

            display:"flex",

            justifyContent:"center",

            alignItems:"center",

            minHeight:"100vh"

        }}
        >

            <div
            style={{

                background:"white",

                padding:"40px",

                borderRadius:"15px",

                width:"400px"

            }}
            >

                <h1
                style={{
                    textAlign:"center"
                }}
                >

                    Create Account

                </h1>

                <input

                type="text"

                placeholder="Full Name"

                value={fullName}

                onChange={(e)=>
                setFullName(
                e.target.value
                )}

                style={{
                    width:"100%",
                    padding:"12px",
                    marginTop:"20px"
                }}

                />

                <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e)=>
                setEmail(
                e.target.value
                )}

                style={{
                    width:"100%",
                    padding:"12px",
                    marginTop:"15px"
                }}

                />

                <input

                type="text"

                placeholder="Username"

                value={username}

                onChange={(e)=>
                setUsername(
                e.target.value
                )}

                style={{
                    width:"100%",
                    padding:"12px",
                    marginTop:"15px"
                }}

                />

                <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e)=>
                setPassword(
                e.target.value
                )}

                style={{
                    width:"100%",
                    padding:"12px",
                    marginTop:"15px"
                }}

                />

                <button

                onClick={registerUser}

                style={{

                    width:"100%",

                    padding:"12px",

                    marginTop:"20px",

                    background:"orange",

                    color:"white",

                    border:"none",

                    cursor:"pointer"

                }}

                >

                    Register

                </button>

                <p
                style={{
                    textAlign:"center",
                    marginTop:"20px"
                }}
                >

                    Already have an account?{" "}

                    <Link to="/">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;