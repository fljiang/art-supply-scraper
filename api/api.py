import time
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route("/search/<searchInput>")
def getData(searchInput):
  return time.time()

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")