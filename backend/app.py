from flask import Flask
from flask_cors import CORS
from routes.auth import auth
from routes.items import items
from config.mail_config import mail

app = Flask(__name__)
app.secret_key = "secret123"

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'abbca23225_shraddha@banasthali.in'
app.config['MAIL_PASSWORD'] = 'hytf zrvj ortq wjsw'

mail.init_app(app)

app.config['SESSION_COOKIE_SAMESITE'] = "Lax"
app.config['SESSION_COOKIE_SECURE'] = False

CORS(app, supports_credentials=True)

app.register_blueprint(auth)
app.register_blueprint(items)

@app.route("/")
def home():
    return {"message": "Back2U Flask Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)