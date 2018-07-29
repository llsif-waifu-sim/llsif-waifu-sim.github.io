import os

rootDir = '../js/songs'
fileList = ['aqoursSolo.js','aqoursSub.js','aqoursTogether.js','otherIdols.js']

resFile = open('./updateSongTmp.txt','w')

for songFile in fileList:

	fp = open(rootDir + '/' + songFile,'r')

	i = 0
	lim = 2
	for line in fp:
		
		i += 1
		if i < lim:
			continue

		try:
			splitRes = line.split(',')[0]
			if '"' not in splitRes:
				resStr = splitRes.split("'")[1].lower()
			else:
				resStr = splitRes.split('"')[1].lower()
		
		except:
			continue
		print resStr
		resFile.write(resStr+'\n')
resFile.close()
