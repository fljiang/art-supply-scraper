from urllib.request import urlopen
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date

urls = [
  "https://www.currys.com/product.htm?Product=SK50200&Source=Category&Category=SAKURA_PIGMA_SENSEI_MARKERS",
  "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS",
  "https://www.currys.com/catalogpc.htm?Category=CHARCOAL_PENCIL_SET_OF_4"
]

idDict = {
  "https://www.currys.com/product.htm?Product=SK50200&Source=Category&Category=SAKURA_PIGMA_SENSEI_MARKERS": 100,
  "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS": 101,
  "https://www.currys.com/catalogpc.htm?Category=CHARCOAL_PENCIL_SET_OF_4": 102
}

def availability(soup):
  isAvailable = soup.find("td", {"class": "PCContentAddQty"}).text == ""
  if isAvailable:
    return "Sold Out Online"
  else:
    return "Available Online"

"""
## Writing to static csv.

with open("scraped.csv", "a+", newline="") as csvFile:
  fieldnames = ["productId", "storeName", "brandName", "itemName", "price", "availability", "dateToday"]
  writer = DictWriter(csvFile, fieldnames=fieldnames)

  for url in urls:
    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    temp = {}
    temp["productID"] = idDict[url]
    temp["storeName"] = "Curry"s"
    temp["brandName"] = soup.find("td", {"class": "PCContentDesc"}).text.split()[0]
    temp["itemName"] = " ".join(soup.find("td", {"class": "PCContentDesc"}).text.split()[1:])
    temp["price"] = soup.find_all("td", {"class": "PCContentYourPrc"})[1].text
    temp["availability"] = availability(soup)
    temp["dateToday"] = date.today()
    writer.writerow(temp)
"""

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

for url in urls:
  page = urlopen(url, context=context)
  html = page.read().decode("utf-8")
  soup = BeautifulSoup(html, "html.parser")

  productID = idDict[url]
  storeName = "Curry's"
  brandName = soup.find("td", {"class": "PCContentDesc"}).text.split()[0]
  itemName = " ".join(soup.find("td", {"class": "PCContentDesc"}).text.split()[1:])
  price = float(soup.find_all("td", {"class": "PCContentYourPrc"})[1].text.strip("$"))
  stock = availability(soup)
  dateToday = date.today()
  cur.execute("SELECT DISTINCT * from products WHERE productID = {} and date = (select max(date) from products where productID = {})".format(productID,productID))
  rows = cur.fetchall()

  newSale = "Yes" if price < rows[0][4] else "No"
  cur.execute("INSERT INTO products(productID, storeName, brandName, itemName, price, stock, dateToday, newSale) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)", (productID, storeName, brandName, itemName, price, stock, dateToday, newSale))
  conn.commit()

cur.close()
conn.close()

print("Curry's products have been webscraped")
