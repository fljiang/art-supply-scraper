import time
from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
cors = CORS(app)

@app.route("/search/<searchInput>")
def getData(searchInput):
  df = pd.read_csv("test.csv")
  searchInput = searchInput.replace("_", " ")
  search_df = df[df["Content Desc"] == searchInput]
  return {"ProductName":searchInput, "Prices": list(search_df["Price"]), "Dates":list(search_df["Date"])}

@app.route("/table/<searchInput>")
def getData(searchInput):
  df = pd.read_csv("test.csv")
  searchInput = searchInput.replace("_", " ")
  search_df = df[df["Content Desc"] == searchInput]
  return {"ProductName":searchInput, "x": list(search_df["Price"]), "y":list(search_df["Date"])}

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
