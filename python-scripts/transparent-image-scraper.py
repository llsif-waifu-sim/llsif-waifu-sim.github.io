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
    elif name == 'Tsushima Yoshiko':
        return 'yoshiko'
    elif name == 'Kunikida Hanamaru':
        return 'hanamaru'
    elif name == 'Kurosawa Ruby':
        return 'ruby'
    elif name == 'Takami Chika':
        return 'chika'
    elif name == 'Watanabe You':
        return 'you'
    elif name == 'Sakurauchi Riko':
        return 'riko'
    elif name == 'Kurosawa Dia':
        return 'dia'
    elif name == 'Ohara Mari':
        return 'mari'
    elif name == 'Matsuura Kanan':
        return 'kanan'
    else:
        return 'none'
    
# The ending value should be the last id value + 1
for x in range (980,981):
    x_str = str(x)
    temp_str = "http://schoolido.lu/api/cards/" + x_str + "/"
    data = json.load(urllib2.urlopen(temp_str))

    name = data['idol']['name']
    
    img_url = data['transparent_image']
    img_url_idol = data['transparent_idolized_image']

    if img_url != None and idol2path(name) != 'none':
        print str(x) + ': ' + name
        path_to_save = "../scraped-images/" + idol2path(name) +"/" + x_str + ".png"
        path_to_save_id = "../scraped-images/" + idol2path(name) +"/" + x_str + "_id.png"
        urllib.urlretrieve(img_url, path_to_save)
        urllib.urlretrieve(img_url_idol, path_to_save_id)
        
    
