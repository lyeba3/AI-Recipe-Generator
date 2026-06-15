import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {

        try {

            const res = await fetch(

                "http://127.0.0.1:5000/login",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        username,
                        password

                    })

                }

            );

            const data = await res.json();

            if (data.success) {

                localStorage.setItem(
                    "user_id",
                    data.user_id
                );

                localStorage.setItem(
                    "username",
                    username
                );

                alert("Login Successful");

                navigate("/home");

            }

            else {

                alert(
                    "Invalid Username or Password"
                );

            }

        }

        catch (error) {

            console.log(error);

            alert(
                "Backend Connection Failed"
            );

        }

    };

    return (

        <div

            style={{

                minHeight: "100vh",

                background: "#03595c",

                display: "flex",

                justifyContent: "center",

                alignItems: "center"

            }}

        >

            <div

                style={{

                    width: "500px",

                    background: "white",

                    borderRadius: "20px",

                    overflow: "hidden",

                    boxShadow: "0px 8px 30px rgba(0,0,0,0.3)"

                }}

            >

                <img

                    src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop"

                    alt="Healthy Food"

                    style={{

                        width: "100%",

                        height: "220px",

                        objectFit: "cover"

                    }}

                />

                <div

                    style={{

                        padding: "35px"

                    }}

                >

                    <h1

                        style={{

                            textAlign: "center",

                            marginBottom: "10px"

                        }}

                    >

                        AI Recipe Generator

                    </h1>

                    <h2

                        style={{

                            textAlign: "center",

                            marginBottom: "10px"

                        }}

                    >

                        🔐 Login

                    </h2>

                    <p

                        style={{

                            textAlign: "center",

                            color: "gray",

                            marginBottom: "30px"

                        }}

                    >

                        Personalized AI Meal Planning
                        with Recipe History and
                        Nutritional Analysis

                    </p>

                    <input

                        type="text"

                        placeholder="Username"

                        value={username}

                        onChange={(e) =>

                            setUsername(
                                e.target.value
                            )

                        }

                        style={{

                            width: "100%",

                            padding: "14px",

                            marginBottom: "15px",

                            borderRadius: "10px",

                            border: "1px solid #ccc",

                            fontSize: "15px"

                        }}

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>

                            setPassword(
                                e.target.value
                            )

                        }

                        style={{

                            width: "100%",

                            padding: "14px",

                            marginBottom: "20px",

                            borderRadius: "10px",

                            border: "1px solid #ccc",

                            fontSize: "15px"

                        }}

                    />

                    <button

                        onClick={loginUser}

                        style={{

                            width: "100%",

                            padding: "14px",

                            background: "#f59e0b",

                            color: "white",

                            border: "none",

                            borderRadius: "10px",

                            fontSize: "17px",

                            cursor: "pointer",

                            fontWeight: "bold"

                        }}

                    >

                        Login

                    </button>

                    <p

                        style={{

                            textAlign: "center",

                            marginTop: "25px"

                        }}

                    >

                        Don't have an account?

                        {" "}

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;