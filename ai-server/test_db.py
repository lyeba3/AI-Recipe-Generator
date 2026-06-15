import mysql.connector

try:

    db = mysql.connector.connect(

        host="localhost",

        user="root",

        password="redblanket_sql",

        database="ai_recipe_generator"

    )

    print("Database Connected Successfully!")

except Exception as e:

    print(e)