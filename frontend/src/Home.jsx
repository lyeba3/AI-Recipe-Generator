import { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function formatRecipe(text) {

  if (!text) return null;

  return text
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index) => {

      const lower = line.toLowerCase();

      if (lower.includes("recipe title"))
        return <h2 key={index}>🍽 {line}</h2>;

      if (lower.includes("ingredients"))
        return <h3 key={index}>🥗 {line}</h3>;

      if (lower.includes("instructions"))
        return <h3 key={index}>👨‍🍳 {line}</h3>;

      if (
        lower.includes("nutrition") ||
        lower.includes("nutritional")
      )
        return <h3 key={index}>📊 {line}</h3>;

      if (
        lower.includes("allergen") ||
        lower.includes("warning")
      )
        return <h3 key={index}>⚠ {line}</h3>;

      return <p key={index}>{line}</p>;
    });

}

function Home() {
  const navigate = useNavigate();

if (!localStorage.getItem("user_id")) {

    window.location.href = "/";

}

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
  const [ingredients, setIngredients] = useState("");
  const [people, setPeople] = useState(2);
  const [preference, setPreference] = useState("High Protein");
  const [allergies, setAllergies] = useState("");

  const [cuisine, setCuisine] = useState("Pakistani");
  const [cookingTime, setCookingTime] = useState("30 Minutes");
  const [difficulty, setDifficulty] = useState("Easy");
  const [budget, setBudget] = useState("Standard");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {

    setLoading(true);

    try {

      const res = await fetch(
        "http://127.0.0.1:5000/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
            ingredients,
            people,
            preference,
            allergies,

            cuisine,
            cookingTime,
            difficulty,
            budget

          })

        }
      );

      const data = await res.json();

      setResponse(data.recipe);

    }
    catch (error) {

      console.log(error);

      setResponse(
        "Unable to generate recipe. Please try again."
      );

    }

    setLoading(false);

  };

  return (

    <div className="app">

      <nav className="navbar">

       <div className="logo">
    <Link
        to="/home"
        style={{
            color: "white",
            textDecoration: "none"
        }}
    >
        AI Recipe Generator
    </Link>
</div>

      <div
className="menu"
style={{
    display:"flex",
    alignItems:"center",
    gap:"15px"
}}
>

<h3
style={{
    color:"white",
    margin:"0"
}}
>

Welcome,
{" "}
{localStorage.getItem("username")}

</h3>

<Link to="/home">

Home

</Link>
{"   "}
<Link to="/history">

History

</Link>

<button

onClick={goBack}

style={{

    background:"#340788",

    color:"white",

    border:"none",

    padding:"8px 15px",

    borderRadius:"5px",

    cursor:"pointer"

}}

>

Back

</button>

<button

onClick={logout}

style={{

    background:"orange",

    color:"white",

    border:"none",

    padding:"8px 15px",

    borderRadius:"5px",

    cursor:"pointer"

}}

>

Logout

</button>

</div>

      </nav>

      <div className="hero">

        <h1>
          AI Recipe Generator
        </h1>

        <p>
          Generate personalized recipes.
        </p>

      </div>

      <div className="features">

        <div className="feature-box">

          <h2>🥗</h2>

          <h3>Personalized</h3>

          <p>
            Recipes according to your ingredients and preferences.
          </p>

        </div>

        <div className="feature-box">

          <h2>📊</h2>

          <h3>Nutrition</h3>

          <p>
            Calories, protein, carbohydrates and fats analysis.
          </p>

        </div>

        <div className="feature-box">

          <h2>⚠</h2>

          <h3>Allergy Safe</h3>

          <p>
            AI checks allergens and recommends safer meals.
          </p>

        </div>

      </div>

      <div className="main-content">

        <div className="form-card">

          <h2>Create Your Recipe</h2>

          <label>🥗 Ingredients</label>

          <input
            type="text"
            placeholder="Chicken, Rice, Garlic..."
            value={ingredients}
            onChange={(e) =>
              setIngredients(e.target.value)
            }
          />

          <label>👨‍👩‍👧 Number of People</label>

          <input
            type="number"
            value={people}
            onChange={(e) =>
              setPeople(e.target.value)
            }
          />

          <label>💪 Diet Preference</label>

          <select
            value={preference}
            onChange={(e) =>
              setPreference(e.target.value)
            }
          >
            <option>High Protein</option>
            <option>Low Carb</option>
            <option>Vegan</option>
            <option>Keto</option>
            <option>High Fiber</option>
          </select>

          <label>⚠ Allergies</label>

          <input
            type="text"
            placeholder="Dairy, Soy, Peanuts..."
            value={allergies}
            onChange={(e) =>
              setAllergies(e.target.value)
            }
          />

          <label>🌍 Cuisine Type</label>

          <select
            value={cuisine}
            onChange={(e) =>
              setCuisine(e.target.value)
            }
          >
            <option>Pakistani</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>Indian</option>
            <option>Mexican</option>
            <option>Turkish</option>
          </select>

          <label>⏱ Maximum Cooking Time</label>

          <select
            value={cookingTime}
            onChange={(e) =>
              setCookingTime(e.target.value)
            }
          >
            <option>15 Minutes</option>
            <option>30 Minutes</option>
            <option>45 Minutes</option>
            <option>60 Minutes</option>
          </select>

          <label>👨‍🍳 Recipe Difficulty</label>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <label>💰 Budget</label>

          <select
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
          >
            <option>Economy</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>

          <button
            onClick={generateRecipe}
            disabled={loading}
          >
            {
              loading
              ? "Generating Recipe..."
              : "Generate AI Recipe"
            }
          </button>

        </div>

        <div className="recipe-card">

          <h2>
            🍽 AI Generated Recipe
          </h2>

          {
            loading &&
            (
              <div
                style={{
                  marginBottom: "20px",
                  fontWeight: "bold"
                }}
              >
                AI is creating your personalized recipe...
              </div>
            )
          }

          <div className="recipe-output">

            {formatRecipe(response)}

          </div>

        </div>

      </div>

      <footer className="footer">

        <h3>
          AI Recipe Generator
        </h3>

        <p>
          React • C++ • Flask • RAG • AI
        </p>

        <p>
          Software Engineering Semester Project
        </p>

      </footer>

    </div>

  );
}

export default Home;