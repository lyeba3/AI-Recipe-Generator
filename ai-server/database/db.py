import mysql.connector

db = mysql.connector.connect(

    host="localhost",

    user="root",

    password="redblanket_sql",

    database="ai_recipe_generator"

)

cursor = db.cursor()