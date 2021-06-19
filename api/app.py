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

@app.route("/")
def default():
  return "API WORKING!"


@app.route("/table/<searchInput>")
def getTableData(searchInput):
  cur = conn.cursor()
  cur.execute("SELECT DISTINCT * from products WHERE productID = {}".format(searchInput))# and date = (select max(date) from products where Itemname = {})".format(searchInput,searchInput))
  rows = cur.fetchall()
  return rows
  '''
  cur.execute("SELECT DISTINCT * from products WHERE Itemname = {} and date = (select max(date) from products where Itemname = {})".format(searchInput,searchInput))
  rows = cur.fetchall()
  
  try:
    dict = {}
    dict['name'] = rows[0][3]
    dict['productId'] = rows[0][0]
    dict['store'] = rows[0][1]
    dict['stock'] = rows[0][5]
    dict['price'] = float(rows[0][4])
  except:
    dict = "Query didn't return anything"
  cur.close()

  return {"data" : [dict]}
  '''

@app.route("/graph/<productId>")
def getGraphData(productId):
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
  cur.close()
  return {'data': listOfRows}

@app.route("/email/<emailInput>")
def postEmail(email):
  print("hi")
