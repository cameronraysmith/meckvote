"""
filtermeckvote.py

Read voter data from csv file
into pandas dataframe, filter, and
export reformatted data

input: voterdatafile.csv (downloadmeckvote.sh)
output: district4vote.csv
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

    # 1476 UNC CHARLOTTE students are eliminated due to
    # malformatting of those rows
    # check number with command:
    #   grep -n "UNC CHARLOTTE" voterdatafile.csv | cut -f1 -d:| wc -l
    #skiprows = [123,267,340,1121,1159,1295,1721]
    #usecols = range(1,30)
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

def elcount(row):
    n=0
    if type(row["E2_Date"])==str:
        n += 1
    if type(row["E5_Date"])==str:
        n += 1
    if type(row["E7_Date"])==str:
        n += 1
    if type(row["E10_Date"])==str:
        n += 1
    return n

def e2count(row):
    n=0
    if type(row["E2_Date"])==str:
        n += 1
    return n

def e5count(row):
    n=0
    if type(row["E5_Date"])==str:
        n += 1
    return n

def e7count(row):
    n=0
    if type(row["E7_Date"])==str:
        n += 1
    return n

def e10count(row):
    n=0
    if type(row["E10_Date"])==str:
        n += 1
    return n

def primcount(row):
    n=0
    if type(row["E1_date"])==str:
        n += 1
    return n

def reg2013(row):
    n=0
    if "2013" in row["registr_dt"]:
        n += 1
    return n

def joinaddr(street,citystatezip):
    if (type(street)==str) & (type(citystatezip)==str):
        return street + " " + citystatezip
    else:
        return street

def main():
    vdf = readdata()
    ddf = getdist(vdf)
    ddf["vote_count"] = ddf.apply(elcount, axis=1)
    ddf["vote_2012"] = ddf.apply(e2count, axis=1)
    ddf["vote_2011"] = ddf.apply(e5count, axis=1)
    ddf["vote_2010"] = ddf.apply(e7count, axis=1)
    ddf["vote_2009"] = ddf.apply(e10count, axis=1)
    ddf["prim_vote"] = ddf.apply(primcount, axis=1)
    ddf["reg2013"] = ddf.apply(reg2013, axis=1)
    #ddf = ddf[(ddf["vote_count"]>0) | (ddf["prim_vote"]>0) | (ddf["reg2013"]>0)]
    ddf = ddf[((ddf["vote_2012"]+ddf["vote_2011"])==2) |
              ((ddf["vote_2012"]+ddf["vote_2009"])==2) |
              (ddf["prim_vote"]>0)
             ]
    ddf["address"] = map(joinaddr, ddf["mail_addr1"], ddf["mail_city_state_zip"])
    elfilt=ddf.loc[:,['precinct_desc','full_name_mail',
                      'address','vote_count',"vote_2012",
                      "vote_2011","vote_2010","vote_2009",
                      "prim_vote","reg2013",'party_cd',
                      'race_code','ethnic_code','sex_code','age']]
    elfilt.to_csv('district4vote_stringentfilt.csv')

    return elfilt

if __name__ == "__main__":
    main()
