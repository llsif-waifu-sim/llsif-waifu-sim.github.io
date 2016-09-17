from bs4 import BeautifulSoup
import urllib
import idolName


# Note, DO NOT START AT AT 28, START AT 55
# The rare cards below 55 will just give you inital selection of the game quotes



def addUntransformed(targets):
    for tdT in targets:

        tempTD = tdT.parent
        targetTable = tempTD.parent

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

                z = 1 + 1
               
                for a in td.findAll('a', href=True):
                    downloadPath = prePath + str(cardID) +'-'+ str(countT) + ".mp3"
                    urllib.urlretrieve(a['href'], downloadPath)
                    countT = countT + 1
                        
            else:
                # If we encounter a Japanese quote

                # Write Japanese text to file
                quote_speech_file.write(value.encode('utf8') + '\n')
                # write referencfindChildrene index to file
                id_index_file.write(str(cardID) + '\n')
                        
                #print value
                countT = countT + 1
            

def checkNormal():
    # This function is unnecessary at the moment
    # Get the name of the card
    for tags in ATags:
        spanAll = tags.findChildren('span')
        for span in spanAll:
            name = span.string

            if idolName.idol2path(name):
                # This is not normal card
                isNormal = False
                break


def extractQuote(begin,last):
    prePath = '../special-quotes/'

    quote_speech_file = open(prePath + "quote-speech-slave.txt", "w")
    id_index_file = open(prePath + "id-index-slave.txt", "w")

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
        rows = targetTable.findAll('tr', {'class': 'centreunit'})

        if len(rows) == 1:
            #print '[',cardID,']'
            
            target = body.findAll(text='At any time, when untransformed')
            addUntransformed(target)
        #elif len(rows) > 0:
            #print '[',cardID,']'

        count = 0
        for row in rows:
            cells = row.findChildren('td')

            
            textCount = 0   
            for cell in cells:
                value = cell.string

                if textCount == 0:
                    # Helps us skip the first column
                    textCount = textCount + 1
                    continue


                if value is None:
                    # If we encounter an mp3 file
                    z =  + 1
                
                    for a in cell.findAll('a', href=True):
                        downloadPath = prePath + str(cardID) +'-'+ str(count) + ".mp3"
                        urllib.urlretrieve(a['href'], downloadPath)

                        count = count + 1
                 
                else:
                    # If we encounter a Japanese quote

                    # Write Japanese text to file
                    quote_speech_file.write(value.encode('utf8') + '\n')
                    # write reference index to file
                    id_index_file.write(str(cardID) + ',\n')
                    
                    #print value
                    print cardID, ','
                    textCount = textCount + 1


    quote_speech_file.close()
    id_index_file.close() 






