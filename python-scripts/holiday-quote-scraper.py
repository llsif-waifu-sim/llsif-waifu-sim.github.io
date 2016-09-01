from bs4 import BeautifulSoup
import urllib
import idolName

# This script allows you to scrape holidays from individual pages
begin = 907
last = 907

prePath = '../audio/nozomi/holiday/'

holidayList =['When the date is 6-9 to 6-9, if in any unitstate',
'When the date is 7-7 to 7-7, if in any unitstate',
'When the date is 7-18 to 7-18, if in any unitstate',
'When the date is 7-22 to 7-22, if in any unitstate',
'When the date is 9-12 to 9-12, if in any unitstate',
'When the date is 9-27 to 9-27, if in any unitstate',
'When the date is 10-21 to 10-21, if in any unitstate',
'When the date is 10-31 to 10-31, if in any unitstate',
'When the date is 11-1 to 11-1, if in any unitstate',
'When the date is 12-25 to 12-25, if in any unitstate',
'When the date is 12-31 to 12-31, if in any unitstate',
'When the date is 1-1 to 1-1, if in any unitstate',
'When the date is 1-17 to 1-17, if in any unitstate',
'When the date is 2-3 to 2-3, if in any unitstate',
'When the date is 2-14 to 2-14, if in any unitstate',
'When the date is 3-3 to 3-3, if in any unitstate',
'When the date is 3-14 to 3-14, if in any unitstate',
'When the date is 3-15 to 3-15, if in any unitstate',
'When the date is 3-31 to 3-31, if in any unitstate',
'When the date is 4-1 to 4-1, if in any unitstate',
'When the date is 4-19 to 4-19, if in any unitstate',
'When the date is 5-5 to 5-5, if in any unitstate']

def addUntransformed(targets, dayCounter):

    mp3Counter = 0
    for tdT in targets:
        
        tempTD = tdT.parent
        targetTable = tempTD.parent
        #print targetTable
        countT = 0
        
        for td in targetTable:
            value = td.string
            

            if value == "" or value == " " or value=='\n':
                continue

            if countT == 0:
                countT = countT + 1
                continue
            
            
            if value is None:
                # If we encounter an mp3 file               
                for a in td.findAll('a', href=True):

                    downloadPath = prePath + str(dayCounter) +'-'+ str(mp3Counter) + ".mp3"
                    urllib.urlretrieve(a['href'], downloadPath)
                    countT = countT + 1
                    mp3Counter = mp3Counter + 1

                 
            else:
                # If we encounter a Japanese quote
                # Write Japanese text to file
                holiday_speech_file.write(value.encode('utf8') + '\n')

                countT = countT + 1
   



holiday_speech_file = open(prePath + "speech.txt", "w")

for cardID in range(begin,last+1):

    urlRead = 'https://sif.kirara.ca/card/'+ str(cardID)
    r = urllib.urlopen(urlRead).read()
    soup = BeautifulSoup(r, "lxml")


    # Find the table containing all information
    body = soup.find('body')

    hrefIDSearch = '/card/' + str(cardID)
    ATags = body.find_all('a', {'href': hrefIDSearch})
    
    tables = body.find_all('table', {'width': '100%'})


    # Check if the card is a normal card
    if len(tables) <= 1:
        # This is a normal card, skip to next ID
        continue


    targetTable = tables[1]

    

    # Find the target row (for the quotes)
    rows = targetTable.findAll('tr')

    dayCounter = 0
    
    for dateText in holidayList:
        target = body.findAll(text=dateText)

        addUntransformed(target, dayCounter)

        print dateText
        
        dayCounter = dayCounter + 1

        
holiday_speech_file.close()
print 'Done!'
