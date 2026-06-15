from database.db import db, cursor


def save_recipe(

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

):

    sql = """

    INSERT INTO recipe_history(

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

    VALUES(

        %s,%s,%s,%s,%s,

        %s,%s,%s,%s,%s

    )

    """

    values = (

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

    cursor.execute(sql, values)

    db.commit()

def get_recipe_history(user_id):

    sql = """

    SELECT

    id,

    ingredients,

    preference,

    cuisine,

    cooking_time,

    difficulty,

    budget,

    generated_recipe,

    created_at

    FROM recipe_history

    WHERE user_id=%s

    ORDER BY created_at DESC

    """

    cursor.execute(

        sql,

        (user_id,)

    )

    return cursor.fetchall()