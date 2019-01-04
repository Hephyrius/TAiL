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
import numpy as np
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
            #self.RandomizeIndividualNetwork(i)
    
    #init the network with random data
    def RandomizeIndividualNetwork(self, NetworkNumber):
        Network = self.Population[NetworkNumber]
        
        #randomise biases
        for i in range(len(Network.NeuronBiases)):
            Network.NeuronBiases[i] = r.random()
            #print(Network.NeuronBiases[i])
        
        #randomise the connection weights
        for i in range(len(Network.NeuronConnectonsWeights)):
            Network.NeuronConnectonsWeights[i][2] = r.random()
            #print(Network.NeuronConnectonsWeights[i])
    
    def Mutate(self, NetworkNumber = 0, isNumber=True, NetworkValues=" "):
        
        if isNumber:
            NewNetwork = copy.deepcopy(self.Population[NetworkNumber])
        else:
            NewNetwork = copy.deepcopy(NetworkValues)
            
        NewNetwork.Fitness = 0
        
        #Mutate biases
        for i in range(len(NewNetwork.NeuronBiases)):
            
            val = r.random()
            
            #take away a random amount
            if val <= 0:
                
                NewNetwork.NeuronBiases[i] = -r.random()
            
            #randomise the weight value
            elif val <= 0.02:
                
                NewNetwork.NeuronBiases[i] = r.random()
            
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
                
            #print(Network.NeuronBiases[i])
        
        #Mutate the connection weights
        NeuronConnectonsWeights = copy.deepcopy(NewNetwork.NeuronConnectonsWeights)
        
        for i in range(len(NewNetwork.NeuronConnectonsWeights)):
            
            val = r.random()
            
            #take away a random amount
            if val <= 0:
                
                NeuronConnectonsWeights[i][2] = -r.random()
            
            #randomise the weight value
            elif val <= 0.02:
                
                NeuronConnectonsWeights[i][2] = r.random()
            
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
                
            
            #ensure that we have an int value after mutation
            #NeuronConnectonsWeights[i][2] = int(NeuronConnectonsWeights[i][2])
            

        
        NewNetwork.NeuronConnectonsWeights = NeuronConnectonsWeights
        
        return NewNetwork
    
    #generate network from two other networks
    def CrossOver(self, Network1, Network2):
        NewNetwork = FFN(self.NetworkSize)
        NetworkOne = self.Population[Network1]
        NetworkTwo = self.Population[Network2]
        
        #crossover biases
        for i in range(NewNetwork.TotalNeurons):
            if(i<NewNetwork.TotalNeurons/2):
                NewNetwork.NeuronBiases[i] = NetworkOne.NeuronBiases[i]
            else:
                NewNetwork.NeuronBiases[i] = NetworkTwo.NeuronBiases[i]
            #print(Network.NeuronBiases[i])
        
        #crossover the connection weights
        for i in range(NewNetwork.TotalConnections):
     
            if(i< NewNetwork.TotalConnections / 2):
                NewNetwork.NeuronConnectonsWeights[i][2] = NetworkOne.NeuronConnectonsWeights[i][2]
            else:
                NewNetwork.NeuronConnectonsWeights[i][2] = NetworkTwo.NeuronConnectonsWeights[i][2]
            

            
                
            #print(Network.NeuronConnectonsWeights[i])
        return NewNetwork

    def AssessNetworkAccuracy(self, NetworkNumber, X, Y):
        
        Network = self.Population[NetworkNumber]
        
        TotalValues = len(Y)
        Accuracy = 0
        
        for i in range(len(Y)):
            #print(i)
            prediction = Network.Predict(X[i])
            
            if np.argmax(prediction) == Y[i]:
                #print(np.argmax(prediction))
                Accuracy += 1
        
        Fitness = Accuracy/TotalValues
        Network.Fitness = Fitness
    
    #Assess the entire population
    def AssessPopulation(self, X, Y):
        
        for i in range(len(self.Population)):
            
            self.AssessNetworkAccuracy(i, X, Y)
        
        bestFitness = 0
        popfitness = 0
        
        for i in range(len(self.Population)):
            popfitness += self.Population[i].Fitness
            if self.Population[i].Fitness > bestFitness:
                bestFitness = self.Population[i].Fitness
        
        popfitness = popfitness / self.PopulationSize
        print("Best Fitness = " + str(bestFitness))
        print("Population Fitness = " + str(popfitness))
        
        return bestFitness
    
    #do the entire GA process
    def Fit(self, X, Y, NumIterations, Custom=False, Function=AssessPopulation):
        
        for i in range(NumIterations):
            print("=====================================")
            print("Epoch " + str(i) + " / " + str(NumIterations))
            #assess the networks
            if Custom == False:
                self.AssessPopulation(X, Y)
            else:
                Function(self, X, Y)
            
            #sort the population in fitness order
            for j in range(len(self.Population)):
                
                for k in range(j+1, len(self.Population)):
                    
                    if self.Population[j].Fitness < self.Population[k].Fitness:
                        
                        net = self.Population[j]
                        self.Population[j] = self.Population[k]
                        self.Population[k] = net
            
            #store the best two in the bests array
            self.Best = []
            self.Best.append(self.Population[0])
            self.Best.append(self.Population[1])
            
            
            #Create a new Population
            NewPopulation = []
            NewPopulation.append(self.Population[0])
            NewPopulation.append(self.Population[1])
            
            #print(self.Population[0].NeuronOutputs)
            
            for i in range(self.PopulationSize - 2):
                
                operation = r.random()
                
                if operation <=0.25:
                    
                    net = int(r.randrange(0,(self.PopulationSize*0.4)))
                    newNet = self.Mutate(NetworkNumber=net)
                    NewPopulation.append(newNet)
                
                elif operation <= 0.75:
                    
                    net1 = int(r.randrange(0,(self.PopulationSize*0.4)))
                    net2 = int(r.randrange(0,(self.PopulationSize*0.4)))
                    net3 = self.CrossOver(net1, net2)
                    NewPopulation.append(net3)
                    
                elif operation <= 0.9:
                    net1 = int(r.randrange(0,(self.PopulationSize*0.4)))
                    net2 = int(r.randrange(0,(self.PopulationSize*0.4)))
                    
                    net3 = self.CrossOver(net1, net2)
                    net3 = self.Mutate(isNumber=False, NetworkValues=net3)
                    NewPopulation.append(net3)
                else: 
                    #print(self.NetworkSize)
                    NewPopulation.append(FFN(self.NetworkSize))
            
            self.Population = NewPopulation
            
        self.Population[0].ConvertToTron()

#GN = GeneticOptomiser(50, [4,2,2])
#print(GN.Population[0].LayerSizes)





























