import json
import urllib
import urllib2
from specialQuoteScraper import extractQuote
from idolName import idol2path


from PIL import Image
import requests
from io import BytesIO

begin = 1353
last = 1358


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

# The ending value should be the last id value + 1
for x in range (begin,last+1):
    x_str = str(x)
    temp_str = "http://schoolido.lu/api/cards/" + x_str + "/"
    data = json.load(urllib2.urlopen(temp_str))
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

        print text_to_prnt
        
    if img_url_idol != None and idol2path(name) != 'none':
        
        text_to_save =  "['" + x_str + "','" + idol2path(name) +"','yes'],\n"
        text_to_prnt =  "['" + x_str + "','" + idol2path(name) +"','yes'],"
        text_file.write(text_to_save)
        print text_to_prnt

    


text_file.write('];\n')
print '];'
extractQuote(begin,last)

text_file.close()      
    
