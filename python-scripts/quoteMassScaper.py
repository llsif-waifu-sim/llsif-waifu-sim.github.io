from bs4 import BeautifulSoup
import urllib
import urllib.request as ur
import os
import idolName


# Note, DO NOT START AT AT 28, START AT 55
# The rare cards below 55 will just give you inital selection of the game quote

quoteTextCount = 0
quoteIDCount = 0

'''
def addUntransformed(targets):
    global quoteTextCount
    global quoteIDCount

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

                for a in td.findAll('a', href=True):
                    print('Downloaded audio file')
                    countT = countT + 1
                        
            else:
                # If we encounter a Japanese quote

                # Write Japanese text to file
                #quote_speech_file.write(value.encode('utf8') + '\n')
                print(value.encode('utf8'), '\n')
                quoteTextCount += 1

                # write referencfindChildrene index to file

                ###############
                # TEST: Reenable the line of code below if something goes wrong
                ################
                #id_index_file.write(str(cardID) + '\n')
                print(str(cardID), '\n')
                        
                quoteIDCount += 1
                #print value
                countT = countT + 1
            
'''

def txtPro(text):
    #text = text.replace(',','')
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    text = text.replace(' ','')
    return text

def isTDTagWithAudio(compStr):
    if txtPro(compStr) == txtPro("At any time, when unidolized"):
        return True
    if txtPro(compStr) == txtPro("At any time, when idolized"):
        return True

    if txtPro(compStr) == txtPro("At any time, when level maxed"):
        return True
    if txtPro(compStr) == txtPro("At any time, when bond maxed"):
        return True
    if txtPro(compStr) == txtPro("At any time, when bond + level maxed"):
        return True
    if txtPro(compStr) == txtPro("At any time, when bond maxed"):
        return True
    if txtPro(compStr) == txtPro("At any time, when bond + level maxed"):
        return True
    if txtPro(compStr) == txtPro("Home screen (during cameo appearance) (bond maxed)"):
        return True

    if txtPro(compStr) == txtPro("Home screen (during cameo appearance) (bond + level maxed)"):
        return True

    return False




def extractQuoteTest(begin,last):
    global quoteTextCount
    global quoteIDCount

    prePath = '../special-quotes/'
    prePathDist = '../../distribution/llsif-waifu-special-quotes/special-quotes/'
    assert os.path.exists(prePath)
    assert os.path.exists(prePathDist)

    for cardID in range(begin,int(last)+1):
        print('------------------- ', cardID, ' ---------------------\n')
        #urlRead = 'https://sif.kirara.ca/card/'+ str(cardID)
        urlRead = 'https://llsif.org/en/cards/'+ str(cardID)
	'''
        #r = urllib.urlopen(urlRead).read()
        r = ur.urlopen(urlRead).read()
        soup = BeautifulSoup(r, "lxml")
        

        # Find the table containing all information
        body = soup.find('body')
        #body = soup.find('div',{'id':'voices'})

        hrefIDSearch = '/card/' + str(cardID)
        #ATags = body.find_all('a', {'href': hrefIDSearch})
        
        #tables = body.find_all('table', {'width': '100%'})
        #table = body.find_all('table',{'class':'table-striped'})
        table = body.find_all('table')

        print(table)
        exit() 
        # Check if the card is a normal card
        if len(tables) < 1:
            # This is a normal card, skip to next ID
            print('This is a normal card')
            continue
        

        targetTable = tables[0]

        

        # Find the target row (for the quotes)
        rows = targetTable.findAll('tr', {'class': 'centreunit'})
        if len(rows) == 1:
            #print '[',cardID,']'
            
            target = body.findAll(text='At any time, when untransformed')
            addUntransformed(target)
        #elif len(rows) > 0:
            #print '[',cardID,']'

        
        
        count = 0

        # I think we can set the counter here
        batchCounter = 0
        #print 'rows'
        for row in rows:
            cells = row.findChildren('td')

            
            textCount = 0   
            #print 'cells'
            for cell in cells:
                value = cell.string

                if textCount == 0:
                    # Helps us skip the first column
                    #print 'Skipping first column'
                    textCount = textCount + 1
                    continue

                if value is None:
                    # If we encounter an mp3 file
                    for a in cell.findAll('a', href=True):
                        print('Downloaded audio file')

                        count = count + 1
                else:
                    # If we encounter a Japanese quote
                    #print value
                    # Write Japanese text to file
                    print(value, '\n')
                    quoteTextCount += 1
                    #quote_speech_file.write(value.encode('utf8') + '\n')

                    # write reference index to file
                    #id_index_file.write(str(cardID) + ',\n')
                    print('[',cardID, '],\n')
                    quoteIDCount += 1
                    
                    #print value
                    textCount = textCount + 1

                batchCounter = batchCounter + 1
        print('End')
        '''
    #quote_speech_file.close()
    #id_index_file.close()

    #writeTextQuoteFile()


print('Enter the starting ID: ')
start = int(input())

print('Enter end ID:')
end = int(input())

extractQuoteTest(start,end)

print('Text: ', quoteTextCount)
print('ID: ',  quoteIDCount)

