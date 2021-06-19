from flask import Flask
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
cors = CORS(app)

# Connect to Heroku DB
import os
import psycopg2 as db
import ssl

conn = db.connect(host="ec2-35-174-35-242.compute-1.amazonaws.com",
  user="tbnywkvrfotgxw",
password="e815e843be1ccfd95f0700c8a3f252f660d9a3124f9e2be8f6837e85f28e9044",
  database="d6frtg9f11e0qr",
  sslmode="require")
cur = conn.cursor()



@app.route("/")
def default():
  return "API WORKING!"

@app.route("/table/<searchInput>")
def getTableData(searchInput):
<<<<<<< HEAD
  #Connect to heroku DB
  conn = db.connect(host="ec2-35-174-35-242.compute-1.amazonaws.com",
    user="tbnywkvrfotgxw",
    password="e815e843be1ccfd95f0700c8a3f252f660d9a3124f9e2be8f6837e85f28e9044",
    database="d6frtg9f11e0qr",
    sslmode="require")

  cur = conn.cursor()
  cur.execute("SELECT DISTINCT * from products WHERE productID = {} and date = (select max(date) from products where productID = {})".format(searchInput,searchInput))
  rows = cur.fetchall()
  dict = {}
  dict['name'] = rows[0][3]
  dict['productId'] = rows[0][0]
  dict['store'] = rows[0][1]
  dict['stock'] = rows[0][5]
  dict['price'] = float(rows[0][4])
  cur.close()

  return {"data" : [dict]}

@app.route("/graph/<productId>")
def getGraphData(productId):
  conn = db.connect(host="ec2-35-174-35-242.compute-1.amazonaws.com",
    user="tbnywkvrfotgxw",
    password="e815e843be1ccfd95f0700c8a3f252f660d9a3124f9e2be8f6837e85f28e9044",
    database="d6frtg9f11e0qr",
    sslmode="require")

  cur = conn.cursor()
  cur.execute("SELECT DISTINCT * from products WHERE productID = {}".format(productId))
  rows = cur.fetchall()
  listOfRows = []
  i = 1
  for row in rows:
    dict = {}
    dict['x'] = i
    dict['y'] = float(row[4])
    i += 1
    listOfRows.append(dict)

  return {'data': listOfRows}
=======
  df = pd.read_csv("test.csv")
  l = []
  tableDataDf = df.loc[df["name"] == searchInput]
  tableDataDf = tableDataDf.drop_duplicates(subset=["productId"], keep="last")
  result = tableDataDf.to_json(orient="table")
  parsed = json.loads(result)
  for i in parsed["data"]:
    dict = {
      "name": i["name"],
      "productId": i["productId"],
      "store": i["store"],
      "stock": i["stock"],
      "price": i["price"]
    }
    l.append(dict)
  return {
    "data": l
  }

@app.route("/graph/<productId>")
def getGraphData(productId):
  df = pd.read_csv("test.csv")
  l = []
  graphdDf = df.loc[df["productId"] == productId]
  graphdDf = graphdDf.tail(5) # 5 most recent prices
  result = graphdDf.to_json(orient="table")
  parsed = json.loads(result)
  for i in parsed["data"]:
    dict = {
      "date": i["date"],
      "price": i["price"]
    }
    l.append(dict)
  return {
    "data": l
  }
>>>>>>> 05e951f01f79d0e90911cdc71c85e711af933f0a

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
