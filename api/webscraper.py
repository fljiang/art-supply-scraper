import os
from urllib.request import urlopen
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date
import os
import psycopg2 as db
import ssl
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

products_file = open("api/product_catalog.csv", "r")

def availability(soup):
    isAvailable = soup.find("td", {"class": "PCContentAddQty"}).text == ""
    if isAvailable:
        return "Sold Out Online"
    else:
        return "Available Online"


conn = db.connect(host="ec2-35-174-35-242.compute-1.amazonaws.com",
  user="tbnywkvrfotgxw",
  password="e815e843be1ccfd95f0700c8a3f252f660d9a3124f9e2be8f6837e85f28e9044",
  database="d6frtg9f11e0qr",
  sslmode="require")
cur = conn.cursor()


context = ssl._create_unverified_context()
options = webdriver.ChromeOptions()
options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
options.add_argument("--no-sandbox")
options.add_argument("--headless")
options.add_argument("--disable-dev-sh-usage")

driver = webdriver.Chrome(executable_path = os.environ.get("CHROMEDRIVER_PATH"), chrome_options=options)

for line in products_file:
    product = line.strip("\n").split(",")
    itemName = product[0]
    storeName = product[1]
    productId = product[2]
    productLink = product[3]
    
    print(productLink)

    if product[1] == "DeSerres":
        page = urlopen(productLink, context=context)
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        try:
            price = float(soup.find("span", {"class":"price price--final"}).text.strip("\n").strip("$"))
        except:
            price = float(soup.find("span", {"class": "price__value price__value--final"}).text.strip("\n").strip("$"))
        stock = soup.find("span", {"class": "availability__label availability__label--in-stock"}).text

    elif product[1] == "Curry's":
        page = urlopen(productLink, context=context)
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        price = float(soup.find_all("td", {"class": "PCContentYourPrc"})[1].text.strip("$"))
        stock = "Sold Out Online" if soup.find("td", {"class": "PCContentAddQty"}).text == "" else "Available Online"

    else: # Above Ground
        driver.get(productLink)
        html = driver.page_source
        soup = BeautifulSoup(html, "lxml")

        price = soup.find("span", {"class":"red_price"}).text.split("$")[1].split("/")[0]
        stock = "Available Online" if soup.find("div", {"class":"celldata"}).text else "Sold Out Online"

    dateToday = date.today()
    cur.execute("SELECT DISTINCT * from products WHERE productID = {} and dateToday = (select max(dateToday) from products where productID = {})".format(productId, productId))
    rows = cur.fetchall()
        #If the product is newly added (no previous record)
    try:
        newSale = "Yes" if price < rows[0][4] else "No"
    except:
        newSale = "No"
        
    cur.execute("INSERT INTO products(productID, storeName, itemName, price, stock, dateToday, newSale, productLink) VALUES (%s, %s,  %s, %s, %s, %s, %s, %s);",(productId, storeName, itemName, price, stock, dateToday, newSale, productLink))
    conn.commit()

print("Webscrape successful")