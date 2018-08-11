# -*- encoding: utf-8 -*-
from pykakasi import kakasi,wakati
import tinysegmenter
import requests
from bs4 import BeautifulSoup
import re

localFile = './testLyrics.txt'
lyricRoot = "../../distribution/llsif-waifu-lyrics"
rootURL = 'http://love-live.wikia.com'



segmenter = tinysegmenter.TinySegmenter()
kakasi = kakasi()


siteTabList = ['rōmaji','kanji','english']

def iterateSongList():
	urlRead = 'http://love-live.wikia.com/wiki/Category:Aqours_Songs'
	#urlRead = 'http://love-live.wikia.com/wiki/Category:Μ%27s_Songs'
	r = requests.get(urlRead).content
	soup = BeautifulSoup(r,'lxml')
	contDiv = soup.find("div",{"class":"mw-content-ltr"})
	for ulTag in contDiv.findAll("ul"):
		for liTag in ulTag.findAll("li"):
			title = liTag.find("a")['title']
			urlRead = rootURL + liTag.find("a")['href']
			scrapeLyrics(title,urlRead)
			

def scrapeLyrics(title,urlRead):
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
		result = conv.do(segWord)
		if segWord == result:
			stitchStr += segWord
		else:
			useStr = segWord + '{' + result +'}'
			stitchStr += useStr

	return stitchStr

#print furiganaLineTrans(test)
#scrapeLocalFile(localFile)
iterateSongList()


