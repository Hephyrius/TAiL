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

import "./TAiLNN.sol";

contract TAiL {
    
    uint networkNumber = 0;

    //Neural Network Values
    mapping(uint => address) Networks;
    mapping(uint => address) NetworkOwners;
    mapping(uint => mapping(uint => uint[])) NetworkPredictionHistory;
    mapping(uint => uint) NetworkTotalPrediction;
    
    constructor () public {
        networkNumber = 0;
    }
    
    
    
    //set up the neural network
    function SetupNetwork(uint[] _LayerSizes, uint[] _Biases, uint[] _Weights) public {
        
        TAiLNN a = new TAiLNN();
        a.SetupNetwork(_LayerSizes, _Biases, _Weights);
        
        address NewNetwork = address(a);
        Networks[networkNumber] = NewNetwork;
        NetworkOwners[networkNumber] = msg.sender;
        
        emit NetworkCreated(NewNetwork, networkNumber, msg.sender);
        networkNumber += 1;

    }
    
    //event that shows that a neural network has been initialised.
    event NetworkCreated (address Network, uint NetworkNumber, address owner);
        
    //make a prediction on user given data 
    function Predict(uint NetworkNumber, uint[] data) public {
        
        uint[] memory prediction = TAiLNN(Networks[NetworkNumber]).Predict(data);
        uint totalPrediction = NetworkTotalPrediction[NetworkNumber];

        //store predictions on chain as opposed to events only - api.trongrid doesnt store history well!
        NetworkPredictionHistory[NetworkNumber][totalPrediction] = prediction;
        NetworkTotalPrediction[NetworkNumber] = totalPrediction + 1;

        emit NetworkPredictionMade(NetworkNumber, prediction);
        
    }
    
    //the prediction event tells the user what the network predicts, as well as raw values
    event NetworkPredictionMade(uint network, uint[] RawValues);

    //get the network address
    function getNetworkAddress(uint NetworkNumber) public view returns (address) {
        return Networks[NetworkNumber];
    }

    //get the network Owners address
    function getNetworkOwners(uint NetworkNumber) public view returns (address) {
        return NetworkOwners[NetworkNumber];
    }

    //get the total number of predictions for a network
    function getTotalNetworkPredictions(uint NetworkNumber) public view returns (uint) {
        return NetworkTotalPrediction[NetworkNumber];
    }

    //get the total number of predictions for a network
    function getHistoricPrediction(uint NetworkNumber, uint PredictionNumber) public view returns (uint[]) {
        return NetworkPredictionHistory[NetworkNumber][PredictionNumber];
    }

    //get the total number of deployed networks
    function getNetworkCount() public view returns (uint) {
        return networkNumber;
    }


}

