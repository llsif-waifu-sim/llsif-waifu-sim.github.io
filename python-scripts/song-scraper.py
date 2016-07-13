from bs4 import BeautifulSoup
import urllib



urlLink = 'http://love-live.wikia.com/wiki/Love_Live!'
#urlLink = 'http://love-live.wikia.com/wiki/Aishiteru_Banzai!'

r = urllib.urlopen(urlLink).read()

soup = BeautifulSoup(r, "lxml")
#print type(soup)
#print soup.prettify()[0:3000]

#searchStr = 'td'

table = soup.findAll('table')
for tr in table:
    for td in tr.findAll('tr'):
        for href in td.findAll('td'):
            print href
   

