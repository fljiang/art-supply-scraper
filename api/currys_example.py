from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date



listOfURLs = ["https://www.currys.com/product.htm?Product=SK50200&Source=Category&Category=SAKURA_PIGMA_SENSEI_MARKERS",
    "https://www.currys.com/product.htm?Product=MUNG12&Source=Category&Category=MUNGYO_OIL_PASTEL_SETS"]


def availability(soup):
    isAvailable = soup.find('td', {'class':"PCContentAddQty"}).text == ''
    if isAvailable:
        return "No stock"
    else:
        return "Available to purchase"

with open('scraped.csv', 'a+', newline='') as csv_file:
    fieldnames = ['storeName', 'brandName', 'itemName', 'Price', 'Availability', 'Date']
    writer = DictWriter(csv_file, fieldnames=fieldnames)

    for URL in listOfURLs:
        page = urlopen(URL)
        html = page.read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')

        temp = {}
        temp['storeName'] = "Curry's"
        temp['brandName'] = soup.find('td', {'class':"PCContentDesc"}).text.split()[0]
        temp['itemName'] = soup.find('td', {'class':"PCContentDesc"}).text.split()[1:]
        temp['Price'] = soup.find_all('td', {'class':"PCContentYourPrc"})[1].text
        temp['Availability'] = availability(soup)
        temp['Date'] = date.today()

        writer.writerow(temp)
