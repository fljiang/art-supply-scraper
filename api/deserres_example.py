from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from csv import DictWriter
from datetime import date

listOfURLs = ["https://www.deserres.ca/en/12-pack-picolo-fineliners-0-4-mm", #available
    "https://www.deserres.ca/en/set-of-120-polychromos-colour-pencils-in-wood-case", #available on sale
    'https://www.deserres.ca/en/golden-acrylic-explorer-14-piece-set', #available
    'https://www.deserres.ca/en/xl-pad-marker-9x12-70g-100s' #sold out 
]

def availability(soup):
    try:
        return soup.find('p', {'class':'shipping-info stock-days-2'}).text
    except AttributeError:
        return soup.find('p', {'class':'shipping-info stock-days-1'}).text
    

with open('scraped.csv', 'a+', newline='') as csv_file:
    fieldnames = ['storeName', 'brandName', 'itemName', 'Price', 'Availability', 'Date']
    writer = DictWriter(csv_file, fieldnames=fieldnames)

    for URL in listOfURLs:
        page = urlopen(URL)
        html = page.read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')

        temp = {}
        temp['storeName'] = 'DeSerres'
        temp['brandName'] = soup.find('h2', {'class':'brand'}).text
        temp['itemName'] = soup.find('h1', {'itemprop':'name'}).text
        temp['Price'] = soup.find('span', {'class': 'price', 'itemprop':'price'}).text.split('\n')[-1]
        temp['Availability'] = availability(soup)
        temp['Date'] = date.today()

        writer.writerow(temp)

        