from flask import Blueprint, request, jsonify
from config.db import db
from datetime import datetime
from flask import session
from bson import ObjectId
from flask_mail import Message
from config.mail_config import mail

items = Blueprint("items", __name__)

@items.route("/api/found", methods=["POST"])
def add_found_item():
    data = request.json

    title = data.get("title")
    category = data.get("category")
    description = data.get("description")
    location = data.get("location")
    image_url = data.get("image_url")
    email = session.get("email")

    if not title or not category or not description or not location:
        return jsonify({"message": "All fields required ❌"}), 400

    if not image_url:
        return jsonify({"message": "Image upload failed ❌"}), 400

    if not email:
        return jsonify({"message": "User not logged in ❌"}), 401

    item = {
        "title": title,
        "category": category,
        "description": description,
        "location": location,
        "image_url": image_url,
        "email": email,
        "status": "active",
        "created_at": datetime.now()
    }

    result = db.found_items.insert_one(item)
    inserted_id = result.inserted_id

    # 🔥 CHECK LOST ITEMS FOR MATCH
    words = title.split()

    query = {
        "status": "active",
        "$or": []
    }

    for word in words:
        query["$or"].append({
            "title": {"$regex": word, "$options": "i"}
        })

    lost_item = db.lost_items.find_one(query)

    if lost_item:
        user_email = lost_item["email"]

        msg = Message(
            "Your item has been found! 🎉",
            sender="abbca23225_shraddha@banasthali.in",
            recipients=("Team Back2U",user_email)
        )

        item_link = f"http://localhost:3000/item/{str(inserted_id)}"

        msg.body = f"""
        Hello,

        Good news! 🎉

        Your lost item "{title}" has been found.

        Click the link below to view and claim your item:

        {item_link}

        Please login to your account if required.

        Thank you,
        Team Back2U
        """

        mail.send(msg)

        print("EMAIL SENT TO:", user_email)

    return jsonify({"message": "Found item added ✅"})

@items.route("/api/lost", methods=["POST"])
def add_lost_item():
    data = request.json

    title = data.get("title")
    category = data.get("category")
    description = data.get("description")
    image_url = data.get("image_url")
    email = session.get("email")

    if not title or not category or not description:
        return jsonify({"message": "All fields required ❌"}), 400

    if not email:
        return jsonify({"message": "User not logged in ❌"}), 401

    item = {
        "title": title,
        "category": category,
        "description": description,
        "image_url": image_url,
        "email": email,
        "status": "active",
        "created_at": datetime.now()
    }

    db.lost_items.insert_one(item)

    words = title.split()

    query = {
        "status": "active",
        "$or": []
    }

    for word in words:
        query["$or"].append({
            "title": {"$regex": word, "$options": "i"}
        })

    found_item = db.found_items.find_one(query)

    if found_item:
        return jsonify({
            "message": "Match found 🎉",
            "match": True,
            "item": {
                "id": str(found_item["_id"]),
                "title": found_item["title"],
                "category": found_item["category"],
                "description": found_item["description"],
                "location": found_item["location"],
                "image_url": found_item.get("image_url")
            }
        })

    return jsonify({
        "message": "Saved! Waiting for match 🔍",
        "match": False
    })

@items.route("/api/claim/<id>", methods=["PUT"])
def claim_item(id):
    

    # 🔥 found item update
    db.found_items.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": "claimed"}}
    )

    item = db.found_items.find_one({"_id": ObjectId(id)})

    if not item:
        return jsonify({"message": "Item not found ❌"}), 404

    # 🔥 related lost items update
    words = item["title"].split()

    query = {
        "status": "active",
        "$or": []
    }

    for word in words:
        query["$or"].append({
            "title": {"$regex": word, "$options": "i"}
        })

    db.lost_items.update_many(query, {
        "$set": {"status": "claimed"}
    })

    return jsonify({"message": "Item claimed successfully ✅"})

@items.route("/api/item/<id>", methods=["GET"])
def get_item(id):

    item = db.found_items.find_one({"_id": ObjectId(id)})

    if not item:
        return jsonify({"message": "Item not found"}), 404

    return jsonify({
        "_id": str(item["_id"]),
        "title": item["title"],
        "category": item["category"],
        "description": item["description"],
        "location": item["location"],
        "image_url": item.get("image_url"),
        "status": item["status"]
    })

@items.route("/api/search", methods=["GET"])
def search_items():
    query = request.args.get("q", "")

    words = query.split()

    search_query = {
        "status": "active",
        "$or": []
    }

    for word in words:
        search_query["$or"].append({
            "title": {"$regex": word, "$options": "i"}
        })

    items = db.found_items.find(search_query)

    result = []
    for item in items:
        result.append({
            "_id": str(item["_id"]),
            "title": item["title"],
            "image_url": item.get("image_url")
        })

    return jsonify(result)

@items.route("/api/notifications", methods=["GET"])
def get_notifications():
    items = db.found_items.find({
        "status": "active"
    })

    result = []

    for item in items:
        result.append({
            "_id": str(item["_id"]),
            "title": item["title"],
            "image_url": item.get("image_url")
        })

    return jsonify(result)