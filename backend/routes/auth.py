from flask import Blueprint, request, jsonify
from config.db import db

auth = Blueprint("auth", __name__)

@auth.route("/api/register", methods=["POST"])
def register():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    user = {
        "name": name,
        "email": email,
        "password": password
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

    if user["password"] != password:
        return jsonify({"message": "Invalid password ❌"}), 401

    return jsonify({
        "message": "Login successful ✅",
        "name": user["name"]
    })