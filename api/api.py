import time
from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
cors = CORS(app)

@app.route("/search/<searchInput>")
def getData(searchInput):
  #\ufffd is space
  searchInput = searchInput.replace("_", "\ufffd")
  df = pd.read_csv('test.csv')
  search_df = df[df['Content Desc'] == searchInput]
  return {'ProductName': searchInput, 'Price': list(search_df['Price']), 'Date': list(search_df['Date']), "Test": list(df['Price'])} 

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
