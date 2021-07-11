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
import config

conn = db.connect(host="ec2-35-174-35-242.compute-1.amazonaws.com",
    user=config.username,
    password=config.password,
    database="d6frtg9f11e0qr",
    sslmode="require")

@app.route("/")
def default():
  return "API WORKING!"


@app.route("/table/<searchInput>")
def getTableData(searchInput):
  cur = conn.cursor()
  searchInput = searchInput.replace("%20", " ")
  cur.execute("SELECT DISTINCT * from products WHERE Itemname = '{}' and dateToday  = (select max(dateToday) from products where Itemname = '{}')".format(searchInput, searchInput))
  rows = cur.fetchall()
  cur.close()
  returnVal = {}
  nameList = []
  productIDList = []
  storeList = []
  stockList = []
  priceList = []
  try:
    for row in rows: 
      nameList.append(row[2])
      productIDList.append(int(row[0]))
      storeList.append(row[1])
      stockList.append(row[4])
      priceList.append(float(row[3]))
    
    returnVal["name"] = nameList
    returnVal["productID"] = productIDList
    returnVal["store"] = storeList
    returnVal["stock"] = stockList
    returnVal["price"] = priceList
    return {"Data": returnVal}
  except: # Couldnt find product
    return {"Data": ["could not find product"]}

@app.route("/graph/<productId>")
def getGraphData(productId):
  cur = conn.cursor()
  
  try:
    cur.execute("SELECT DISTINCT * from products WHERE productID = {}".format(productId))
    rows = cur.fetchall()
    listOfRows = []
    i = 1
    for row in rows:
      dict = {}
      dict["x"] = i
      dict["y"] = float(row[3])
      i += 1
      listOfRows.append(dict)
    return {"data": listOfRows}

  except Exception:
    conn.rollback()
    return {"data": ["could not find product"]}
  else:
    conn.commit()

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
