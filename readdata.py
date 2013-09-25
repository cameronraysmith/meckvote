"""
Read voter data from csv file
into pandas dataframe
"""

import pandas as pd
#import numpy as np
#import d3py

def readdata(filename='voterdatafile.csv',printlevel=0):
    """
    input: filename
    output: dataframe object containing voter data from filename
    """

    fhandle = open(filename,'r')
    skiprows = [123,267,340,1121,1159,1295,1721]
    usecols = range(1,30)

    # 1476 UNC CHARLOTTE students are eliminated due to
    # malformatting of those rows
    # check number with command:
    #   grep -n "UNC CHARLOTTE" voterdatafile.csv | cut -f1 -d:| wc -l
    votedatframe = pd.read_csv(fhandle,error_bad_lines=False)

    if printlevel:
        print votedatframe
        print votedatframe['first_name']
        print votedatframe.describe()
        print 'number of columns: ' + str(votedatframe.columns.size)
        print votedatframe.columns.tolist()

    return votedatframe

def getdist(vdf):
    distfilt=vdf[vdf.ward_desc=="CITY COUNCIL DISTRICT 4"]
    return distfilt

def twoelvote(vdf):
    voteinds = [(type(vdf.E1_date.tolist()[i])==str) & (type(vdf.E4_Date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def main():
    vdf = readdata()
    ddf = getdist(vdf)
    distfilt=ddf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    distfilt.to_csv('district4.csv')

    tdf = twoelvote(ddf)
    votefilt=tdf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefilt.to_csv('district4vote2.csv')

if __name__ == "__main__":
    main()
