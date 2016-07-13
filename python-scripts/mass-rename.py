import os

def filecount(path):
    return len([f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))])

maxNum = filecount(os.getcwd() + '/songs/') - 1
i = 0

print 'What do you want to do?'
temp = raw_input()

if temp == 'go-up':
    startNum = 23
    
    for x in range(startNum,maxNum):
        targetNum = maxNum - i
        targetNumPlus = targetNum + 1

        
        filename = './songs/'+ str(targetNum) + '.ogg'

        os.rename(filename, filename.replace(str(targetNum), str(targetNumPlus)).lower())


        i = i + 1

elif temp == 'go-down':
    
    startNum = 44
    
    for x in range(startNum,maxNum):
    
        filename = './songs/'+ str(x) + '.ogg'

        os.rename(filename, filename.replace(str(x), str(x-1)).lower())


