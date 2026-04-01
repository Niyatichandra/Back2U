from flask import Blueprint, request, jsonify
from config.db import db
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask import session
import secrets
from flask_mail import Message
from config.mail_config import mail
from bson.objectid import ObjectId

reset_tokens = {}

auth = Blueprint("auth", __name__)

@auth.route("/api/register", methods=["POST"])
def register():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    hashed_password = generate_password_hash(password)

    user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }

    db.users.insert_one(user)

    return jsonify({"message": "User registered successfully ✅"})

@auth.route("/api/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = db.users.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found ❌"}), 404

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid password ❌"}), 401

    session["email"] = user["email"] 
    print("SESSION SET:", session) 

    return jsonify({
        "message": "Login successful ✅",
        "name": user["name"]
    })

@auth.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"})

@auth.route("/api/check-session", methods=["GET"])
def check_session():
    if "email" in session:
        return jsonify({"message": "Active"})
    else:
        return jsonify({"message": "Not logged in"}), 401

@auth.route("/api/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")

    user = db.users.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found ❌"}), 404

    token = secrets.token_urlsafe(32)

    reset_tokens[token] = email

    reset_link = f"http://localhost:3000/reset-password/{token}"

    msg = Message(
        "Reset Your Password 🔐",
        sender="yourgmail@gmail.com",
        recipients=[email]
    )

    msg.body = f"""
    Welcome, 

    Click the link below to reset your password:

    {reset_link}

    Thank You,
    Team Back2U
    """

    mail.send(msg)

    return jsonify({"message": "Reset link sent to your email 📧"})

@auth.route("/api/reset-password/<token>", methods=["POST"])
def reset_password(token):
    data = request.json
    new_password = data.get("password")

    if token not in reset_tokens:
        return jsonify({"message": "Invalid or expired token ❌"}), 400

    email = reset_tokens[token]

    hashed_password = generate_password_hash(new_password)

    db.users.update_one(
        {"email": email},
        {"$set": {"password": hashed_password}}
    )

    del reset_tokens[token]

    return jsonify({"message": "Password updated successfully ✅"})

@auth.route("/api/change-password", methods=["POST"])
def change_password():
    data = request.json

    old_password = data.get("old")
    new_password = data.get("new")

    email = session.get("email")

    if not email:
        return jsonify({"message": "User not logged in ❌"}), 401

    user = db.users.find_one({"email": email})


    # 🔥 check old password
    if not check_password_hash(user["password"], old_password):
        return jsonify({"message": "Old password incorrect ❌"}), 400

    # 🔥 update new password
    hashed_password = generate_password_hash(new_password)

    db.users.update_one(
        {"email": email},
        {"$set": {"password": hashed_password}}
    )

    return jsonify({"message": "Password updated successfully ✅"})

@auth.route("/api/profile", methods=["GET"])
def profile():
    email = session.get('email')
    if not email:
        return jsonify({"error": "Unauthorized"}), 401

    # 1. User ki basic details lo
    user = db.users.find_one({"email": email})
    
    if user:
        # 2. Lost items table se is user ke saare items nikalo
        # Maan lete hain ki aapne har item ke saath 'user_email' store kiya hai
        lost_data = list(db.lost_items.find({"email": email}))
        found_data = list(db.found_items.find({"email": email}))

        # MongoDB ke data ko serializable (JSON friendly) banane ke liye loop:
        lost_list = []
        for item in lost_data:
            lost_list.append({
                "title": item.get("title"),
                "description": item.get("description"),
                "status": item.get("status")
            })

        found_list = []
        for item in found_data:
            found_list.append({
                "title": item.get("title"),
                "description": item.get("description")
            })

        return jsonify({
            "name": user.get("name"),
            "email": user.get("email"),
            "lost_items": lost_list, 
            "found_items": found_list
        }), 200
    
    return jsonify({"error": "User not found"}), 404