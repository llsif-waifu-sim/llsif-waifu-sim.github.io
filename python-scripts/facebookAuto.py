import facebook
import Image
import os
import random
import fbToken

backgroundDirPath = "../images/background/"

def postToFB(msg):
	fb = facebook.GraphAPI(access_token=token)

	msg = "Added idols up from id 1638 to 1642!"
	imgPath = "img.jpg"


	#fb.put_object(parent_object='me',connection_name='feed',message="Added idols up from id 1638 to 1642!")
	graph.put_photo(image=open(imgPath, 'rb'),message=msg)

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


def constructImg(characterPath, backgroundPath, idNum):
	background = Image.open(backgroundPath)
	foreground = Image.open(characterPath).convert("RGBA")

	background = resizeImg(background,650)
	foreground = resizeImg(foreground,750)


	background.paste(foreground, (-85, -65), foreground)
	background.save("tmp/result"+str(idNum)+".png")
	#background.show()

