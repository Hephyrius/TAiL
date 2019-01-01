pragma solidity >=0.4.23;

contract TronAiNeuralNetwork {
    
    //Network Owner
    address NetworkOwner;
    bool NetworkSet;
    
    //Network Configuration
    uint NumberOutputs;
    uint NumberInputs;
    uint NumberLayers;
    
    //Neural Network Values
    mapping(uint => uint) NeuronBiases;
    mapping(uint => uint) LayerSizes;
    mapping(uint => mapping(uint => uint)) NeuronConnectionWeights;
    mapping(uint => mapping(uint => uint)) ConnectionActivationFunctions;
    
    constructor () public {
        //set the owner of the network to the contract creator
        NetworkOwner = msg.sender;
    }
    
    function SetWeights(uint inputs, uint outputs, uint Layers, uint[] _LayerSizes, uint[] Values) public {
        
        require(NetworkSet == false, "Network has already been set up");
        require(msg.sender == NetworkOwner, "Non-Owner attempting to set network up");
        
        //set the networks configuration
        NumberInputs = inputs;
        NumberOutputs = outputs;
        NumberLayers = Layers;
        
        //seting layer sizes
        uint i;
        for(i=0; i<_LayerSizes.length; i++){
            LayerSizes[i] = _LayerSizes[i];
        }
        
        /*uint j;
        for(i=0; i<_LayerSizes.length; i++){
            
            j += 1;
        }*/
        
        emit NetworkCreated(inputs, outputs, NetworkOwner);
        
        //set the network to a perment change where it cant be changed.
        NetworkSet = true;
    }
    
        event NetworkCreated (uint ins, uint out, address owner);
    
}

