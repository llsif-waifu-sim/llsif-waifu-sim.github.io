import json
import urllib
import urllib2

def allidol2path(name):
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

def aquors_idol2path(name):
    if name == 'Tsushima Yoshiko':
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
    
text_file = open("../records/id-list.txt", "w")
text_file.write('[\n')
print '['
for x in range (1,960):
    x_str = str(x)
    temp_str = "http://schoolido.lu/api/cards/" + x_str + "/"
    data = json.load(urllib2.urlopen(temp_str))

    name = data['idol']['name']
    
    img_url = data['transparent_image']
    img_url_idol = data['transparent_idolized_image']

    if img_url != None and allidol2path(name) != 'none':
        # [(id),(name)]
        text_to_save =  "['" + x_str + "','" + allidol2path(name) +"','no'],\n"
        text_to_prnt =  "['" + x_str + "','" + allidol2path(name) +"','no'],"
        text_file.write(text_to_save)

        print text_to_prnt
        
    if img_url_idol != None and allidol2path(name) != 'none':
        text_to_save =  "['" + x_str + "','" + allidol2path(name) +"','yes'],\n"
        text_to_prnt =  "['" + x_str + "','" + allidol2path(name) +"','yes'],"
        text_file.write(text_to_save)
        print text_to_prnt
        
text_file.write('];\n')
print '];'
text_file.close()
