import json
import urllib
import urllib2
from specialQuoteScraper import extractQuote
from idolName import idol2path

text_file = open("../records/id-list.txt", "w")
text_file.write('[\n')
print '['

begin = 1044
last = 1048

# The ending value should be the last id value + 1
for x in range (begin,last+1):
    x_str = str(x)
    temp_str = "http://schoolido.lu/api/cards/" + x_str + "/"
    data = json.load(urllib2.urlopen(temp_str))

    name = data['idol']['name']
    
    img_url = data['transparent_image']
    img_url_idol = data['transparent_idolized_image']

    if img_url != None and idol2path(name) != 'none':
        #print str(x) + ': ' + name
        path_to_save = "../scraped-images/" + idol2path(name) +"/" + x_str + ".png"
        path_to_save_id = "../scraped-images/" + idol2path(name) +"/" + x_str + "_id.png"
        urllib.urlretrieve(img_url, path_to_save)
        urllib.urlretrieve(img_url_idol, path_to_save_id)

        #########
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
    
