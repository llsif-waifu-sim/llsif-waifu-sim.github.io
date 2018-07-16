import facebook
import Image
import os
import random
from fbToken import token # This contains your key to make publications

# fbToken usecase:
# token = 'LONG STRING CONTAINING YOUR KEY'

backgroundDirPath = "../images/background/"
imgGenLoc = './tmp/'
message = "Added idols up from id 1638 to 1642!"

def postToFB(msg):
	fb = facebook.GraphAPI(access_token=token)

	#imgPath = "img.jpg"


	#fb.put_object(parent_object='me',connection_name='feed',message="Added idols up from id 1638 to 1642!")
	#graph.put_photo(image=open(imgPath, 'rb'),message=msg)

	#fb.put_photo(image=open(imgGenLoc, 'rb'),message=msg)

	
	imgs_id = []
	for img in os.listdir(imgGenLoc):
		photo = open(imgGenLoc+img, "rb")
		imgs_id.append(fb.put_photo(photo, album_id='me/photos',published=False)['id'])
		photo.close()

	args=dict()
	args["message"]=msg
	for img_id in imgs_id:
		key="attached_media["+str(imgs_id.index(img_id))+"]"
		args[key]="{'media_fbid': '"+img_id+"'}"

	fb.request(path='/me/feed', args=None, post_args=args, method='POST')

def resizeImg(img,baseHeight):
	hpercent = (baseHeight/float(img.size[1]))
	wsize = int((float(img.size[0])*float(hpercent)))
	img = img.resize((wsize,baseHeight), Image.ANTIALIAS)
	return img

def randomBackground():
	return backgroundDirPath + random.choice(os.listdir(backgroundDirPath))

def generateCharImg(x_str, name, idolized):

	if idolized:
    		path_to_save_id = "../../distribution/llsif-waifu-girl-images/scraped-images/" + name +"/" + x_str + "_id.png"
		constructImg(path_to_save_id, randomBackground(), x_str)
	else:
		path_to_save = "../../distribution/llsif-waifu-girl-images/scraped-images/" + name +"/" + x_str + ".png"
		constructImg(path_to_save, randomBackground(), x_str)

def getImageList():	
	resList = []
	for picPath in os.listdir(imgGenLoc):
		resList.append(imgGenLoc + picPath)
	return resList


def constructImg(characterPath, backgroundPath, idNum):
	background = Image.open(backgroundPath)
	foreground = Image.open(characterPath).convert("RGBA")

	background = resizeImg(background,650)
	foreground = resizeImg(foreground,750)


	background.paste(foreground, (-85, -65), foreground)
	background.save("tmp/result"+str(idNum)+".png")
	#background.show()

'''
for path in getImageList():
	print path
'''

postToFB(message)

