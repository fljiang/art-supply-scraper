from flask import Flask
from flask_cors import CORS
import pandas as pd
import json
import smtplib

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
  searchInput = searchInput.replace("%20", " ")
  try:
    cur.execute("SELECT DISTINCT * from products WHERE Itemname = '{}' and date = (select max(date) from products where Itemname = '{}')".format(searchInput,searchInput))
    rows = cur.fetchall()
    cur.close()

    returnVal = {}
    returnVal["name"] = rows[0][3]
    returnVal["productId"] = int(rows[0][0])
    returnVal["store"] = rows[0][1]
    returnVal["stock"] = rows[0][5]
    returnVal["price"] = float(rows[0][4])
    return {"data": [returnVal]}
  except: # Couldnt find product
    return {"data": ["could not find product"]}

@app.route("/graph/<productId>")
def getGraphData(productId):
  cur = conn.cursor()
  cur.execute("SELECT DISTINCT * from products WHERE productID = {}".format(productId))
  rows = cur.fetchall()
  try:
    listOfRows = []
    i = 1
    for row in rows:
      dict = {}
      dict["x"] = i
      dict["y"] = float(row[4])
      i += 1
      listOfRows.append(dict)
    cur.close()
    return {"data": listOfRows}
  except:
    return {"data": ["could not find product"]}

@app.route("/email/<emailInput>")
def postEmail(emailInput):

	session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
	session.starttls() #enable security
	email = "Put email here" 
	password = "Put password here"
	session.login(email, password) #login with mail_id and password

	sender = emailInput
	receivers = [emailInput]

	message = "Put your message here"

	try:
		smtpObj = smtplib.SMTP('localhost')
		smtpObj.sendmail(sender, receivers, message)
		return "Successful"
	except Exception as e:
		print(e)
		return {"Error":e}
