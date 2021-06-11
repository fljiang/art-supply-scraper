from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date



listOfURLs = ["https://www.currys.com/product.htm?Product=SK50200&Source=Category&Category=SAKURA_PIGMA_SENSEI_MARKERS",
    "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS"]

idDict = {"https://www.currys.com/product.htm?Product=SK50200&Source=Category&Category=SAKURA_PIGMA_SENSEI_MARKERS": 100,
    "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS":101}



def availability(soup):
    isAvailable = soup.find('td', {'class':"PCContentAddQty"}).text == ''
    if isAvailable:
        return "Sold Out Online"
    else:
        return "Available Online"


'''
## Writing to static csv.

with open('scraped.csv', 'a+', newline='') as csv_file:
    fieldnames = ['productID','storeName', 'brandName', 'itemName', 'Price', 'Availability', 'Date']
    writer = DictWriter(csv_file, fieldnames=fieldnames)

    for URL in listOfURLs:
        page = urlopen(URL)
        html = page.read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')

        temp = {}
        temp['productID'] = idDict[URL]
        temp['storeName'] = "Curry's"
        temp['brandName'] = soup.find('td', {'class':"PCContentDesc"}).text.split()[0]
        temp['itemName'] = ' '.join(soup.find('td', {'class':"PCContentDesc"}).text.split()[1:])
        temp['Price'] = soup.find_all('td', {'class':"PCContentYourPrc"})[1].text
        temp['Availability'] = availability(soup)
        temp['Date'] = date.today()

        writer.writerow(temp)
'''
## Connecting and webscraping into the DB

import os 
import psycopg2 as db
import ssl

#DB credentials as below
conn = db.connect(host='ec2-35-174-35-242.compute-1.amazonaws.com', 
    user='tbnywkvrfotgxw', 
    password='e815e843be1ccfd95f0700c8a3f252f660d9a3124f9e2be8f6837e85f28e9044', 
    database='d6frtg9f11e0qr',
    sslmode = 'require')
cur = conn.cursor()

context = ssl._create_unverified_context()

for URL in listOfURLs:
    page = urlopen(URL, context=context)
    html = page.read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    productID = idDict[URL]
    storeName = "Curry's"
    brandName = soup.find('td', {'class':"PCContentDesc"}).text.split()[0]
    itemName = ' '.join(soup.find('td', {'class':"PCContentDesc"}).text.split()[1:])
    Price = float(soup.find_all('td', {'class':"PCContentYourPrc"})[1].text.strip("$"))
    Availability = availability(soup)
    Date = date.today()

    cur.execute("INSERT INTO products(productID, storeName, brandName, itemName, Price, Availability, Date) VALUES (%s, %s, %s, %s, %s, %s, %s)",
    (productID, storeName, brandName, itemName, Price, Availability, Date))
    conn.commit()

cur.close()
conn.close()


'''
# Querying for products
#  Example on productID 101
cur = conn.cursor()
searchInput = 101
cur.execute("SELECT * from products")# WHERE productID = {}".format(searchInput))
rows = cur.fetchall()
for row in rows:
    print(row)
'''