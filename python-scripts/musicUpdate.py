import urllib
import urllib2
from bs4 import BeautifulSoup
import string
import os
import sys


rootURL = 'http://love-live.wikia.com'
#aqoursURL = 'http://love-live.wikia.com/wiki/Category:Aqours_Songs'
aqoursURL = 'http://love-live.wikia.com/wiki/Category:Discography:Aqours'

recordURL = '../records/songRecords.txt'



oggRootPath = '../../distribution/llsif-waifu-songs-ogg/songs/'
mp3RootPath = '../../distribution/llsif-waifu-songs-mp3/songs-mp3/'
aqoursSongExtension = ['aqours-individual','aqours-sub-group','aqours-together','other-idols']

subGroupList = ['cyaron','kiss','azalea']
soloList = ['takami','watanabe','sakurauchi','kurosawa','kunikida','tsushima','matsuura','ohara']


def getNewFileSongName(rootPath, extension):
	# Gets the file that is alphabetically / numerically last
	rankList = []
	for files in os.listdir(rootPath + extension):
		rankList.append(int(files.split(".")[0]))
	return sorted(rankList)[-1] + 1

def songVisited(title):
	with open(recordURL,"r") as tmpFile:
		for line in tmpFile:
			if title.lower() in line:
				return True 
	return False

r = urllib.urlopen(aqoursURL).read()
soup = BeautifulSoup(r,'lxml')

divTar = soup.find("div",{"class":"category-gallery"})

# Set encoding to write unicode
reload(sys)
sys.setdefaultencoding('utf-8')

recFile = open(recordURL,"a")

newSongList = []
problemList = []

for div in divTar.findAll("div"):
	print '---------------'
	songPageURL = rootURL + div.find("a")['href']
	title = div.find("a")['title']

	print title
	
	# Now we are going to inspect the link of the song
	try:
		rSong = urllib.urlopen(songPageURL).read()
		rSoup = BeautifulSoup(rSong,'lxml')
		imgURL = rSoup.find("meta",{"property":"og:image"})['content']
		authorInfoPunc = rSoup.find("section",{"class":"pi-item pi-group pi-border-color"}).find("h2").getText().split(" ")[-1]
		authorInfo = ''.join(c for c in authorInfoPunc if c not in string.punctuation).lower()
		songURLSearch = rSoup.find("div",{"id":"ogg_player_1"}).find("div").find("button")['onclick'].split('"')
		songURL = filter(lambda x: 'http' in x,songURLSearch)[0]
		print imgURL
		print songURL


		if not songVisited(title):
			recFile.write(title.lower())
			recFile.write('\n')
		else:
			continue


		if authorInfo == 'aqours':
			# Aqours all together
			groupAssign = 'Aqours Together'
			print groupAssign
			fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[2])
			numFilePath = str(fileNum) + '.ogg'
			newSongList.append([title,groupAssign])
			print numFilePath
		elif authorInfo in subGroupList:
			groupAssign = 'Aqours Sub-Group'
			print groupAssign
			fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[1])
			numFilePath = str(fileNum) + '.ogg'
			newSongList.append([title,groupAssign])
			print numFilePath
		elif authorInfo in soloList:
			groupAssign = 'Aqours Individual'
			print groupAssign
			fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[0])
			numFilePath = str(fileNum) + '.ogg'
			newSongList.append([title,groupAssign])
			print numFilePath
		else:
			print 'Other idols'
			fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[3])
			numFilePath = str(fileNum) + '.ogg'
			newSongList.append([title,3])
			print numFilePath

	except:
		print 'There was a problem retrieving the song: ' + title
		problemList.append([title,songPageURL])
		continue

recFile.close()


print '\n\n\n'
if newSongList:
	print 'New songs found:'
	for songs in newSongList:
		print '- ' + songs[0] + '   (' + songs[1] + ')'
else:
	print 'No new songs found'


if problemList:
	print '\n\n\n\n'
	print 'There was a problem printing these songs: '
	for songs in problemList:
		print '- ' + songs[0] + ' located at :'
		print '    ' + songs[1]

