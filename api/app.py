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
  try:
    for row in rows: 
      temp = {}
      temp["name"] = row[0][2]
      temp["productID"] = int(row[0])
      temp["store"] = row[1]
      temp["stock"] = row[4]
      temp["price"] = float(rows[3])
      returnVal[row[1]] = temp
    return returnVal
  except: # Couldnt find product
    return {"data": ["could not find product"]}

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
