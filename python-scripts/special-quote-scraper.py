from bs4 import BeautifulSoup
import urllib


r = urllib.urlopen('https://sif.kirara.ca/card/996').read()
soup = BeautifulSoup(r)
'''
table = soup.findAll('table')
rows=list()
for row in table.findAll("tr"):
        rows.append(row)
'''

# Find the table containing all information
tables = soup.find('body').find_all('table')
targetTable = tables[1]

# Find the target row (for the quotes)
rows = targetTable.findAll('tr', {'class': 'centreunit'})

for row in rows:
    cells = row.findChildren('td')

    for cell in cells:
        value = cell.string
        print value







