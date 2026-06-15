from database.db import db, cursor

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


def register_user(

    full_name,
    email,
    username,
    password

):

    hashed_password = generate_password_hash(password)

    sql = """

    INSERT INTO users

    (full_name,email,username,password)

    VALUES(%s,%s,%s,%s)

    """

    values = (

        full_name,
        email,
        username,
        hashed_password

    )

    cursor.execute(sql, values)

    db.commit()


def login_user(

    username,
    password

):

    sql = """

    SELECT id,password

    FROM users

    WHERE username=%s

    """

    cursor.execute(

        sql,

        (username,)

    )

    user = cursor.fetchone()

    if user:

        if check_password_hash(

            user[1],
            password

        ):

            return user[0]

    return None