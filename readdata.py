"""
Read voter data from csv file
into pandas dataframe
"""

import pandas as pd
#import numpy as np
#import d3py

def readdata(filename='red_voterdatafile.csv'):
    """
    input: filename
    output: dataframe object containing voter data from filename
    """

    fhandle = open(filename,'r')
    votedatframe = pd.read_csv(fhandle)

    print votedatframe
    print votedatframe['first_name']
    print votedatframe.describe()
    print 'number of columns: ' + str(votedatframe.columns.size)
    print votedatframe.columns.tolist()

    return votedatframe

if __name__ == "__main__":
    readdata()
