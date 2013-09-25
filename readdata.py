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

def twopreselvote(vdf):
    voteinds = [(type(vdf.E2_Date.tolist()[i])==str) & (type(vdf.E12_Date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def oneelvote(vdf):
    voteinds = [(type(vdf.E1_date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def twoelvote(vdf):
    voteinds = [(type(vdf.E1_date.tolist()[i])==str) & (type(vdf.E2_Date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def threeelvote(vdf):
    voteinds = [(type(vdf.E3_Date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def fourelvote(vdf):
    voteinds = [(type(vdf.E4_Date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def fiveelvote(vdf):
    voteinds = [(type(vdf.E5_Date.tolist()[i])==str) for i in range(len(vdf.index))]
    votefilt = vdf[voteinds]
    return votefilt

def main():
    vdf = readdata()
    ddf = getdist(vdf)
    #distfilt=ddf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
    #           'party_cd','race_code','sex_code','age']]
    #distfilt.to_csv('district4.csv')

    tpdf = twopreselvote(ddf)
    votefiltp2=tpdf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefiltp2.to_csv('district4votepres2.csv')

    odf = oneelvote(ddf)
    votefilt1=odf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefilt1.to_csv('district4vote1.csv')

    tdf = twoelvote(ddf)
    votefilt2=tdf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefilt2.to_csv('district4vote2.csv')

    thdf = threeelvote(tdf)
    votefilt3=thdf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefilt3.to_csv('district4vote3.csv')

    fdf = fourelvote(thdf)
    votefilt4=fdf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefilt4.to_csv('district4vote4.csv')

    fidf = fiveelvote(fdf)
    votefilt5=fidf.loc[:,['full_name_mail','mail_addr1','mail_city_state_zip',
               'party_cd','race_code','sex_code','age']]
    votefilt5.to_csv('district4vote5.csv')

if __name__ == "__main__":
    main()
