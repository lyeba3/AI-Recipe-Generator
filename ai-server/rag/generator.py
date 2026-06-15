from openai import OpenAI
from dotenv import load_dotenv

import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def generate_recipe(

    retrieved_recipe,
    ingredients,
    people,
    preference,
    allergies,
    cuisine,
    cooking_time,
    difficulty,
    budget

):

    prompt = f"""
You are an advanced AI Recipe Generator.

Use the retrieved recipe only as inspiration.
Create a new personalized recipe.

Retrieved Recipe:
{retrieved_recipe}

-------------------------------------

User Ingredients:
{ingredients}

Number of People:
{people}

Diet Preference:
{preference}

Avoid Allergies:
{allergies}

Cuisine Type:
{cuisine}

Maximum Cooking Time:
{cooking_time}

Recipe Difficulty:
{difficulty}

Budget Category:
{budget}

-------------------------------------

Requirements:

- Use the provided ingredients.
- Strictly avoid allergy ingredients.
- Follow the selected cuisine style.
- Keep the total cooking time within the limit.
- Match the selected difficulty.
- Respect the budget category.
- Use easily available ingredients.
- Adjust quantities for the specified number of people.
- Adapt the recipe to the selected dietary preference.

Generate:
Recipe Title
Ingredients with exact measurements
Preparation Time
Cooking Time
Difficulty Level
Budget Category
Step-by-step Cooking Instructions
Nutritional Information
- Calories
- Protein
- Carbohydrates
- Fat
Allergen Warning
Preference-based Suggestions
Formatting Rules:
Do NOT use markdown tables.
Do NOT use #, *, | or other markdown symbols.
Use plain readable text.
Use section headings.
Use bullet points where appropriate.
Keep the recipe well structured and easy to read.
"""

    response = client.chat.completions.create(
       model="openai/gpt-oss-120b:free",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content