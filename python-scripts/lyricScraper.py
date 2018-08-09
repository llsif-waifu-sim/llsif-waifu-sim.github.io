# -*- encoding: utf-8 -*-
from pykakasi import kakasi,wakati
import tinysegmenter
import requests
from bs4 import BeautifulSoup

test = u"今、私は何か食べている"
segmenter = tinysegmenter.TinySegmenter()
kakasi = kakasi()

localFile = './testLyrics.txt'

siteTabList = ['rōmaji','kanji','english']

def scrapeLyrics(urlRead):
	r = requests.get(urlRead).content
	soup = BeautifulSoup(r,'lxml')
	lyricListDiv = soup.findAll("div",{"class":"tabbertab"})

	for lyricTab in lyricListDiv:
		lyricInnerDiv = lyricTab.find("div")
		if lyricInnerDiv and lyricTab['title'].lower().encode('utf8') in siteTabList:
			print '-----------'
			lyricType = lyricTab['title'].lower()
			text = lyricInnerDiv.getText()
			print lyricType
			print text

			fd = open(lyricType.encode('utf8') + '.txt',"w")
			fd.write(text.encode('utf8'))
			fd.close()

			if lyricType == 'kanji':
				transText = furiganaLineTrans(text)
				fd = open('furigana.txt',"w")
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
t = "http://love-live.wikia.com/wiki/RED_GEM_WINK"
scrapeLyrics(t)
