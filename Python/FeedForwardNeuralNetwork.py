# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 15:27:48 2019

@author: Harnick Khera (Hephyrius)

This library allows a user to Train a feed forward neural network that can be deployed on the TVM and used as a stand alone system or within complex contracts.

This implementation is as similar as the solidity implementation as possible as it allows transfering between systems without issues

This is also loosely based on my work on my KI python library - Github.com/hephyrius/Ki

"""

import random as r
import numpy as np
import math

class FeedForwardNeuralNetwork():
    
    LayerSizes = []
    NeuronLayers = []
    NeuronBiases = []
    NeuronConnectonsWeights = []
    NeuronActivationFunctions = []
    
    NetworkFitness = 0
    
    #initialise the network
    def __init__ (self, _LayerSizes):
        
        print("Init")
        
        self.CreateNetwork(_LayerSizes)
        
    
    #set up lists within the network
    def CreateNetwork(self, _LayerSizes):
        
        for i in _LayerSizes:
            
            Layer = []
            
            for j in range(i):
                
                Layer.append(0)
            
            self.Layers.append(Layer)
        self.ConnectLayers()
    


FFN = FeedForwardNeuralNetwork([4,5,2])