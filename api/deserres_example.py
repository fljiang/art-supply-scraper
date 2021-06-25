from urllib.request import urlopen
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date

idDict = {
  "https://www.deserres.ca/en/12-pack-picolo-fineliners-0-4-mm": 200,
  "https://www.deserres.ca/en/set-of-120-polychromos-colour-pencils-in-wood-case": 201,
  "https://www.deserres.ca/en/golden-acrylic-explorer-14-piece-set": 202,
  "https://www.deserres.ca/products/box-set-of-50-extra-soft-pastels?variant=39427443294341": 204,
  "https://www.deserres.ca/products/oval-paintbrush-with-a-short-handle?variant=39362011758725": 205,
  "https://www.deserres.ca/products/6-pack-copic-sketch-markers-skin-tones-1?variant=39427441098885": 206,
  "https://www.deserres.ca/products/12-pack-pitt-pastel-pencils?variant=39426411790469": 207,
  "https://www.deserres.ca/products/castell-9000-praphite-designer-pencils-set-of-12?variant=39426408218757": 208,
  "https://www.deserres.ca/products/set-of-24-lumograph-graphite-pencils?variant=39426425225349": 209,
  "https://www.deserres.ca/products/boar-bristled-oval-paintbrush?variant=39362519990405": 210,
  "https://www.deserres.ca/products/36-pack-copic-sketch-markers-basic?variant=39426416935045": 211,
  "https://www.deserres.ca/products/copic-ciao-markers-12-piece-basic-set?variant=39426416705669": 212,
  "https://www.deserres.ca/products/copic-sketch-markers-set-of-6-perfect-primary-colours?variant=39426417164421": 213,
  "https://www.deserres.ca/products/cotman-watercolor-sketchers-pocket-box?variant=39426304344197": 215,
  "https://www.deserres.ca/products/24-colour-watercolour-set?variant=39426298577029": 216,
  "https://www.deserres.ca/products/32-piece-pwc-extra-fine-watercolour-set?variant=39426656108677": 217,
  "https://www.deserres.ca/products/studio-xl-oil-paint-set-24-x-20-ml?variant=39426298806405": 221,
  "https://www.deserres.ca/products/essentials-oil-paint-set-24-x-12-ml?variant=39427398205573": 222
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

for url in list(idDict.keys()):
  page = urlopen(url, context=context)
  html = page.read().decode("utf-8")
  soup = BeautifulSoup(html, "html.parser")

  productId = idDict[url]
  productLink = url
  storeName = "Deserres"
  brandName = soup.find("a", {"class": "product__vendor-link"}).text.strip("\n")
  itemName = soup.find("h1", {"class": "product__title h3"}).text.strip("\n")
  #If there is a sale then the page will have a slightly diff structure for price
  print(itemName)
  try:
    price = float(soup.find("span", {"class":"price price--final"}).text.strip("\n").strip("$"))
    print('sale price')
  except:
    price = float(soup.find("span", {"class": "price__value price__value--final"}).text.strip("\n").strip("$"))

  print(price)
  stock = soup.find("span", {"class": "availability__label availability__label--in-stock"}).text
  dateToday = date.today()

  cur.execute("SELECT DISTINCT * from products WHERE productID = {} and dateToday = (select max(dateToday) from products where productID = {})".format(productId, productId))
  rows = cur.fetchall()

  #If the product is newly added (no previous record)
  try:
    newSale = "Yes" if price < rows[0][4] else "No"
  except:
    newSale = "No"
  cur.execute("INSERT INTO products(productID, storeName, brandName, itemName, price, stock, dateToday, newSale, productLink) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)", (productId, storeName, brandName, itemName, price, stock, dateToday, newSale, productLink))
  conn.commit()

cur.close()
conn.close()

print("DeSerres' products have been webscraped")
