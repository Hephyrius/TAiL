pragma solidity >=0.4.23;

//TAiL is a dApp and Library created for the Tron Accelerator
//The Python library enables training of Neural Network Classifiers
//As well as the export of trained models in JSON Form
//The smart contract allows pretrained models to be used on the TVM
//By allowing users to initialise them via a smart contract deployer system
//The ReactJs front end allows the deployment, initialisation and use of the Neural Networks
//It also allows the exploration of the Neural Networks by allowing users to see Past Predictions
//As Well as Owners and Deployed Addresses.
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/TAiL)

import "./Math.sol";

contract TAiLNN {
    
    using Math for uint;
    
    //Network Owner
    address NetworkOwner;
    bool NetworkSet;
    
    //Network Configuration
    uint NumberOutputs;
    uint NumberInputs;
    uint NumberLayers;
    uint NumberNeurons;
    
    //Neural Network Values
    mapping(uint => uint) LayerSizes;
    mapping(uint => uint) NeuronLayers;
    mapping(uint => uint) NeuronBiases;
    mapping(uint => mapping(uint => uint)) NeuronConnectionWeights;
    mapping(uint => mapping(uint => uint)) NeuronActivationFunctions;
    
    constructor () public {
        //set the owner of the network to the contract creator
        NetworkOwner = msg.sender;
    }
    
    //set up the neural network
    function SetupNetwork(uint[] _LayerSizes, uint[] _Biases, uint[] _Weights) public {
        
        require(NetworkSet == false, "Network has already been set up");
        require(_Weights.length % 4 == 0 , "Invalid weight data");
        
        //set the networks configuration
        NumberLayers = _LayerSizes.length;
        NumberNeurons = _Biases.length;
        
        //seting layer sizes
        uint i;
        uint j;
        uint counter = 0;
        
        for(i=0; i<_LayerSizes.length; i++){
            
            //set the input/output sizes
            if(i == 0) {
                NumberInputs = _LayerSizes[i];
            }
            else if(i == _LayerSizes.length -1){
                NumberOutputs = _LayerSizes[i];
            }
            
            LayerSizes[i] = _LayerSizes[i];
            
            //set the biases of the network
            for(j=0; j<_LayerSizes[i]; j++){
                
                NeuronBiases[counter] = _Biases[counter];
                NeuronLayers[counter] = i;

                counter += 1;
            }
            
        }
        
        //set the weights of the network
        for(i=0; i<_Weights.length; i+=4){
            
            uint neuron1 = _Weights[i];
            uint neuron2 = _Weights[i+1];
            
            //set the networks weights
            NeuronConnectionWeights[neuron1][neuron2] = _Weights[i+2];
            
            //set the networks activation functions
            NeuronActivationFunctions[neuron1][neuron2] = _Weights[i+3];
        }
        
        
        emit NetworkCreated(NumberInputs, NumberOutputs, NetworkOwner);
        
        //set the network to a perment change where it cant be changed.
        NetworkSet = true;
    }
    
    //event that shows that a neural network has been initialised.
    event NetworkCreated (uint ins, uint out, address owner);
        
    //make a prediction on user given data 
    function Predict(uint[] data) public returns(uint[]){
        
        require(data.length == NumberInputs, "Data is not the correct length");
        
        uint[] memory CalculatedValues = new uint[](NumberNeurons);
        
        //set the values for the first layer
        for(uint i=0; i<data.length; i++){
            CalculatedValues[i] = data[i];
        }
        
        uint NeuronCount = data.length;
        uint layerStart = 0;
        //calculate values for each layer
        for(i = 1; i<NumberLayers; i++){
            
            //get the layer sizes so that connection can be found
            uint prevLayerSize = LayerSizes[i-1];
            uint LayerSize = LayerSizes[i];
            
            //calculate values for a given layers neurons
            for (uint j = 0; j<LayerSize; j ++){
                uint value = 0;
                
                //calculate a value for each node multiplying by the weights.
                for(uint k = 0; k<prevLayerSize; k++){
                    uint ConnectedNeuron = layerStart + k;
                    uint calculatedWeight = CalculatedValues[ConnectedNeuron].wmul(uint(NeuronConnectionWeights[ConnectedNeuron][NeuronCount]));
                    //The nodes value is increased by the the multiplacation of connection values, biases, and previous node values.
                    
                    // apply the activation function (this doesnt really do anything)...
                    value += IntegerRelu(calculatedWeight);
                }
                
                CalculatedValues[NeuronCount] = value;
                
                NeuronCount += 1;
            }
            
            //this counter helps keep track/point to where the current layer is
            layerStart += prevLayerSize;
            
        }
        
        //generating values for an event emit
        uint LastLayerSize = LayerSizes[NumberLayers - 1];
        uint[] memory RawValues = new uint[](LastLayerSize);
        
        for(i =0; i<LastLayerSize; i++){
            
            RawValues[((LastLayerSize-i) - 1)] = CalculatedValues[((CalculatedValues.length-1)-i)];
        }
        
        //emit an event to tell the user what the neural Prediction is for the last layer
        emit PredictionMade(RawValues);
        
        return RawValues;
    }
    
    //the prediction event tells the user what the network predicts, as well as raw values
    event PredictionMade(uint[] RawValues);
    
    //the relu activation wont change anything as the neural networks are not using ints, therefore cannot be negative
    //its here as its better to remember we need some activation function!
    function IntegerRelu(uint x) public returns (uint){
        if(x < 0){
            return 0;
        }else {
            return x;
        }
    }
    
}

