#!/bin/sh

wget http://apps.meckboe.org/pages/Download/VoterDataFile.zip
unzip VoterDataFile.zip
sed -n 1,15p voterdatafile.txt > red_voterdatafile.csv
mv voterdatafile.txt voterdatafile.csv
