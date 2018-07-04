
def existInRandFile(filePath,textSave):
	# Checks to see if an entry exists in the Rand array or not
	titleCmp = ''.join([i for i in textSave if i.isalpha()])

	cmpFile = open(filePath,"r")

	# Only check the last few entries of Randarray
	lastFew = len(cmpFile) - 5

	for line in cmpFile[lastFew:]:
		lineCmp = ''.join([i for i in line if i.alpha()])

		if titleCmp == lineCmp:
			return True
	
	return False

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
	fileData = fileData.replace()

	with open(filePath,'w') as wTmpFile:
		wTmpFile.write(fileData)

	# Adding the ending mark
	with open(filePath,'a') as appendFile:
		appendFile.write(endMark)

	return

