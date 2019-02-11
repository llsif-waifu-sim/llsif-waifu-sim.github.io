import facebook
from PIL import Image
import os
import random
'''
from fbToken import token # This contains your key to make publications
'''
# fbToken usecase:
# token = 'LONG STRING CONTAINING YOUR KEY'

backgroundDirPath = "../images/background/"
imgGenLoc = './tmp/'

backgroundForbid = [10,16,18,19,116]

def postToFB(msg):
        token = ""
        while True:
                try:    
                        fb = facebook.GraphAPI(access_token=token)
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
                        print('Facebook content was successfully posted!')
                        return
                except:
                        print('Something went wrong while uploading to Facebook. Maybe your token has expired?')
                        print('If so, try getting a new one here: https://developers.facebook.com/tools/explorer')
                        print('Paste your new token here:')
                        token = input()
                        print('\n\n Attempting to republish FB post. . .')              

def resizeImg(img,baseHeight):
        hpercent = (baseHeight/float(img.size[1]))
        wsize = int((float(img.size[0])*float(hpercent)))
        img = img.resize((wsize,baseHeight), Image.ANTIALIAS)
        return img

def randomBackground():
        mainList = os.listdir(backgroundDirPath)
        for remVal in backgroundForbid:
                mainList.remove('background'+str(remVal)+'.png')
                        
        return backgroundDirPath + random.choice(mainList)

def generateCharImg(x_str, name, idolized):

        if idolized:
                path_to_save_id = "../../distribution/llsif-waifu-girl-images/scraped-images/" + name +"/" + x_str + "_id.png"
                savePath = "./tmp/result-" + x_str + "_id.png"
                constructImg(path_to_save_id, randomBackground(), savePath)
        else:
                path_to_save = "../../distribution/llsif-waifu-girl-images/scraped-images/" + name +"/" + x_str + ".png"
                savePath = "./tmp/result-" + x_str + ".png"
                constructImg(path_to_save, randomBackground(), savePath)

def getImageList():     
        resList = []
        for picPath in os.listdir(imgGenLoc):
                resList.append(imgGenLoc + picPath)
        return resList


def constructImg(characterPath, backgroundPath, savePath):
        background = Image.open(backgroundPath)
        foreground = Image.open(characterPath).convert("RGBA")

        background = resizeImg(background,650)
        foreground = resizeImg(foreground,750)


        background.paste(foreground, (-85, -65), foreground)
        background.save(savePath)
        #background.show()

def generateNewSet(begin, last):
        # Check to see if id exist

        # If so, then generate character image
        generateCharImg(x_str, name, idolized)
        print(groupAssign)


