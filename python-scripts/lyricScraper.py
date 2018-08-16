# -*- encoding: utf-8 -*-
from pykakasi import kakasi,wakati
import tinysegmenter
import requests
from bs4 import BeautifulSoup
import re
import os

localFile = './testLyrics.txt'
lyricRoot = "../../distribution/llsif-waifu-lyrics"
rootURL = 'http://love-live.wikia.com'

transDict = {u'君':u'きみ',
	u'見':u'み',
	u'色':u'いろ'}

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
			title = liTag.find("a")['title']
			urlRead = rootURL + liTag.find("a")['href']
			scrapeLyrics(title,urlRead)
			
			# We count occurrance for lyrics
			if enCount != jpCount:
				print '    (Lyrics misaligned)'
				fpPath = lyricRoot + '/revision.txt'
				fp = open(fpPath.encode('utf8'), 'a')
				fp.write(title.encode('utf8') + '\n')
				fp.write('JP: ' + str(jpCount) + ' - EN: ' + str(enCount)+'\n')
				fp.write('--------------------------\n')
				fp.close()


				title = ''.join(ch for ch in title if ch.isalnum()).lower()

				tmpStr = '"'+title + '",\n'
				forbidFp.write(tmpStr.encode('utf8'))

def scrapeLyrics(title,urlRead):
	global enCount
	global jpCount

	r = requests.get(urlRead).content
	soup = BeautifulSoup(r,'lxml')
	lyricListDiv = soup.findAll("div",{"class":"tabbertab"})

	print '-----------'
	print title

	for lyricTab in lyricListDiv:
		lyricInnerDiv = lyricTab.find("div")
		if lyricInnerDiv and lyricTab['title'].lower().encode('utf8') in siteTabList:
			#print '-----------'
			lyricType = lyricTab['title'].lower().encode('utf8')
			text = lyricInnerDiv.getText()
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
	return

def scrapeLocalFile(path):
	for lines in open(path,"r"):
		lines = lines.decode('utf-8')
		print furiganaLineTrans(lines)


def furiganaLineTrans(text):
	kakasi.setMode("J","H") 
	kakasi.setMode("r","Hepburn") 
	conv = kakasi.getConverter()

	stitchStr = ''
	for segWord in segmenter.tokenize(text):
		result = ""
		if transDict.has_key(segWord):
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


urlRead = 'http://love-live.wikia.com/wiki/Category:Aqours_Songs'
iterateSongList(urlRead)
urlRead = 'http://love-live.wikia.com/wiki/Category:Μ%27s_Songs'
iterateSongList(urlRead)

urlRead = "http://love-live.wikia.com/wiki/Category:A-RISE_Songs"
iterateSongList(urlRead)
urlRead = "http://love-live.wikia.com/wiki/Category:Saint_Snow_Songs"
iterateSongList(urlRead)

forbidFp.write('];')
forbidFp.close()
