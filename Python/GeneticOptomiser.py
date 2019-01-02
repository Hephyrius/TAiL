# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 18:53:15 2019

@author: Harnick Khera (Hephyrius)

This library allows a user to Train a feed forward neural network that can be deployed on the TVM and used as a stand alone system or within complex contracts.

This implementation is as similar as the solidity implementation as possible as it allows transfering between systems without issues

This is also loosely based on my work on my KI python library - Github.com/hephyrius/Ki
"""

import random as r
import copy
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
            self.RandomizeIndividualNetwork(i)
            self.MutateNetwork(i)
    
    #init the network with random data
    def RandomizeIndividualNetwork(self, NetworkNumber):
        Network = self.Population[NetworkNumber]
        
        #randomise biases
        for i in range(len(Network.NeuronBiases)):
            Network.NeuronBiases[i] = r.randint(0,65536)
            #print(Network.NeuronBiases[i])
        
        #randomise the connection weights
        for i in range(len(Network.NeuronConnectonsWeights)):
            Network.NeuronConnectonsWeights[i][2] = r.randint(0,65536)
            #print(Network.NeuronConnectonsWeights[i])
    
    def MutateNetwork(self, NetworkNumber):
        Network = self.Population[NetworkNumber]
        NewNetwork = copy.deepcopy(self.Population[NetworkNumber])
        NewNetwork.Fitness = 0
        
        #Mutate biases
        for i in range(len(NewNetwork.NeuronBiases)):
            
            val = r.random()
            
            #take away a random amount
            if val <= 0:
                
                NewNetwork.NeuronBiases[i] = -r.randint(0,65536)
            
            #randomise the weight value
            elif val <= 0.02:
                
                NewNetwork.NeuronBiases[i] = r.randint(0,65536)
            
            #increase by a factor
            elif val <= 0.04:
                
                factor = r.random() + 1
                NewNetwork.NeuronBiases[i] *= factor
                
            elif val <=0.08:
                
                factor = r.random()
                NewNetwork.NeuronBiases[i] *= factor
            
            #checks before moving onto the next value
            if (NewNetwork.NeuronBiases[i] < 0):
                NewNetwork.NeuronBiases[i] = 0
                
            elif(NewNetwork.NeuronBiases[i] > 65536):
                NewNetwork.NeuronBiases[i] = 65536
            #print(Network.NeuronBiases[i])
        
        #Mutate the connection weights
        NeuronConnectonsWeights = copy.deepcopy(NewNetwork.NeuronConnectonsWeights)
        
        for i in range(len(NewNetwork.NeuronConnectonsWeights)):
            
            val = r.random()
            
            #take away a random amount
            if val <= 0:
                
                NeuronConnectonsWeights[i][2] = -r.randint(0,65536)
            
            #randomise the weight value
            elif val <= 0.02:
                
                NeuronConnectonsWeights[i][2] = r.randint(0,65536)
            
            #increase by a factor
            elif val <= 0.04:
                
                factor = r.random() + 1
                NeuronConnectonsWeights[i][2] *= factor
                
            elif val <=0.08:
                
                factor = r.random()
                NeuronConnectonsWeights[i][2] *= factor
            
            #checks before moving onto the next value
            if (NeuronConnectonsWeights[i][2] < 0):
                NeuronConnectonsWeights[i][2] = 0
                
            elif(NeuronConnectonsWeights[i][2] > 65536):
                NeuronConnectonsWeights[i][2] = 65536
            
            
            #ensure that we have an int value after mutation
            NeuronConnectonsWeights[i][2] = int(NeuronConnectonsWeights[i][2])
            

        
        NewNetwork.NeuronConnectonsWeights = NeuronConnectonsWeights
        
        return NewNetwork
        
    
GN = GeneticOptomiser(50, [4,2,2])
#print(GN.Population[0].LayerSizes)





























