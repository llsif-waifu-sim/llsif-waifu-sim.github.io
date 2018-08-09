# -*- encoding: utf-8 -*-
from pykakasi import kakasi,wakati
import tinysegmenter

#test = u"今、私は何か食べている"
test = u"「聞かせてよ　あなたの夏のプランを」"
segmenter = tinysegmenter.TinySegmenter()
kakasi = kakasi()

localFile = './testLyrics.txt'

def scrapeLyrics(url):
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
scrapeLocalFile(localFile)
