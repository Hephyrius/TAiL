# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 15:27:48 2019

@author: Harnick Khera (Hephyrius)

This library allows a user to Train a feed forward neural network that can be deployed on the TVM and used as a stand alone system or within complex contracts.

This implementation is as similar as the solidity implementation as possible as it allows transfering between systems without issues

This is also loosely based on my work on my KI python library - Github.com/hephyrius/Ki

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

import random as r
import numpy as np
import json
import math

class FeedForwardNeuralNetwork():
    
    LayerSizes = []
    NeuronBiases = []
    NeuronConnectonsWeights = []
    NeuronErrors = []
    TotalNeurons = 0
    NetworkFitness = 0
    TotalError = 0
    LearningRate = 0.01
    
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
        self.TotalError = 0
        self.LearningRate = 0.01
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
                    
                    value += (self.relu(connectionWeight * CalculatedValues[PrevLayerNeuron]))
                    
                counter += 1
                CalculatedValues.append(value)
                    
                
            layerstart += PreviousLayer
            #print(CalculatedValues)
        
        Prediction = []
        
        total = 0
        for i in range(self.TotalLayers):
            #self.LayerSizes.append(i)
            
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
    
    #set make a prediction given data
    def ForwardPropergation(self, x, y):  
        
        self.TotalError = 0
        ErrorOuts = []
        
        for i in range(self.LayerSizes[self.TotalLayers - 1]):
            ErrorOuts.append(0)
            
        for i in range(len(y)):
            #print(i)
            prediction = self.Predict(x[i])
            
            predicted = np.argmax(prediction)
            
            for j in range(self.LayerSizes[self.TotalLayers - 1]):
                
                if j == predicted:
                    ErrorOuts[j] += (1 - prediction[j])
                else:
                    ErrorOuts[j] += (0 - prediction[j]) 
                    
                #print(ErrorOuts[j])
                
        for i in range(self.LayerSizes[self.TotalLayers - 1]):
            #ErrorOuts[i] = ErrorOuts[i] #S / len(x)
            #ErrorOuts[i] = ErrorOuts[i] * ErrorOuts[i]
            self.TotalError += ErrorOuts[i]
        
        self.TotalError = self.TotalError / len(x)
        print(self.TotalError)
        
    #fitting the model using a home brewed gradient descent
    def BackPropergation(self):
        
        #randomise biases
        for i in range(len(self.NeuronBiases)):
            self.NeuronBiases[i] = self.NeuronBiases[i] * self.TotalError * self.LearningRate
            #print(Network.NeuronBiases[i])
        
        #randomise the connection weights
        for i in range(len(self.NeuronConnectonsWeights)):
            self.NeuronConnectonsWeights[i][2] = self.NeuronConnectonsWeights[i][2] * self.TotalError * self.LearningRate
    
    def Fit(self, x, y, epochs):
        
        for j in range(epochs):
            
            print("=====================================")
            print("Epoch " + str(j) + " / " + str(epochs))
            
            #print(i)
            self.ForwardPropergation(x, y)
            self.BackPropergation()
            
            if j % 20 == 0 and j != 0:
                print(self.TotalError)
            self.AssessNetworkAccuracy(x, y)
            
    def AssessNetworkAccuracy(self, x, y):
        
        TotalValues = len(y)
        Accuracy = 0
        
        for i in range(len(y)):
            #print(i)
            prediction = self.Predict(x[i])
            
            if np.argmax(prediction) == y[i]:
                #print(np.argmax(prediction))
                Accuracy += 1
        
        Fitness = Accuracy/TotalValues
        self.Fitness = Fitness
        print("Network Accuract: " + str(self.Fitness))
        
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))  
    
    def relu(self, x):
        return x * (x > 0)
        
    #init the network with random biases and weights
    def RandomiseNetwork(self):

        #randomise biases
        for i in range(len(self.NeuronBiases)):
            self.NeuronBiases[i] = r.random()
            #print(Network.NeuronBiases[i])
        
        #randomise the connection weights
        for i in range(len(self.NeuronConnectonsWeights)):
            self.NeuronConnectonsWeights[i][2] = r.random()

    def ConvertToTron(self, OutputFileName="NeuralNetworkConfiguration"):
        
        bias = []
        
        for i in range(self.TotalNeurons):
            bias.append(int(self.NeuronBiases[i] * 1e6))
        
        layerSize = []
        for i in range(self.TotalLayers):
            layerSize.append(self.LayerSizes[i])
        
        ConnectionWeights = []
        
        for i in range(self.TotalConnections):

            ConnectionWeights.append(self.NeuronConnectonsWeights[i][0])
            ConnectionWeights.append(self.NeuronConnectonsWeights[i][1])
            ConnectionWeights.append(int(self.NeuronConnectonsWeights[i][2] * 1e6))
            ConnectionWeights.append(self.NeuronConnectonsWeights[i][3])
        
        data = {'Biases':bias, 'LayerSize':layerSize, 'Connections':ConnectionWeights }
        
        print("Saving Configuration as NeuralNetworkConfiguration.Json")
        
        with open( OutputFileName + '.json', 'w') as fp:
            json.dump(data, fp)

        
        return data

#FFN = FeedForwardNeuralNetwork([2,12,10])
#print(FFN.Predict([2,3]))
#FFN.ConvertToTron()



















