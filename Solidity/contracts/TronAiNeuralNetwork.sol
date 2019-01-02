pragma solidity >=0.4.23;

contract TronAiNeuralNetwork {
    
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
        require(msg.sender == NetworkOwner, "Non-Owner attempting to set network up");
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
    
    event NetworkCreated (uint ins, uint out, address owner);
        
    //make a prediction on user given data 
    function Predict(uint[] data) public {
        
        require(data.length == NumberInputs, "Data is not the correct length");
        
        uint[] memory CalculatedValues = new uint[](NumberNeurons);
        
        //set the values for the first layer
        for(uint i=0; i<data.length; i++){
            CalculatedValues[i] = data[i];
        }
        
    }
    
}

