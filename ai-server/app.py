from flask import Flask, request, jsonify
from flask_cors import CORS

from rag.retriever import retrieve_recipe
from rag.generator import generate_recipe
from database.auth import register_user
from database.auth import login_user
from database.recipes import save_recipe
from database.recipes import get_recipe_history
app = Flask(__name__)

CORS(app)

@app.route('/register', methods=['POST'])
def register():

    data = request.json

    full_name = data.get("full_name")
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    register_user(

        full_name,
        email,
        username,
        password

    )

    return jsonify({

        "message": "Registration Successful"

    })
@app.route('/login', methods=['POST'])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    user_id = login_user(

        username,
        password

    )

    if user_id:

        return jsonify({

            "success": True,
            "user_id": user_id

        })

    return jsonify({

        "success": False,
        "message": "Invalid Username or Password"

    })
@app.route('/generate', methods=['POST'])
def generate():

    data = request.json
    user_id = data.get("user_id")
    print("==========")
    print("USER ID RECEIVED:", user_id)
    print("==========")

    ingredients = data.get("ingredients")
    people = data.get("people")
    preference = data.get("preference")
    allergies = data.get("allergies")
    cuisine = data.get("cuisine")
    cooking_time = data.get("cookingTime")
    difficulty = data.get("difficulty")
    budget = data.get("budget")

    retrieved = retrieve_recipe(ingredients)

    generated_recipe = generate_recipe(

        retrieved,

        ingredients,
        people,
        preference,
        allergies,

        cuisine,
        cooking_time,
        difficulty,
        budget

    )


    save_recipe(

        user_id,
        ingredients,
        people,
        preference,
        allergies,

        cuisine,
        cooking_time,
        difficulty,
        budget,
        generated_recipe

    )

    return jsonify({
        "recipe": generated_recipe
    })


@app.route('/history/<int:user_id>', methods=['GET'])
def history(user_id):

    recipes = get_recipe_history(user_id)

    return jsonify({
        "history": recipes
    })


if __name__ == '__main__':
    app.run(port=5000)