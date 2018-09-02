import json
import urllib
import urllib2
from specialQuoteScraper import extractQuote
from idolName import idol2path
from randomArrAssign import addToRandFile, addToMainFile
from facebookAuto import generateCharImg, postToFB

from PIL import Image
import requests
from io import BytesIO
import git
import os

# Debugging
'''
debugMode = True
gitActive = False
'''
# Normal

debugMode = False
gitActive = True


cardPicDir = '../../distribution/llsif-waifu-card-pics/'
girlImageDir = '../../distribution/llsif-waifu-girl-images/'
speQuoteDir = '../../distribution/llsif-waifu-special-quotes/'

refNumPath = './text/beginRef.txt'

begin = 0
last = 0

name = None
x_str = None

os.system('mkdir ./tmp/')

for line in open(refNumPath,'r'):
	begin = int(line)


def gitCommit(rootRep,passStr,strGit):
        print '\n\n\n'
        repo = git.Repo(rootRep)
        print repo.git.status()
        print 'Adding files. . .'
        print repo.git.add('.')

        print 'Commiting. . .'
        # Allows if ahead by one commit 
        try:
                print repo.git.commit(m=strGit)
        except:
                repo.git.reset('--soft','origin/master')
                repo.git.push('-f','origin')
                repo.git.add('.')
                print repo.git.commit(m=strGit)

        print repo.git.status()

	print 'Pushing. . .'
        # Asks us again if we get username or password incorrect

        print repo.git.push()
        print '\n\n\n =============== '+ passStr +' push was successful!  =============== \n\n\n'


def PILRetrieveImage(img_url,img_url_idol, img_url_card, img_url_card_idol, statusNum):
    # 0 = None for both non-idol & idolized
    # 1 = Only non-idolized exist
    # 2 = Only idolized exist
    # 3 = Both non-idol & idolized exist

    # Define paths to save images in
    path_to_save = "../../distribution/llsif-waifu-girl-images/scraped-images/" + idol2path(name) +"/" + x_str + ".png"
    path_to_save_id = "../../distribution/llsif-waifu-girl-images/scraped-images/" + idol2path(name) +"/" + x_str + "_id.png"

    path_to_save_card = "../../distribution/llsif-waifu-card-pics/scraped-images/" + idol2path(name) +"/" + x_str + ".png"
    path_to_save_id_card = "../../distribution/llsif-waifu-card-pics/scraped-images/" + idol2path(name) +"/" + x_str + "_id.png"

    # Do some parsing before preforming request

    if statusNum == 1 or statusNum == 3:
        img_url = img_url.replace('//','http://')
        img_url_card = img_url_card.replace('//','http://')

    if statusNum == 2 or statusNum == 3:
        img_url_idol = img_url_idol.replace('//','http://')
        img_url_card_idol = img_url_card_idol.replace('//','http://')

    # Preform requests

    if statusNum == 1 or statusNum == 3:
        response = requests.get(img_url)
        img = Image.open(BytesIO(response.content))
        img.save(path_to_save)
        img.close()
        
    if statusNum == 2 or statusNum == 3:
        response = requests.get(img_url_idol)
        img2 = Image.open(BytesIO(response.content))
        img2.save(path_to_save_id)
        img2.close()

    if statusNum == 1 or statusNum == 3:
        response = requests.get(img_url_card)
        img = Image.open(BytesIO(response.content))
        img.save(path_to_save_card)
        img.close()

    if statusNum == 2 or statusNum == 3:
        response = requests.get(img_url_card_idol)
        img2 = Image.open(BytesIO(response.content))
        img2.save(path_to_save_id_card)
        img2.close()

text_file = open("../records/id-list.txt", "w")
text_file.write('[\n')
print '['

def scrapeImages(limit=-1):
	global last, name, x_str
	x = begin
	# The ending value should be the last id value + 1
	#for x in range (begin,last+1):
	while True:
	    x_str = str(x)
	    temp_str = "http://schoolido.lu/api/cards/" + x_str + "/"

	    try:
		data = json.load(urllib2.urlopen(temp_str))
		x = x + 1
	    except:
		# If we get here, that means the page does not exist
		# We terminate our search and record the final number that is valid

		# Write to a file to record the last valid number
		refFilePath = open('./text/beginRef.txt','w')	
		last = x - 1
		writeNum = str(last)
		refFilePath.write(writeNum)
		refFilePath.close()

		break

	    name = data['idol']['name']
	    
	    img_url = data['transparent_image']
	    img_url_idol = data['transparent_idolized_image']


	    img_url_card = data['card_image']
	    img_url_card_idol = data['card_idolized_image']

	    statusNum = None
	    if img_url == None and img_url_idol == None:
		statusNum = 0
	    if img_url != None and img_url_idol == None:
		statusNum = 1
	    if img_url == None and img_url_idol != None:
		statusNum = 2
	    if img_url != None and img_url_idol != None:
		statusNum = 3


	    # Testing in foreign country, this stops working for some reason
	    #urllib.urlretrieve(img_url, path_to_save)
	    #urllib.urlretrieve(img_url_idol, path_to_save_id)
	    #########

	    ## Substitution
	    if idol2path(name) != 'none':
		PILRetrieveImage(img_url,img_url_idol, img_url_card, img_url_card_idol, statusNum)
		
	    
	    if img_url != None and idol2path(name) != 'none':
		#print str(x) + ': ' + name
		
		text_to_save =  "['" + x_str + "','" + idol2path(name) +"','no'],\n"
		text_to_prnt =  "['" + x_str + "','" + idol2path(name) +"','no'],"
		text_file.write(text_to_save)

		if not debugMode:	
			addToRandFile(x_str,idol2path(name), text_to_save)
			addToMainFile(x_str,idol2path(name), text_to_save)

			generateCharImg(x_str, idol2path(name), False)
		
		print text_to_prnt
		
	    if img_url_idol != None and idol2path(name) != 'none':
		
		text_to_save =  "['" + x_str + "','" + idol2path(name) +"','yes'],\n"
		text_to_prnt =  "['" + x_str + "','" + idol2path(name) +"','yes'],"
		text_file.write(text_to_save)

		if not debugMode:
			addToRandFile(x_str,idol2path(name), text_to_save)
			addToMainFile(x_str,idol2path(name), text_to_save)
		
			generateCharImg(x_str, idol2path(name), True)

		print text_to_prnt

		if limit > 0 and limit+1 == x:
			last = x
			print 'Card max limit reached'
			break
	    


	text_file.write('];\n')
	print '];'


scrapeImages()


# Checks to see if there were any updates before git pushing
if begin != last:
	print 'last: ',last
	if not debugMode:
		extractQuote(begin,last)

	text_file.close()   
 

  
	strGit = 'Added idols up from id ' + str(begin) + ' to ' + str(last)   

	print '\n\n\n'
	print 'Git message: ', strGit
	print '\n\n\n'

	if gitActive:
		gitCommit(cardPicDir,'Card Images',strGit)
		gitCommit(girlImageDir,'Girl Images',strGit)
		gitCommit(speQuoteDir,'Audio Quotes',strGit)

	fbMessage = strGit + "\n\n Come check it out here!\n https://llsif-waifu-sim.github.io"

	while True:
		print 'Press [y] to upload to Facebook or [n]:'
		res = raw_input().lower()
	
		if res == 'y' or res == 'n':
			if res == 'y':
				postToFB(fbMessage)
				print '\n\n Uploaded images to Facebook \n\n'
				os.system('rm -rf ./tmp')
			
			break

else:
	print '\n\n\n'
	print 'There are no current updates'
	print '\n\n\n'

    
