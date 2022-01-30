from flask import Flask
from flask_cors import CORS
from datetime import datetime
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
  cur.execute("SELECT DISTINCT * from products WHERE Itemname = '{}' and dateToday = (select max(dateToday) from products where Itemname = '{}')".format(searchInput, searchInput))
  rows = cur.fetchall()
  cur.close()
  data = []

  try:
    for row in rows:
      temp = {} 
      temp["name"] = row[2]
      temp["productId"] = int(row[0])
      temp["store"] = row[1]
      temp["stock"] = row[4]
      temp["price"] = float(row[3])
      temp["productLink"] = row[7]
      data.append(temp)
    return {"data": data}

  except:
    conn.rollback()
    return {"data": ["could not find product"]}

@app.route("/graph/<productId>")
def getGraphData(productId):
  cur = conn.cursor()
  
  try:
    cur.execute("SELECT DISTINCT * from products WHERE productID = {}".format(productId))
    rows = cur.fetchall()
    cur.close()
    data = []
    maxPrice = 0
    i = 1
    for row in rows:
      # Graph data
      temp = {}
      temp["x"] = row[5].strftime("%Y-%m-%d")
      price = float(row[3])
      temp["y"] = price
      data.append(temp)
      i += 1

      # Update maxPrice
      if price > maxPrice: maxPrice = price

    return {
      "data": data,
      "maxPrice": maxPrice
    }

  except:
    conn.rollback()
    return {"data": ["could not find product"]}

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
