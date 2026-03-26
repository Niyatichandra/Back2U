from pymongo import MongoClient
MONGO_URI = "mongodb+srv://back2u_db_user:Banasthali%4026@back2u.2skgwac.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["back2u_db"]