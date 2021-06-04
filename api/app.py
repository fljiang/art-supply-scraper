from flask import Flask
from flask_cors import CORS
## import pandas as pd

app = Flask(__name__)
cors = CORS(app)

@app.route("/table/<searchInput>")
def getTableData(searchInput):
  df = pd.read_csv("test.csv")
  return {
    "data": [
      {
        "id": 1,
        "name": searchInput,
        "store": "A",
        "stock": "Y",
        "price": 1
      },
      {
        "id": 2,
        "name": searchInput,
        "store": "B",
        "stock": "N",
        "price": 2
      },
      {
        "id": 3,
        "name": searchInput,
        "store": "C",
        "stock": "Y",
        "price": 3
      }
    ]
  }

@app.route("/graph/<productID>")
def getGraphData(productID):
  df = pd.read_csv("test.csv")

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
