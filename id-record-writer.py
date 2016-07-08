import json
import urllib
import urllib2

def idol2path(name):
    if name == 'Koizumi Hanayo':
        return 'hanayo'
    elif name == 'Hoshizora Rin':
        return 'rin'
    elif name == 'Nishikino Maki':
        return 'maki'
    elif name == 'Kousaka Honoka':
        return 'honoka'
    elif name == 'Sonoda Umi':
        return 'umi'
    elif name == 'Minami Kotori':
        return 'kotori'
    elif name == 'Ayase Eli':
        return 'eli'
    elif name == 'Yazawa Nico':
        return 'nico'
    elif name == 'Toujou Nozomi':
        return 'nozomi'
    else:
        return 'none'
    
text_file = open("records/id-list.txt", "w")

for x in range (554,960):
    x_str = str(x)
    temp_str = "http://schoolido.lu/api/cards/" + x_str + "/"
    data = json.load(urllib2.urlopen(temp_str))

    name = data['idol']['name']
    
    img_url = data['transparent_image']
    img_url_idol = data['transparent_idolized_image']

    if img_url != None and idol2path(name) != 'none':
        # (id)/(name)/(idolized)
        text_to_save =  x_str + "/" + idol2path(name) +"/" + "no\n"
        text_file.write(text_to_save)

        print text_to_save
        
    if img_url_idol != None and idol2path(name) != 'none':
        text_to_save_id =x_str + "/" + idol2path(name) +"/" + "yes\n"
        text_file.write(text_to_save_id)
        print text_to_save_id

text_file.close()
