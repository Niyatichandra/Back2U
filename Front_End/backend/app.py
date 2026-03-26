from flask import Flask
from flask_cors import CORS
from routes.auth import auth

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth)

@app.route("/")
def home():
    return {"message": "Back2U Flask Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)