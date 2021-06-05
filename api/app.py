from flask import Flask
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
cors = CORS(app)

@app.route("/table/<searchInput>")
def getTableData(searchInput):
  df = pd.read_csv("test.csv")
  list = []
  tableDataDf = df.loc[df['name'] == searchInput]
  tableDataDf = tableDataDf.drop_duplicates(subset=['id'], keep='last')
  result = tableDataDf.to_json(orient="table")
  parsed = json.loads(result)
  for i in parsed["data"]:
    dict = {'name': i["name"], 'id': i['id'], 'store':i['store'],'stock': i['stock'], 'price':i['price']}
    list.append(dict)
  return { "data" : list }

@app.route("/graph/<productID>")
def getGraphData(productID):
  df = pd.read_csv("test.csv")
  graphdDf = df.loc[df['id'] == productID]
  graphdDf = graphdDf.tail(5) # 5 most recent prices
  result = graphdDf.to_json(orient="table")
  parsed = json.loads(result)
  for i in parsed["data"]:
    dict = {'id': i["id"], 'date': i['date'], 'price':i['price']}
    list.append(dict)
  return { "data" : list }

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
