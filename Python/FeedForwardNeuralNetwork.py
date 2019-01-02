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
    #NeuronLayers = []
    NeuronBiases = []
    NeuronConnectonsWeights = []
    NeuronActivationFunctions = []
    TotalNeurons = 0
    NetworkFitness = 0
    
    #initialise the network
    def __init__ (self, _LayerSizes):
        
        print("Init Variables")
        self.LayerSizes = []
        self.NeuronLayers = []
        self.NeuronBiases = []
        self.NeuronConnectons = []
        self.TotalNeurons = 0
        self.NetworkFitness = 0
        
        print("Setting Up Networks")
        self.CreateNetwork(_LayerSizes)
        
    #set up lists within the network
    def CreateNetwork(self, _LayerSizes):
        
        total = 0
        
        for i in _LayerSizes:
            
            self.LayerSizes.append(i)
            total += i
        
        self.TotalNeurons = total
        
        #add biases to the bias list
        for i in range(total):
            self.NeuronBiases.append(0)
            
        counter = self.LayerSizes[0]
        layerstart = 0
        #add connections
        for i in range(1, len(self.LayerSizes)):
            
            PreviousLayer = self.LayerSizes[i - 1]
            CurrentLayer = self.LayerSizes[i]
            
            for j in range(CurrentLayer):
                for k in range(PreviousLayer):
                    
                    PrevLayerNeuron = layerstart + k
                    CurrentLayerNeuron = counter
                    Weight = 0
                    Activation = 0
                    Connection = [PrevLayerNeuron, CurrentLayerNeuron, Weight, Activation]
                    print(Connection)
                    self.NeuronConnectonsWeights.append(Connection)
                    
                counter += 1
                    
                
            layerstart += PreviousLayer
                    
        
FFN = FeedForwardNeuralNetwork([2,1,1])






















