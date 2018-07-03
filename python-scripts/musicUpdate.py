import urllib
import urllib2
import requests
import string
import os
import sys
from PIL import Image
from io import BytesIO
from bs4 import BeautifulSoup


rootURL = 'http://love-live.wikia.com'
#aqoursURL = 'http://love-live.wikia.com/wiki/Category:Aqours_Songs'
aqoursURL = 'http://love-live.wikia.com/wiki/Category:Discography:Aqours'

recordURL = '../records/songRecords.txt'
tmpDir = '../records/temp'

rootAlbumCover = '../images/album-covers'


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



os.system('mkdir ' + tmpDir)

for div in divTar.findAll("div"):
	print '---------------'
	songPageURL = rootURL + div.find("a")['href']
	title = div.find("a")['title']

	print title
	
	# Now we are going to inspect the link of the song
	rSong = urllib.urlopen(songPageURL).read()
	rSoup = BeautifulSoup(rSong,'lxml')
	imgURL = rSoup.find("meta",{"property":"og:image"})['content']

	# Check to see if the song page has an audio file
	try:
		authorInfoPunc = rSoup.find("section",{"class":"pi-item pi-group pi-border-color"}).find("h2").getText().split(" ")[-1]
	except:
		print 'There was a problem retrieving the song: ' + title
		problemList.append([title,songPageURL])
		continue
		
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
		continue

		songSavePathOgg = oggRootPath + aqoursSongExtension[2] + '/' + str(fileNum) + '.ogg'
		songSavePathMp3 = mp3RootPath + aqoursSongExtension[2] + '/' + str(fileNum) + '.mp3'

		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.ogg')
		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.mp3')
		urllib.urlretrieve(songURL, songSavePathOgg)
		urllib.urlretrieve(songURL, songSavePathMp3)

		response = requests.get(imgURL)
		img = Image.open(BytesIO(response.content))
		#img.save(tmpDir + '/' + str(fileNum)+ '.jpg')
		img.save(rootAlbumCover + '/' + aqoursSongExtension[2] + '/' + str(fileNum)+ '.jpg')
		img.close()

	elif authorInfo in subGroupList:
		groupAssign = 'Aqours Sub-Group'
		print groupAssign
		fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[1])
		numFilePath = str(fileNum) + '.ogg'
		newSongList.append([title,groupAssign])
		continue

		songSavePathOgg = oggRootPath + aqoursSongExtension[1] + '/' + str(fileNum) + '.ogg'
		songSavePathMp3 = mp3RootPath + aqoursSongExtension[1] + '/' + str(fileNum) + '.mp3'

		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.ogg')
		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.mp3')
		urllib.urlretrieve(songURL, songSavePathOgg)
		urllib.urlretrieve(songURL, songSavePathMp3)

		response = requests.get(imgURL)
		img = Image.open(BytesIO(response.content))
		#img.save(tmpDir + '/' + str(fileNum)+ '.jpg')
		img.save(rootAlbumCover + '/' + aqoursSongExtension[1] + '/' + str(fileNum)+ '.jpg')
		img.close()


	elif authorInfo in soloList:
		groupAssign = 'Aqours Individual'
		print groupAssign
		fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[0])
		numFilePath = str(fileNum) + '.ogg'
		newSongList.append([title,groupAssign])
		continue

		songSavePathOgg = oggRootPath + aqoursSongExtension[0] + '/' + str(fileNum) + '.ogg'
		songSavePathMp3 = mp3RootPath + aqoursSongExtension[0] + '/' + str(fileNum) + '.mp3'

		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.ogg')
		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.mp3')
		urllib.urlretrieve(songURL, songSavePathOgg)
		urllib.urlretrieve(songURL, songSavePathMp3)

		response = requests.get(imgURL)
		img = Image.open(BytesIO(response.content))
		#img.save(tmpDir + '/' + str(fileNum)+ '.jpg')
		img.save(rootAlbumCover + '/' + aqoursSongExtension[0] + '/' + str(fileNum)+ '.jpg')
		img.close()
	else:
		print 'Other idols'
		fileNum = getNewFileSongName(oggRootPath, aqoursSongExtension[3])
		numFilePath = str(fileNum) + '.ogg'
		newSongList.append([title,groupAssign])
		continue

		songSavePathOgg = oggRootPath + aqoursSongExtension[3] + '/' + str(fileNum) + '.ogg'
		songSavePathMp3 = mp3RootPath + aqoursSongExtension[3] + '/' + str(fileNum) + '.mp3'

		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.ogg')
		#urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.mp3')
		urllib.urlretrieve(songURL, songSavePathOgg)
		urllib.urlretrieve(songURL, songSavePathMp3)

		response = requests.get(imgURL)
		img = Image.open(BytesIO(response.content))
		#img.save(tmpDir + '/' + str(fileNum)+ '.jpg')
		img.save(rootAlbumCover + '/' + aqoursSongExtension[3] + '/' + str(fileNum)+ '.jpg')
		img.close()


recFile.close()
os.system('rm -rf ' + tmpDir)

print '\n\n\n'
if newSongList:
	togetherList = []
	subUnitList = []
	soloList = []
	otherList = []

	print 'New songs found:'
	for songs in newSongList:
		print '- ' + songs[0] + '   (' + songs[1] + ')'

		if songs[1].lower() == 'aqours together':
			togetherList.append(songs[0])
		elif songs[1].lower() == 'aqours sub-group':
			subUnitList.append(songs[0])
		elif songs[1].lower() == 'aqours individual':
			soloList.append(songs[0])
		else:
			otherList.append(songs[0])


	print '\n\n\n'
	print '-------- Announcement Information --------'

	print '\n\n\n'
	print 'Git Commit message: '
	sys.stdout.write("'Adding songs ")
	for songs in newSongList:
		outStr = '"' + songs[0] + '", '
		sys.stdout.write(outStr)
	print("'")




	print '\n\n\n'
	print 'Adding announcement message:'
	sys.stdout.write("'Adding songs ")
	if togetherList:
		for song in togetherList:
			outStr = '"' + song + '", '
			sys.stdout.write(outStr)
		sys.stdout.write("to Aqours Together, ")
	if subUnitList:
		for song in subUnitList:
			outStr = '"' + song + '", '
			sys.stdout.write(outStr)
		sys.stdout.write("to Aqours Sub-Unit, ")
	if soloList:
		for song in soloList:
			outStr = '"' + song + '", '
			sys.stdout.write(outStr)
		sys.stdout.write("to Aqours Others, ")
	if otherList:
		for song in otherList:
			outStr = '"' + song + '", '
			sys.stdout.write(outStr)
		sys.stdout.write("to Others ")
	print "'"
else:
	print 'No new songs found'


if problemList:
	print '\n\n\n\n'
	print 'There was a problem printing these songs:\n'
	for songs in problemList:
		print '- ' + songs[0] + ' located at :'
		print '    ' + songs[1]


