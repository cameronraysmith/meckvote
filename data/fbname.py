#!/bin/python
import sys # for command line arguments
from urllib import urlopen
import json # for parsing
from StringIO import StringIO

if len(sys.argv) != 2 : # The Program Name and the Username
    sys.exit("Usage : "+sys.argv[0]+" Username\n")

username = sys.argv[1]

data = urlopen("http://graph.facebook.com/"+username).read()

io = StringIO(data)
user = json.load(io)

# parse

print "ID\t: " , user['id'] ,"\nName\t: " , user['name'] , "\nGender\t: ", user['gender'], "\nlocale\t: " , user['locale']
