# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 23:25:48 2019

@author: Harnick Khera (Hephyrius)

TAiL is a dApp and Library created for the Tron Accelerator
The Python library enables training of Neural Network Classifiers
As well as the export of trained models in JSON Form
The smart contract allows pretrained models to be used on the TVM
By allowing users to initialise them via a smart contract deployer system
The ReactJs front end allows the deployment, initialisation and use of the Neural Networks
It also allows the exploration of the Neural Networks by allowing users to see Past Predictions
As Well as Owners and Deployed Addresses.
Created By Harnick Khera (Github.com/Hephyrius)
Repository can be found at (Github.com/Hephyrius/TAiL)
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
x = x

#convert string labels to integers
y = y.astype('category')
y = y.cat.codes

#prepare the network
#first input is the number of candidates in our optomiser
#second is the layer sizes for the neural network

#Genetic = GN(10, [4,2,3])
#Genetic.Fit(x, y, 10)

# OR we can fit using a hybrid back prop method as so:
Network = FFN([4,2,2,3]) #Layer Sizes
Network.RandomiseNetwork()
Network.Fit(x,y,10) #training data = x and y, epochs is 10
Network.ConvertToTron("BackProp")