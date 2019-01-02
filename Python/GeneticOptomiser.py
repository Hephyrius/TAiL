# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 18:53:15 2019

@author: Harnick Khera (Hephyrius)

This library allows a user to Train a feed forward neural network that can be deployed on the TVM and used as a stand alone system or within complex contracts.

This implementation is as similar as the solidity implementation as possible as it allows transfering between systems without issues

This is also loosely based on my work on my KI python library - Github.com/hephyrius/Ki
"""

import random as r
from FeedForwardNeuralNetwork import FeedForwardNeuralNetwork as FFN

class GeneticOptomiser():
    
    Population = []
    PopulationSize = 0

    NetworkSize = []
    Best = []
    
    #initialise the network
    def __init__(self, _PopulationSize, _NetworkSize):
        
        self.Population = []
        self.PopulationSize = _PopulationSize
        self.NetworkSize = _NetworkSize
        self.Best = []
        
        print("Init Population")
        
        #initialise the starting population
        for i in range(self.PopulationSize):
            
            self.Population.append(FFN(self.NetworkSize))
            
GN = GeneticOptomiser(50, [4,2,2])
print(GN.Population[0].LayerSizes)