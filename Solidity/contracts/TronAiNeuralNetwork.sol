pragma solidity >=0.4.23;

contract TronAiNeuralNetwork {
    
    //Network Owner
    address NetworkOwner;
    bool NetworkSet;
    
    //Network Configuration
    uint NumberOutputs;
    uint NumberInputs;
    
    //Neural Network Values
    mapping(uint => uint) NeuronBiases;
    mapping(uint => uint) Layers;
    mapping(uint => mapping(uint => uint)) NeuronConnectionWeights;
    mapping(uint => mapping(uint => uint)) ConnectionActivationFunctions;
    
    constructor () public {
        //set the owner of the network to the contract creator
        NetworkOwner = msg.sender;
    }
    
    function SetWeights(uint inputs, uint outputs, uint[] Values) public {
        
        require(NetworkSet == false, "Network has already been set up");
        require(msg.sender == NetworkOwner, "Non-Owner attempting to set network up");
        
        NumberInputs = inputs;
        NumberOutputs = outputs;
        
        
        emit NetworkCreated(inputs, outputs, NetworkOwner);
        
        //set the network to a perment change where it cant be changed.
        NetworkSet = true;
    }
    
        event NetworkCreated (uint ins, uint out, address owner);
    
}

