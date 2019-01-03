# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 23:25:48 2019

@author: Khera
"""

from FeedForwardNeuralNetwork import FeedForwardNeuralNetwork as FFN
from GeneticOptomiser import GeneticOptomiser as GN
import pandas as pd
import numpy as np

#import test data
data = pd.read_csv("TestData/iris.csv")

#split into features and labels
y = data['label']
x = data.drop(['label'], axis=1)

x = np.asarray(x)

#shift our values up by 1e8 so we dont have any decimal values
x = x * 1e8

#convert string labels to integers
y = y.astype('category')
y = y.cat.codes

#prepare the network
#first input is the number of candidates in our optomiser
#second is the layer sizes for the neural network
Genetic = GN(10, [4,2,1,3])
Genetic.Fit(x, y, 10)