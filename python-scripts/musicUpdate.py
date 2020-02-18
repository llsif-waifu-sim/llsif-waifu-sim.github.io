import urllib
import urllib.request
#import urllib2
import requests
import string
import os
import sys
from PIL import Image
from io import BytesIO
from bs4 import BeautifulSoup
from importlib import reload

import git


# Editable parameters

concatSongPath = 'allSongs.js'

# Want to debug
'''
debugMode = True
gitActive = False
'''

# Normalde

debugMode = False
gitActive = True



# Set info

rootURL = 'http://love-live.wikia.com'
aqoursURL = 'http://love-live.wikia.com/wiki/Category:Aqours_Songs'
aqoursURLSec = 'http://love-live.wikia.com/wiki/Category:Discography:Aqours'
nhsURL = 'http://love-live.wikia.com/wiki/Category:PERFECT_Dream_Project_Songs'
saintSnowURL = 'https://love-live.fandom.com/wiki/Category:Saint_Snow_Songs'

recordURL = '../records/songRecords.txt'
songListFile = '../records/tempSongList.txt' 
tmpDir = '../records/temp'

rootAlbumCover = '../images/album-covers'


oggRootPath = '../../distribution/llsif-waifu-songs-ogg/songs/'
oggRootRep = '../../distribution/llsif-waifu-songs-ogg/'

mp3RootPath = '../../distribution/llsif-waifu-songs-mp3/songs-mp3/'
mp3RootRep = '../../distribution/llsif-waifu-songs-mp3/'



aqoursSongExtension = ['aqours-individual','aqours-sub-group','aqours-together','nhs-individual','nhs-sub-group','nhs-together','other-idols']

subGroupList = ['cyaron','kiss','azalea']
subGroupNHSList = []
soloList = ['takami','watanabe','sakurauchi','kurosawa','kunikida','tsushima','matsuura','ohara']       
soloNHSList = ['uehara','nakasu','osaka','asaka','miyashita','konoe','yuki','verde','tennoji']  

newSongList = []
problemList = []
addedSongsList = []

def gitCommit(rootRep,passStr,strGit):
        print('\n\n\n')
        repo = git.Repo(rootRep)
        print(repo.git.status())
        print('Adding files. . .')
        print(repo.git.add('.'))

        print('Commiting. . .')
        # Allows if ahead by one commit 
        try:
                print(repo.git.commit(m=strGit))
        except:
                repo.git.reset('--soft','origin/master')
                repo.git.push('-f','origin')
                repo.git.add('.')
                print(repo.git.commit(m=strGit))

        print(repo.git.status())

        print('Pushing. . .')
        # Asks us again if we get username or password incorrect
        print(repo.git.push())
        
        pushStr = '\n\n\n =============== '+ passStr +' push was successful!  =============== \n\n\n'
        print(pushStr)

def getNewFileSongName(rootPath, extension):
        # Gets the file that is alphabetically / numerically last
        rankList = []
        for files in os.listdir(rootPath + extension):
                rankList.append(int(files.split(".")[0]))
        if len(rankList) <= 0:
            return 0

        return sorted(rankList)[-1] + 1

def songVisited(title):
        with open(recordURL,"r") as tmpFile:
                for line in tmpFile:
                        if title.lower() in line:
                                return True 
        return False

def saveContent(title,songURL,imgURL,groupAssign,aqoursExtension):

        if title in addedSongsList:
            return

        fileNum = getNewFileSongName(oggRootPath, aqoursExtension)
        numFilePath = str(fileNum) + '.ogg'
        newSongList.append([title,groupAssign])
        
        if debugMode:
                return

        songSavePathOgg = oggRootPath + aqoursExtension + '/' + str(fileNum) + '.ogg'
        songSavePathMp3 = mp3RootPath + aqoursExtension + '/' + str(fileNum) + '.mp3'
        #urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.ogg')
        #urllib.urlretrieve(songURL, tmpDir + '/' + str(fileNum) + '.mp3')
        urllib.request.urlretrieve(songURL, songSavePathOgg)
        urllib.request.urlretrieve(songURL, songSavePathMp3)

        response = requests.get(imgURL)
        img = Image.open(BytesIO(response.content))
        #img.save(tmpDir + '/' + str(fileNum)+ '.jpg')
        img.save(rootAlbumCover + '/' + aqoursExtension + '/' + str(fileNum)+ '.jpg')
        img.close()
        addedSongsList.append(title)
        return

def updateJSSongFile(title,typeValue):

                
        if debugMode:
                return
        
        titleCmp = ''.join([i for i in title if i.isalpha()])

        tmpFile = None
        tmpFileIn = None

        path = None
        if typeValue == 3:
                # Aqours together
                path = '../js/songs/aqoursTogether.js'

        elif typeValue == 4:
                # Aqours sub-unit
                path = '../js/songs/aqoursSub.js'
        elif typeValue == 5:
                # Aqours others
                path = '../js/songs/aqoursSolo.js'
        elif typeValue == 6:
                # Aqours together
                path = '../js/songs/nhsTogether.js'

        elif typeValue == 7:
                # Aqours sub-unit
                path = '../js/songs/nhsSub.js'
        elif typeValue == 8:
                # Aqours others
                path = '../js/songs/nhsSolo.js'

        elif typeValue == 9:
                # Other units
                path ='../js/songs/otherIdols.js'
        else:
                print('Incorrect value for updateJSSongFile: %s' % typeValue)
                exit()


        # Going to replace ending mark with files we will add
        with open(path,'r') as tmpFile:
                fileData = tmpFile.read()

        endMark = '];\n'
        usestr = "['" + title +"',"+str(typeValue)+"],\n" 
        fileData = fileData.replace(endMark,usestr)

        with open(path,'w') as wTmpFile:
                wTmpFile.write(fileData)

        # Adding the ending mark
        with open(path,'a') as appendFile:
                appendFile.write(endMark)
        
        return 


def prepareSong(title,songPageURL,rSoup,recFile):

        # Check to see if the song page has an audio file
        try:
                imgURL = rSoup.find("img",{"class":"pi-image-thumbnail"})['src']
                authorInfoPunc = rSoup.find("section",{"class":"pi-item pi-group pi-border-color"}).find("h2").getText().split(" ")[-1]
                authorInfo = ''.join(c for c in authorInfoPunc if c not in string.punctuation).lower()
                songURLSearch = rSoup.find("div",{"id":"ogg_player_1"}).find("div").find("button")['onclick'].split('"')
        except:
                print('There was a problem retrieving the song: %s' % title)
                if [title,songPageURL] not in problemList:
                        problemList.append([title,songPageURL])
                return
        
        songURL = list(filter(lambda x: 'http' in x,songURLSearch))[0]
        
        if not songVisited(title):
                recFile.write(title.lower())
                recFile.write('\n')
        else:
                return
        

        if authorInfo == 'aqours':
                # Aqours all together
                groupAssign = 'Aqours Together'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[2])
                updateJSSongFile(title,3)

        elif authorInfo in subGroupList:
                groupAssign = 'Aqours Sub-Group'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[1])
                updateJSSongFile(title,4)

        elif authorInfo in soloList:
                groupAssign = 'Aqours Individual'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[0])
                updateJSSongFile(title,5)

        elif authorInfo == 'club':
                # Aqours all together
                groupAssign = 'NHS Together'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[5])
                updateJSSongFile(title,6)

        elif authorInfo in subGroupNHSList:
                groupAssign = 'NHS Sub-Group'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[4])
                updateJSSongFile(title,7)

        elif authorInfo in soloNHSList:

                groupAssign = 'NHS Individual'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[3])
                updateJSSongFile(title,8)

        else:
                groupAssign = 'Other Idols'
                print(groupAssign)
                saveContent(title,songURL,imgURL,groupAssign,aqoursSongExtension[6])
                updateJSSongFile(title,9)


def uploadSong():

        if newSongList:
                togetherList = []
                subUnitList = []
                soloList = []
                togetherNHSList = []
                subUnitNHSList = []
                soloNHSList = []
                otherList = []

                print('---------------------------------')

                print('New songs found:')
                for songs in newSongList:
                        print('- ', songs[0], '   (',songs[1] ,')')

                        if songs[1].lower() == 'aqours together':
                                togetherList.append(songs[0])
                        elif songs[1].lower() == 'aqours sub-group':
                                subUnitList.append(songs[0])
                        elif songs[1].lower() == 'aqours individual':
                                soloList.append(songs[0])
                        elif songs[1].lower() == 'nhs together':
                                togetherNHSList.append(songs[0])
                        elif songs[1].lower() == 'mhs sub-group':
                                subUnitNHSList.append(songs[0])
                        elif songs[1].lower() == 'nhs individual':
                                soloNHSList.append(songs[0])
                        else:
                                otherList.append(songs[0])

                if problemList:
                        print('\n\n')
                        print('---------------------------------')
                        print('There was a problem printing these songs:\n')
                        for songs in problemList:
                                print('- ', songs[0],' located at :')
                                print('    ', songs[1])
                        print('\n\n\n')

                print('\n\n\n')
                print('-------- Announcement Information --------')

                print('\n\n\n')
                print('Git Commit message: ')
                strGit = 'Adding songs '
                i = 0
                for songs in newSongList:
                        if i >= len(newSongList) - 1:
                                outStr = "'"+ songs[0] + "'" 
                        else:
                                outStr = "'"+ songs[0] + "', "
                        strGit = strGit + outStr
                        i = i + 1
                print(strGit)

                print('\n\n')
                print('Adding announcement message:')
                sys.stdout.write("'Adding songs ")
                if togetherList:
                        for song in togetherList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to Aqours Together, ")
                if subUnitList:
                        for song in subUnitList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to Aqours Sub-Unit, ")
                if soloList:
                        for song in soloList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to NHS Others, ")
                if togetherNHSList:
                        for song in togetherList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to NHS Together, ")
                if subUnitNHSList:
                        for song in subUnitList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to NHS Sub-Unit, ")
                if soloNHSList:
                        for song in soloList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to Aqours Others, ")
                if otherList:
                        for song in otherList:
                                outStr = '"' + song + '", '
                                sys.stdout.write(outStr)
                        sys.stdout.write("to Others ")
                print("'")
                
                print('---------------------------------')
                print('\n\n\n')
                # Preform git operations
                print('git commit: ',strGit)


                if gitActive:
                        gitCommit(oggRootRep,'OGG', strGit)
                        gitCommit(mp3RootRep,'MP3', strGit)

        else:
                print('\n\nNo new songs found\n\n')


                if problemList:
                        print('\n\n\n\n')
                        print('---------------------------------')
                        print('There was a problem printing these songs:\n')
                        for songs in problemList:
                                print('- ' ,songs[0] ,' located at :')
                                print('    ' , songs[1])
                                print('\n\n')
                        print('\n\n\n')


def scrapeSongFromFile():

        # Set encoding to write unicode
        reload(sys)
        sys.setdefaultencoding('utf-8')
        
        recFile = open(recordURL,"a")


        os.system('mkdir ' + tmpDir)

        #for div in divTar.findAll("div"):
        for songPageURL in open(songListFile,'r'):
                print('---------------')

                # Now we are going to inspect the link of the song
                rSong = urllib.urlopen(songPageURL).read()
                rSoup = BeautifulSoup(rSong,'lxml')

                title = rSoup.find("h1",{"class":"page-header__title"}).getText()
                print(title)
                print(songPageURL)
                print('\n\n')


                prepareSong(title,songPageURL,rSoup,recFile)
        

        recFile.close()
        os.system('rm -rf ' + tmpDir)
        print('\n\n\n')

        uploadSong()

def heavySongScraping(urlRead):
        r = requests.get(urlRead).content
        soup = BeautifulSoup(r,'lxml')
        contDiv = soup.find("div",{"class":"mw-content-ltr"})

        # Set encoding to write unicode
        reload(sys)
        sys.setdefaultencoding('utf-8')
        recFile = open(recordURL,"a")


        os.system('mkdir ' + tmpDir)

        for ulTag in contDiv.findAll("ul"):
                for liTag in ulTag.findAll("li"):
                        print('---------------')
                        songPageURL = rootURL + liTag.find("a")['href']
                        title = liTag.find("a")['title']

                        print(title)
                        
                        
                        # Now we are going to inspect the link of the song
                        #rSong = urllib.urlopen(songPageURL).read()
                        rSong = requests.get(songPageURL).content
                        rSoup = BeautifulSoup(rSong,'lxml')
                        #imgURL = rSoup.find("meta",{"property":"og:image"})['content']

                        prepareSong(title,songPageURL,rSoup,recFile)
        recFile.close()
        os.system('rm -rf ' + tmpDir)

        print('\n\n\n')

        uploadSong()



def songScraping(urlRead):

        r = requests.get(urlRead).content

        soup = BeautifulSoup(r,'lxml')

        divTar = soup.find("div",{"class":"category-page__members"})

        # Set encoding to write unicode
        reload(sys)
        #sys.setdefaultencoding('utf-8')

        recFile = open(recordURL,"a")


                
        if divTar is None:
            print('Failure in songScraping for: ', urlRead)
            return()

        os.system('mkdir ' + tmpDir)

        for liTag in divTar.findAll("ul"):
                for aTag in liTag.findAll("a"):
                        print('---------------')

                        title = aTag['title']
                        songPageURL = rootURL + aTag['href']

        
                        print(title)
                        
                        # Now we are going to inspect the link of the song
                        #rSong = urllib.urlopen(songPageURL).read()
                        rSong = requests.get(songPageURL).content
                        rSoup = BeautifulSoup(rSong,'lxml')
                        #imgURL = rSoup.find("meta",{"property":"og:image"})['content']

                        prepareSong(title,songPageURL,rSoup,recFile)

        recFile.close()
        os.system('rm -rf ' + tmpDir)

        print('\n\n\n')

        uploadSong()

def concatSongFile(outputPath):
        path = '../js/songs/'

        cmdStr = 'cat ' + path + '* > ' + path + outputPath


        os.system(cmdStr)

        print('Concatenated song files')

def main():
        
        songScraping(aqoursURL)
        songScraping(nhsURL)
        songScraping(saintSnowURL)
        concatSongFile(concatSongPath)
        #scrapeSongFromFile()

if __name__ == "__main__":
        main()

