from flask import Flask
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
cors = CORS(app)

list = []

@app.route("/table/<searchInput>")
def getTableData(searchInput):
	df = pd.read_csv("test.csv")
	searchedDf = df.loc[df['name'] == searchInput]
	searchedDf = searchedDf.drop_duplicates(subset=['id'], keep='last')
	result = searchedDf.to_json(orient="table")
	parsed = json.loads(result)
	json_string = json.dumps(parsed["data"], indent=4)
	for i in parsed["data"]:
		dict = {'name': i["name"], 'id': i['id'], 'store':i['store'],'stock': i['stock'], 'price':i['price']}
		list.append(dict)
	return { "data" : list }

	# format for request
	# return {
	# 	"data": [
	# 	{
	# 		"id": 1,
	# 		"name": searchInput,
	# 		"store": "A",
	# 		"stock": "Y",
	# 		"price": 2
	# 	},
	# 	{
	# 		"id": 2,
	# 		"name": searchInput,
	# 		"store": "B",
	# 		"stock": "N",
	# 		"price": 2
	# 	},
	# 	{
	# 		"id": 3,
	# 		"name": searchInput,
	# 		"store": "C",
	# 		"stock": "Y",
	# 		"price": 4
	# 	}
	# 	]
	# }


@app.route("/graph/<productID>")
def getGraphData(productID):
    df = pd.read_csv("test.csv")
    return {
        "data": [
            {
                "id": productID,
                "date": "06/03/2021",
                "price": 1
            },
            {
                "id": productID,
                "date": "06/03/2021",
                "price": 2
            },
            {
                "id": productID,
                "date": "06/03/2021",
                "price": 4
            }
        ]
    }


@app.route("/email/<emailInput>")
def postEmail(email):
    print("hi")
