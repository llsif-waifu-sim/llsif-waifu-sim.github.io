import json
import urllib
import urllib2
from idolName import idol2path

def getIdolURL(name):
    if name == 'hanamaru':
        return 'http://schoolido.lu/api/cards/?name=Kunikida%20Hanamaru'
    elif name == 'ruby':
        return 'http://schoolido.lu/api/cards/?name=Kurosawa%20Ruby'
    elif name == 'yoshiko':
        return 'http://schoolido.lu/api/cards/?name=Tsushima%20Yoshiko'
    elif name == 'chika':
        return 'http://schoolido.lu/api/cards/?name=Takami%20Chika'
    elif name == 'you':
        return 'http://schoolido.lu/api/cards/?name=Watanabe%20You'
    elif name == 'riko':
        return 'http://schoolido.lu/api/cards/?name=Sakurauchi%20Riko'
    elif name == 'kanan':
        return 'http://schoolido.lu/api/cards/?name=Matsuura%20Kanan'
    elif name == 'dia':
        return 'http://schoolido.lu/api/cards/?name=Kurosawa%20Dia'
    elif name == 'mari':
        return 'http://schoolido.lu/api/cards/?name=Ohara%20Mari'

    elif name == 'hanayo':
        return 'http://schoolido.lu/api/cards/?name=Koizumi%20Hanayo'
    elif name == 'maki':
        return 'http://schoolido.lu/api/cards/?name=Nishikino%20Maki'
    elif name == 'rin':
        return 'http://schoolido.lu/api/cards/?name=Hoshizora%20Rin'
    elif name == 'honoka':
        return 'http://schoolido.lu/api/cards/?name=Kousaka%20Honoka'
    elif name == 'umi':
        return 'http://schoolido.lu/api/cards/?name=Sonoda%20Umi'
    elif name == 'kotori':
        return 'http://schoolido.lu/api/cards/?name=Minami%20Kotori'
    elif name == 'eli':
        return 'http://schoolido.lu/api/cards/?name=Ayase%20Eli'
    elif name == 'nozomi':
        return 'http://schoolido.lu/api/cards/?name=Toujou%20Nozomi'
    elif name == 'nico':
        return 'http://schoolido.lu/api/cards/?name=Yazawa%20Nico'


    
    else:
        print 'Invalid idol name'
        exit()



group = ['hanayo','maki','rin','honoka','umi','kotori','eli','nozomi','nico','chika','you','riko','hanamaru','ruby','yoshiko','kanan','mari','dia']

txt_str = "../js/indiv-muse-id-log.js"
text_file = open(txt_str, "w")

for name in group:


    begin_str = 'var ' + name + '_ar = \n'
    text_file.write(begin_str)
    print begin_str
    
    text_file.write('[\n')
    print '['

    temp_str = getIdolURL(name)
    
    data = json.load(urllib2.urlopen(temp_str))
    maxIter = data['count']
    


    while True:

        data = json.load(urllib2.urlopen(temp_str))

        
        for x in range (0,10):    
            x_id = data['results'][x]['id']
            x_str = str(x_id)

	    name = data['results'][x]['idol']['name']

            img_url = data['results'][x]['transparent_image']
            img_url_idol = data['results'][x]['transparent_idolized_image']


	    img_url_card = data['results'][x]['card_image']
	    img_url_card_idol = data['results'][x]['card_idolized_image']


	    if (img_url_card != None or img_url_card_idol != None) and idol2path(name) != 'none':
	        # For non-transparent card images
		print x_str
		path_to_save = "../../distribution/llsif-waifu-card-pics/scraped-images/" + idol2path(name) +"/" + x_str + ".png"
		path_to_save_id = "../../distribution/llsif-waifu-card-pics/scraped-images/" + idol2path(name) +"/" + x_str + "_id.png"
		
		if img_url_card != None:
			urllib.urlretrieve(img_url_card, path_to_save)


		if img_url_card_idol != None:
			urllib.urlretrieve(img_url_card_idol, path_to_save_id)


	    '''
            if img_url != None:
                # [(id),(name)]

                if maxIter == 1 and img_url_idol == None:
                    text_to_save =  "['" + x_str + "','" + name +"','no']\n"
                    text_to_prnt =  "['" + x_str + "','" + name +"','no']"
                else:
                    text_to_save =  "['" + x_str + "','" + name +"','no'],\n"
                    text_to_prnt =  "['" + x_str + "','" + name +"','no'],"
      
                text_file.write(text_to_save)

                print text_to_prnt
                
            if img_url_idol != None:
                if maxIter == 1:
                    text_to_save =  "['" + x_str + "','" + name +"','yes']\n"
                    text_to_prnt =  "['" + x_str + "','" + name +"','yes']"
                else:
                    text_to_save =  "['" + x_str + "','" + name +"','yes'],\n"
                    text_to_prnt =  "['" + x_str + "','" + name +"','yes'],"

        
                text_file.write(text_to_save)
                print text_to_prnt
	    '''
            maxIter = maxIter - 1

            if maxIter == 0:
                break
            
        if data['next'] == None:
            break

        temp_str = data['next']
    
        
    text_file.write('];\n')
    print '];'
    text_file.write('')
    print ''
    text_file.write('')
    print ''
    
text_file.close()

