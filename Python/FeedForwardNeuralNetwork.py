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
import json

class FeedForwardNeuralNetwork():
    
    LayerSizes = []
    NeuronBiases = []
    NeuronConnectonsWeights = []
    TotalNeurons = 0
    NetworkFitness = 0
    
    #initialise the network
    def __init__ (self, _LayerSizes):
        
        #print("Init Variables")
        self.LayerSizes = []
        self.NeuronBiases = []
        self.NeuronErrors = []
        self.NeuronOutputs = []
        self.NeuronConnectons = []
        self.TotalLayers = 0
        self.TotalNeurons = 0
        self.NetworkFitness = 0
        self.TotalConnections = 0
        
        #print("Setting Up Networks")
        self.CreateNetwork(_LayerSizes)
        self.RandomiseNetwork()
        
    #set up lists within the network
    def CreateNetwork(self, _LayerSizes):
        
        total = 0
        totalConnections = 1
        
        for i in _LayerSizes:
            
            self.LayerSizes.append(i)
            totalConnections *= i
            total += i
            
        self.TotalLayers = len(self.LayerSizes)
        self.TotalNeurons = total
        self.TotalConnections = totalConnections
        
        #add biases to the bias list
        for i in range(total):
            self.NeuronBiases.append(0)
            
            #init values used by backprop
            self.NeuronErrors.append(0)
            self.NeuronOutputs.append(0)
            
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
                    Weight = 1
                    Activation = 0
                    Connection = [PrevLayerNeuron, CurrentLayerNeuron, Weight, Activation]
                    #print(Connection)
                    self.NeuronConnectonsWeights.append(Connection)
                    
                counter += 1
                    
                
            layerstart += PreviousLayer
            
    #set make a prediction given data
    def Predict(self, Data):  
        
        CalculatedValues = []
        
        for i in range(self.LayerSizes[0]):
            CalculatedValues.append(Data[i])
        
        counter = self.LayerSizes[0]
        layerstart = 0
        
        #add connections
        for i in range(1, self.TotalLayers):
            
            PreviousLayer = self.LayerSizes[i - 1]
            CurrentLayer = self.LayerSizes[i]
            
            for j in range(CurrentLayer):
                value = 0
                for k in range(PreviousLayer):
                    
                    PrevLayerNeuron = layerstart + k
                    CurrentLayerNeuron = counter
                    
                    #find the connection weight of a given connection
                    connectionWeight = 0
                    
                    for l in range(len(self.NeuronConnectonsWeights)):
                        
                        weight = self.NeuronConnectonsWeights[l]
                        
                        if(weight[0] == PrevLayerNeuron and weight[1] == CurrentLayerNeuron):
                            connectionWeight = weight[2]
                    
                    value += (self.sigmoid(connectionWeight * CalculatedValues[PrevLayerNeuron]))
                    
                counter += 1
                CalculatedValues.append(value)
                    
                
            layerstart += PreviousLayer
            #print(CalculatedValues)
        
        Prediction = []
        
        total = 0
        for i in range(self.TotalLayers):
            self.LayerSizes.append(i)
            
            if i == (self.TotalLayers - 1):
                LastLayer = self.LayerSizes[self.TotalLayers - 1]
                #print(LastLayer)
                for j in range(LastLayer):
                    index = total + j
                    Prediction.append(CalculatedValues[index])
                
                
            total += self.LayerSizes[i]
        

            
        self.NeuronOutputs = CalculatedValues
        
        #print(self.NeuronOutputs)
        
        return Prediction
    
    def sigmoid(self, x):
        return x*(1-x) 
    #init the network with random biases and weights
    def RandomiseNetwork(self):

        #randomise biases
        for i in range(len(self.NeuronBiases)):
            self.NeuronBiases[i] = r.randint(0,100)
            #print(Network.NeuronBiases[i])
        
        #randomise the connection weights
        for i in range(len(self.NeuronConnectonsWeights)):
            self.NeuronConnectonsWeights[i][2] = r.randint(0,100)


    #fitting the model using stochastic gradient descent
    def BackPropergation(self):
        print("Epoch")
        
        #calculate the error for a given example
        prediction = self.Predict(x);
        predictionError = y-np.argmax(prediction)
        
            
    def ConvertToTron(self):
        bias = self.NeuronBiases
        layerSize = self.LayerSizes
        
        ConnectionWeights = []
        
        for i in range(len(self.NeuronConnectonsWeights)):
            for j in self.NeuronConnectonsWeights[i]:
                ConnectionWeights.append(j)
        
        data = {'Biases':bias, 'LayerSize':layerSize, 'Connections':ConnectionWeights }
        
        print("Saving Configuration as NeuralNetworkConfiguration.Json")
        
        with open('NeuralNetworkConfiguration.json', 'w') as fp:
            json.dump(data, fp)

        
        return data

#FFN = FeedForwardNeuralNetwork([2,12,10])
#print(FFN.Predict([2,3]))
#FFN.ConvertToTron()



















