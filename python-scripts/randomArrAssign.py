import os

def existInRandFile(filePath,textSave):
	# Checks to see if an entry exists in the Rand array or not
	titleCmp = ''.join([i for i in textSave if i.isalpha() or i.isdigit()])

	# Only check the last few entries of Randarray
	for line in os.popen('tail -n 6 ' + filePath).readlines():
		lineCmp = ''.join([i for i in line if i.isalpha() or i.isdigit()])
		if titleCmp == lineCmp:
			return True
	
	return False

def addToMainFile(idNum, name, text_to_save):
	# Adds entry to main id array
	filePath = '../js/id-log.js'

	# If entry already exists, then we do not bother adding it
	if existInRandFile(filePath,text_to_save):
		return

	if existInRandFile(filePath,text_to_save):
		return

	with open(filePath) as rdTmpFile:
		fileData = rdTmpFile.read()

	endMark = '];\n'
	fileData = fileData.replace(endMark,text_to_save)

	with open(filePath,'w') as wTmpFile:
		wTmpFile.write(fileData)

	# Adding the ending mark
	with open(filePath,'a') as appendFile:
		appendFile.write(endMark)
	return 

def addToRandFile(idNum,name,text_to_save):
	rootPath = '../js/characters/'

	# Takes name and adds it file array
	filePath = rootPath + name + 'Id.js'

	# If entry already exists, then we do not bother adding it
	if existInRandFile(filePath,text_to_save):
		return

	with open(filePath) as rdTmpFile:
		fileData = rdTmpFile.read()

	endMark = '];\n'
	fileData = fileData.replace(endMark,text_to_save)

	with open(filePath,'w') as wTmpFile:
		wTmpFile.write(fileData)

	# Adding the ending mark
	with open(filePath,'a') as appendFile:
		appendFile.write(endMark)

	return

