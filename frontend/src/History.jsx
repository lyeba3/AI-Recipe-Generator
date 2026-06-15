import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function History() {

    const navigate = useNavigate();

    if (!localStorage.getItem("user_id")) {

        window.location.href = "/";

    }

    const [history, setHistory] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    const logout = () => {

        localStorage.clear();

        alert(
            "Logged Out Successfully"
        );

        navigate("/");

    };

    const goBack = () => {

        navigate(-1);

    };

    const loadHistory = async () => {

        try {

            const user_id =

                localStorage.getItem(
                    "user_id"
                );

            const res = await fetch(

                "http://127.0.0.1:5000/history/" +
                user_id

            );

            const data =
                await res.json();

            setHistory(
                data.history
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="app">

            <nav className="navbar">

                <div className="logo">

                    AI Recipe Generator

                </div>

                <div

                    className="menu"

                    style={{

                        display: "flex",

                        alignItems: "center",

                        gap: "15px"

                    }}

                >

                    <h3

                        style={{

                            color: "white",

                            margin: "0"

                        }}

                    >

                        Welcome,

                        {" "}

                        {localStorage.getItem(
                            "username"
                        )}

                    </h3>

                    <Link to="/home">

                        Home

                    </Link>

                    <Link to="/history">

                        History

                    </Link>

                    <button

                        onClick={goBack}

                        style={{

                            background: "#192f52",

                            color: "white",

                            border: "none",

                            padding: "6px 13px",

                            borderRadius: "5px",

                            cursor: "pointer"

                        }}

                    >

                        Back

                    </button>

                    <button

                        onClick={logout}

                        style={{

                            background: "orange",

                            color: "white",

                            border: "none",

                            padding: "8px 15px",

                            borderRadius: "5px",

                            cursor: "pointer"

                        }}

                    >

                        Logout

                    </button>

                </div>

            </nav>

            <div

                style={{

                    padding: "40px"

                }}

            >

                <h1

                    style={{

                        color: "white"

                    }}

                >

                    My Recipe History

                </h1>

                <br />

                {

                    history.length === 0

                        ?

                        <h2

                            style={{

                                color: "white"

                            }}

                        >

                            No recipes found.

                        </h2>

                        :

                        history.map(

                            (item, index) =>

                                <div

                                    key={index}

                                    style={{

                                        background: "white",

                                        padding: "25px",

                                        marginBottom: "25px",

                                        borderRadius: "12px",

                                        boxShadow:

                                            "0px 5px 15px rgba(0,0,0,0.2)"

                                    }}

                                >

                                    <h2>

                                        🍽 Recipe {index + 1}

                                    </h2>

                                    <hr />

                                    <p>

                                        <strong>

                                            🥗 Ingredients:

                                        </strong>

                                        {" "}

                                        {item[1]}

                                    </p>

                                    <p>

                                        <strong>

                                            💪 Preference:

                                        </strong>

                                        {" "}

                                        {item[2]}

                                    </p>

                                    <p>

                                        <strong>

                                            🌍 Cuisine:

                                        </strong>

                                        {" "}

                                        {item[3]}

                                    </p>

                                    <p>

                                        <strong>

                                            ⏱ Cooking Time:

                                        </strong>

                                        {" "}

                                        {item[4]}

                                    </p>

                                    <p>

                                        <strong>

                                            👨‍🍳 Difficulty:

                                        </strong>

                                        {" "}

                                        {item[5]}

                                    </p>

                                    <p>

                                        <strong>

                                            💰 Budget:

                                        </strong>

                                        {" "}

                                        {item[6]}

                                    </p>

                                    <p>

                                        <strong>

                                            📅 Created:

                                        </strong>

                                        {" "}

                                        {item[8]}

                                    </p>

                                    <hr />

                                    <h3>

                                        🤖 AI Generated Recipe

                                    </h3>

                                    <pre

                                        style={{

                                            whiteSpace: "pre-wrap",

                                            lineHeight: "1.8",

                                            fontSize: "15px"

                                        }}

                                    >

                                        {item[7]}

                                    </pre>

                                </div>

                        )

                }

            </div>

        </div>

    );

}

export default History;