from facebookAuto import postToFB

print 'Type in beginning id:'
beginID = raw_input()

print 'Type in ending id:'
lastID = raw_input()

strGit = 'Added idols up from id ' + str(beginID) + ' to ' + str(lastID)
msg = strGit + "\n\n Come check it out here!\n https://llsif-waifu-sim.github.io"
postToFB(msg)

