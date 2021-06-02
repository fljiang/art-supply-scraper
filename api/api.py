import time
from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
cors = CORS(app)


@app.route("/search/<searchInput>")
def getTableData(searchInput):
    df = pd.read_csv("test.csv")


@app.route("/table/<productID>")
def getGraphData(productID):
    df = pd.read_csv("test.csv")


@app.route("/email/<emailInput>")
def postEmail(email):
    print("hi")
