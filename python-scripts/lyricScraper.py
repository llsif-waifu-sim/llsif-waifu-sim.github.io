# -*- encoding: utf-8 -*-
from pykakasi import kakasi,wakati
import tinysegmenter
import requests
from bs4 import BeautifulSoup
import re
import os

#localFile = './testLyrics.txt'
lyricRoot = "../../distribution/llsif-waifu-lyrics"
rootURL = 'http://love-live.wikia.com'

transDict = {u'君':u'きみ',
        u'見':u'み',
        u'色':u'いろ',
        u'来':u'き'}

segmenter = tinysegmenter.TinySegmenter()
kakasi = kakasi()

enCount = 0
jpCount = 0

siteTabList = ['rōmaji','kanji','english']

def iterateSongList(urlRead='http://love-live.wikia.com/wiki/Category:Aqours_Songs'):
        r = requests.get(urlRead).content
        soup = BeautifulSoup(r,'lxml')
        contDiv = soup.find("div",{"class":"mw-content-ltr"})
        for ulTag in contDiv.findAll("ul"):
                for liTag in ulTag.findAll("li"):
                        title = None
                        
                        #print(liTag)
                        #title = liTag.find("a").find("img")["alt"]
                        #urlRead = rootURL + liTag.find("a")['href']
                        try:
                            title = liTag.find("a").find("img")["alt"]
                            urlRead = rootURL + liTag.find("a")['href']
                        except:
                            #print('We have an error 1!')
                            ##exit()
                            pass
                            
                        if title is None:
                            try:
                                title = liTag.find("a")['title']
                            except:
                                pass
                                #print('We have an error 2!')
                                #exit()
                        if title is None:
                            continue

                        urlRead = rootURL + liTag.find("a")['href']
                        #title = liTag.find("a")['title']
                        scrapeLyrics(title,urlRead)
                        
                        # We count occurrance for lyrics
                        if enCount != jpCount:
                                print('    (Lyrics misaligned)')
                                fpPath = lyricRoot + '/revision.txt'
                                fp = open(fpPath.encode('utf8'), 'a')
                                fp.write(str(title.encode('utf8')) +'\n')
                                fp.write('JP: ' + str(jpCount) + ' - EN: ' + str(enCount)+'\n')
                                fp.write('--------------------------\n')
                                fp.close()


                                title = ''.join(ch for ch in title if ch.isalnum()).lower()

                                tmpStr = '"'+title + '",\n'
                                forbidFp.write(str(tmpStr.encode('utf8')))

def scrapeLyrics(title,urlRead):
        global enCount
        global jpCount

        r = requests.get(urlRead).content
        soup = BeautifulSoup(r,'lxml')
        #lyricListDiv = soup.findAll("div",{"class":"tabbertab"})
        lyricListDiv = soup.findAll("div",{"class":"poem"})
        

        #tabberDiv = soup.findAll("div",{"class":"tabbertab","title":"Kanji"})
        #tabberDiv = soup.findAll("div",{"class":"tabbertab","title":["Rōmaji","Kanji","English"]})

        print('-----------')
        print(title)
        
        tabList = ["Rōmaji","Kanji","English"]
        for i,lyricTab in enumerate(lyricListDiv):
                #print(lyricTab.text)
                #exit()
                #print('________-')
                lyricType = tabList[i]
                text = lyricTab.text 

                title = title.replace(" ","")
                title = re.sub(r'\W+', '', title).lower()


                #print(text)


                if lyricType == 'English':
                        enCount = text.count("\n")      

                if lyricType == 'Rōmaji':
                        filePath = lyricRoot+'/romaji/'+title+'-romaji.txt'
                        fd = open(filePath,"wb")
                else:
                        filePath = lyricRoot+'/'+lyricType.lower()+'/'+title.replace(' ','')+'-'+lyricType.lower()+'.txt'
                        fd = open(filePath.encode('utf8'),"wb")
                fd.write(text.encode('utf8'))
                fd.close()



                if lyricType == 'Kanji':
                        # We already wrote the kanji text, so we will write the furigana path
                        filePath = lyricRoot+'/furigana/'+title+'-furigana.txt'
                        transText = furiganaLineTrans(text)
                        jpCount = transText.count("\n") 
                        fd = open(filePath,"wb")
                        fd.write(transText.encode('utf8'))
                        print('  Written') 
                        fd.close()
                '''
                lyricInnerDiv = lyricTab.find("div")
                
                #print(lyricInnerDiv)
                ########## Problem is with this if statement #######
                if lyricInnerDiv and lyricTab['title'].lower().encode('utf8') in siteTabList:
                        #print '-----------'
                        lyricType = lyricTab['title'].lower().encode('utf8')
                        text = lyricInnerDiv.getText()
                        print(text)
                        #exit()
                        #print lyricType
                        #print text

                        title = title.replace(" ","")
                        title = re.sub(r'\W+', '', title).lower()

                        if lyricType == 'english':
                                enCount = text.count("\n")      

                        if lyricType == 'rōmaji':
                                filePath = lyricRoot+'/romaji/'+title+'-romaji.txt'
                                fd = open(filePath,"w")
                        else:
                                filePath = lyricRoot+'/'+lyricType+'/'+title+'-'+lyricType+'.txt'
                                fd = open(filePath.encode('utf8'),"w")
                        fd.write(text.encode('utf8'))
                        fd.close()



                        if lyricType == 'kanji':
                                # We already wrote the kanji text, so we will write the furigana path
                                filePath = lyricRoot+'/furigana/'+title+'-furigana.txt'
                                transText = furiganaLineTrans(text)
                                jpCount = transText.count("\n") 
                                fd = open(filePath,"w")
                                fd.write(transText.encode('utf8'))
             
                                fd.close()
                #exit()
                '''
        #exit()
        return

def scrapeLocalFile(path):
        for lines in open(path,"r"):
                lines = lines.decode('utf-8')
                print(furiganaLineTrans(lines))


def furiganaLineTrans(text):
        kakasi.setMode("J","H") 
        kakasi.setMode("r","Hepburn") 
        conv = kakasi.getConverter()

        stitchStr = ''
        for segWord in segmenter.tokenize(text):
                result = ""
                
                #if transDict.has_key(segWord):
                if segWord in transDict:
                        result = transDict[segWord]
                else:
                        result = conv.do(segWord)
                if segWord == result:
                        stitchStr += segWord
                else:
                        result = result.strip().replace("\n","")
                        useStr = segWord + '  { ' + result +' }  '
                        stitchStr += useStr

        return stitchStr


fileLoc = lyricRoot + '/revision.txt'
os.system('rm ' + fileLoc + '; touch ' + fileLoc)

####
fpPath = '../js/list/sideBySideENForbidList.js'
os.system('rm ' + fpPath)
forbidFp = open(fpPath.encode('utf8'),"w")
forbidFp.write('var forbiddenSideBySide = [\n') 
forbidFp.close


forbidFp = open(fpPath.encode('utf8'),"a")
####

#urlRead = 'http://love-live.wikia.com/wiki/Category:PERFECT_Dream_Project_Songs'
#iterateSongList(urlRead)
'''
urlRead = 'http://love-live.wikia.com/wiki/Category:Aqours_Songs'
iterateSongList(urlRead)
urlRead = 'http://love-live.wikia.com/wiki/Category:Μ%27s_Songs'
iterateSongList(urlRead)

urlRead = "http://love-live.wikia.com/wiki/Category:A-RISE_Songs"
iterateSongList(urlRead)
urlRead = "http://love-live.wikia.com/wiki/Category:Saint_Snow_Songs"
iterateSongList(urlRead)
'''

urlRead = 'https://love-live.fandom.com/wiki/Category:Discography:Nijigaku'
iterateSongList(urlRead)


forbidFp.write('];')
forbidFp.close()
