from urllib.request import urlopen
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date

listOfURLs = [
  "https://www.deserres.ca/en/12-pack-picolo-fineliners-0-4-mm", # Available
  "https://www.deserres.ca/en/set-of-120-polychromos-colour-pencils-in-wood-case", # Available on sale
  "https://www.deserres.ca/en/golden-acrylic-explorer-14-piece-set", # Available
  "https://www.deserres.ca/products/box-set-of-50-extra-soft-pastels?variant=39427443294341", # Sold out
  "https://www.deserres.ca/products/oval-paintbrush-with-a-short-handle?variant=39362011758725"
]

idDict = {
  "https://www.deserres.ca/en/12-pack-picolo-fineliners-0-4-mm": 200,
  "https://www.deserres.ca/en/set-of-120-polychromos-colour-pencils-in-wood-case": 201,
  "https://www.deserres.ca/en/golden-acrylic-explorer-14-piece-set": 202,
  "https://www.deserres.ca/en/xl-pad-marker-9x12-70g-100s": 203,
  "https://www.deserres.ca/products/box-set-of-50-extra-soft-pastels?variant=39427443294341": 204,
  "https://www.deserres.ca/products/oval-paintbrush-with-a-short-handle?variant=39362011758725": 205
}


import os
import psycopg2 as db
import ssl

conn = db.connect(host="ec2-35-174-35-242.compute-1.amazonaws.com",
  user="tbnywkvrfotgxw",
  password="e815e843be1ccfd95f0700c8a3f252f660d9a3124f9e2be8f6837e85f28e9044",
  database="d6frtg9f11e0qr",
  sslmode="require")
cur = conn.cursor()

context = ssl._create_unverified_context()

for URL in listOfURLs:
  page = urlopen(URL, context=context)
  html = page.read().decode("utf-8")
  soup = BeautifulSoup(html, "html.parser")

  productID = idDict[URL]
  storeName = "Deserres"
  brandName = soup.find("a", {"class": "product__vendor-link"}).text.strip("\n")
  itemName = soup.find("h1", {"class": "product__title h3"}).text.strip("\n")
  Price = float(soup.find("span", {"class": "price__value price__value--final"}).text.strip("\n").strip("$"))
  Availability = soup.find("span", {"class": "availability__label availability__label--in-stock"}).text
  Date = date.today()

  cur.execute("SELECT DISTINCT * from products WHERE productID = {} and date = (select max(date) from products where productID = {})".format(productID,productID))
  rows = cur.fetchall()
  
  Pricereducedfromprevday = 'Yes' if Price < rows[0][4] else 'No'
  cur.execute("INSERT INTO products(productID, storeName, brandName, itemName, Price, Availability, Date, Pricereducedfromprevday) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)", (productID, storeName, brandName, itemName, Price, Availability, Date,Pricereducedfromprevday))
  conn.commit()

cur.close()
conn.close()

print("DeSerres' products have been webscraped")