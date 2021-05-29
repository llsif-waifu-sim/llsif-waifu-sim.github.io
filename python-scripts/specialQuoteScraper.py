import os
import idolName
import urllib
from urllib.request import Request, urlopen
import bs4 as BeautifulSoup
import re
import requests
import shutil

batchCounter = 0

# Note, DO NOT START AT AT 28, START AT 55
# The rare cards below 55 will just give you inital selection of the game quote

def writeTextQuoteFile():
        # Write Japanese quotes to text file
        
        quSlFilePath = '../special-quotes/quote-speech-slave.txt'
        destFilePath = '../special-quotes/speech.txt'
        destEnFilePath = '../special-quotes/speech-en.txt'

        # First, we read speechtxt and copy last line
        
        refLine = ''

        for line in os.popen('tail -n 1 ' + destFilePath).readlines():
                refLine = line


        # We take that line, find it in quote-speech-slave.txt, and append the rest to speech.txt
        appendMode = False
        for copyLine in open(quSlFilePath,'r'):
                if appendMode:
                        # Open speech.txt and append the text to that
                        with open(destFilePath,'a') as speechFile:
                                speechFile.write(copyLine)
                        
                        with open(destEnFilePath,'a') as speechFile:
                                speechFile.write(copyLine)

                elif copyLine == refLine:
                        # Then we start appending 
                        appendMode = True
        return


def existInQuoteFile(filePath,textSave):
        # Checks to see if an entry exists in the Rand array or not
        textSaveCmp = ''.join([i for i in textSave if i.isalpha() or i.isdigit()])

        # Only check the first few entries
        for line in os.popen('tail -n 600 ' + filePath).readlines():
                lineCmp = ''.join([i for i in line if i.isalpha() or i.isdigit()])
                
                if textSaveCmp == lineCmp:
                        return True             

        return False

def writeQuoteFile(textSave, batchNum):
        # NOTE: we should add entry by batches
        #print 'Main count: ', batchNum

        # Adds entry to quote id array
        filePath = '../js/quote-id-list.js'

        # Skip if the entry is already in the file
        if existInQuoteFile(filePath, textSave):
                return
        
        # Otherwise, add the entry
        with open(filePath) as rdTmpFile:
                fileData = rdTmpFile.read()

        endMark = '];\n'
        fileData = fileData.replace(endMark,textSave+'\n')

        with open(filePath,'w') as wTmpFile:
                wTmpFile.write(fileData)

    # Adding batches of 
        with open(filePath,'a') as appendFile:
                # Insert a for loop here to write the quote batches
                for i in range(0,batchNum-1):
                        appendFile.write(textSave+'\n')

    # Adding the ending mark
        with open(filePath,'a') as appendFile:
                appendFile.write(endMark)

        return

'''
def addUntransformed(targets, batchCounter):
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
                    downloadPath = prePath + "audio/"+ str(cardID) +'-'+ str(countT) + ".mp3"
                    urllib.urlretrieve(a['href'], downloadPath)
                    countT = countT + 1
                        
            else:
                # If we encounter a Jahttp://s.llsif.org/en/voices/400635.ogg?b3eae9bfpanese quote

                # Write Japanese text to file
                quote_speech_file.write(value.encode('utf8'))
                quote_speech_file.write('\n'.encode())
                # write referencfindChildrene index to file

                ###############
                # TEST: Reenable the line of code below if something goes wrong
                ################
                id_index_file.write(str(cardID) + '\n')
                batchCounter += 1
                        
                #print value
                countT = countT + 1
'''
'''            

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





def extractQuote(begin,last):
    global batchCounter
    prePath = '../special-quotes/'At any time, when level maxed
    prePathDist = '../../distribution/llsif-waifu-special-quotes/special-quotes/'
    assert os.path.exists(prePath)
    assert os.path.exists(prePathDist)
    quote_speech_file = open(prePath + "quote-speech-slave.txt", "wb")
    id_index_file = open(prePath + "id-index-slave.txt", "wb")

    for cardID in range(begin,last+1):
        urlRead = 'https://llsif.org/en/cards/'+ str(cardID)
        print('=======================Id: ',  cardID,'=======================')
        req = Request(urlRead, headers={'User-Agent': 'Mozilla/5.0'})
        
        
        try:
            web_byte = urlopen(req).read()
            web_byte = web_byte.decode('utf-8')
            r = web_byte
        
            soup = BeautifulSoup.BeautifulSoup(r, "lxml")
        except KeyboardInterrupt:
            exit()
        except:
            print('Problem access webpage at id: ', cardID)
            continue

        # Find the table containing all information
        body = soup.find('div',{'id':'voices'})
        urlDict = {}
        try:
            divList = body.find_all('tr')
        except KeyboardInterrupt:
            exit()
        except:
            print("Unable to find table for id ", cardID)
            continue
        divListLen = len(divList) 
        
        
        batchCounter = 0
        count = 0
        
        for tdTag in divList:
            
            try:
                compStr = tdTag.find('td').text
            except:
                continue
            ########

            if len(tdTag.findAll('td')) <= 1:
                continue


            # We check to see if our row matches our desired phrases
            if isTDTagWithAudio(compStr):

                urlLocation = tdTag.findAll('td')[1].find('card-voice')['url'].replace('//s.llsif','http://s.llsif')
                
                ###### We deal with audio data #####
                if urlLocation in urlDict:
                    # We try to prevent downloading duplicate clips
                    continue
                else:
                    # We proceed with downloading audio clip
                    urlDict[urlLocation] = True
                    
                    downloadPath = prePathDist + "audio/"+ str(cardID) +'-'+ str(count) + ".mp3"
                    #urllib.request.urlretrieve(urlLocation, downloadPath)
                    count = count + 1
                    

                                 
                    '''
                    try:
                        r = requests.get(urlLocation, stream=True)
                        with open(downloadPath, 'wb') as f:
                            print(downloadPath)
                            r.raw.decode_content = True
                            shutil.copyfileobj(r.raw, f) 
                    except:
                        print("Problem retrieving audio from this path location: ", )
                        pass
                    '''
                    ######################
                    ########## Now we deal with text data ###########
                    targetText = tdTag.findAll('td')[2].text
                
                
                    quote_speech_file.write(targetText.replace('\n','').encode('utf8'))
                    quote_speech_file.write('\n'.encode())
                    # write reference index to file
                    id_index_file.write(str(cardID).encode() + ',\n'.encode())
            
                    #print value
                    print(cardID, ',')
                    #textCount = textCount + 1

                    batchCounter = batchCounter + 1
                
                
                
                ##########################################
                print(targetText)
                print(urlLocation)
                print('________________')
        
        
        '''
        r = urllib.request.urlopen(urlRead).read()
        soup = BeautifulSoup(r, "lxml")
        
        # I think we can set the counter here

        # Find the table containing all information
        body = soup.find('body')

        hrefIDSearch = '/card/' + str(cardID)
        ATags = body.find_all('a', {'href': hrefIDSearch})
        
        tables = body.find_all('table', {'width': '100%'})
speech-en
        
        # Check if the card is a normal card
        if len(tables) < 1:
            # This is a normal card, skip to next ID
            continue
        

        targetTable = tables[0]

        

        # Find the target row (for the quotes)
        rows = targetTable.findAll('tr', {'class': 'centreunit'})
        
        if len(rows) == 1:
            #print '[',cardID,']'
            
            target = body.findAll(text='At any time, when untransformed')
            addUntransformed(target, batchCounter)
        
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
                
                    for a in cell.findAll('a', href=True):
                        #print a['href']
                        downloadPath = prePathDist + "audio/"+ str(cardID) +'-'+ str(count) + ".mp3"
                        try:
                            urllib.request.urlretrieve(a['href'], downloadPath)
                            count = count + 1
                        except:
                            pass
                 
                else:
                    # If we encounter a Japanese quote
                    #print value
                    # Write Japanese text to file
                    quote_speech_file.write(value.encode('utf8'))
                    quote_speech_file.write('\n'.encode())
                    # write reference index to file
                    id_index_file.write(str(cardID).encode() + ',\n'.encode())
                    
                    #print value
                    print(cardID, ',')
                    textCount = textCount + 1

                    batchCounter = batchCounter + 1
        if len(rows) > 0:
                writeQuoteFile(str(cardID)+',', batchCounter)
        '''
        if batchCounter > 0:
            writeQuoteFile(str(cardID)+',', batchCounter)
        #print(batchCounter)
    quote_speech_file.close()
    id_index_file.close()
    
    writeTextQuoteFile()
    
    
#extractQuote(2000,2010)   
#extractQuote(2146,2803)
extractQuote(2501,2803)
#extractQuote(2728,2803)
