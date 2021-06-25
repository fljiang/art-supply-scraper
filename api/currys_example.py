from urllib.request import urlopen
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date


idDict = {
  "https://www.currys.com/product.htm?Product=SK50200&Source=Category&Category=SAKURA_PIGMA_SENSEI_MARKERS": 100,
  "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS": 101,
  "https://www.currys.com/catalogpc.htm?Category=CHARCOAL_PENCIL_SET_OF_4": 102,
  "https://www.currys.com/catalogpc.htm?Category=WINSOR_NEWTON_FINELINER&NBReset=4": 103,
  "https://www.currys.com/product.htm?Product=SVC16202PK&Source=Category&Category=CURRYS_SUPER_VALUE_CANVAS_PACK": 104,
  "https://www.currys.com/product.htm?Product=VC06062PK&Source=Category&Category=VALUE_CANVAS_PACK_REGULAR": 105,
  "https://www.currys.com/product.htm?Product=MADC10&Source=Category&Category=BLACKBOARD_CHALK": 106,
  "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS": 107,
  "https://www.currys.com/product.htm?Product=FA8683&Source=Category&Category=KOHINOOR_CHARCOAL_BLOCKS_6PACK": 108,
  "https://www.currys.com/product.htm?Product=ACHGR&Source=Category&Category=ART_CHUNKY_CHARCOAL": 109,
  "https://www.currys.com/product.htm?Product=WN0290068&Source=Category&Category=WINSOR_NEWTON_FINELINER": 110,
  "https://www.currys.com/product.htm?Product=HGD410&Source=Category&Category=HOLBEIN_ACRYLA_GOUACHE": 111,
  "https://www.currys.com/product.htm?Product=GRM11180&Source=Category&Category=M_GRAHAM_ARTISTS_OIL_PAINT": 112
}

def availability(soup):
  isAvailable = soup.find("td", {"class": "PCContentAddQty"}).text == ""
  if isAvailable:
    return "Sold Out Online"
  else:
    return "Available Online"


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

  productID = idDict[url]
  productLink = url
  storeName = "Curry's"
  brandName = soup.find("td", {"class": "PCContentDesc"}).text.split()[0]
  itemName = " ".join(soup.find("td", {"class": "PCContentDesc"}).text.split()[1:])
  price = float(soup.find_all("td", {"class": "PCContentYourPrc"})[1].text.strip("$"))
  stock = availability(soup)
  dateToday = date.today()
  cur.execute("SELECT DISTINCT * from products WHERE productID = {} and dateToday = (select max(dateToday) from products where productID = {})".format(productID,productID))
  rows = cur.fetchall()
  
  try:
    newSale = "Yes" if price < rows[0][4] else "No"
  except:
    newSale = "No"
  cur.execute("INSERT INTO products(productID, storeName, brandName, itemName, price, stock, dateToday, newSale, productLink) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)", (productID, storeName, brandName, itemName, price, stock, dateToday, newSale, productLink))
  conn.commit()

cur.close()
conn.close()

print("Curry's products have been webscraped")
