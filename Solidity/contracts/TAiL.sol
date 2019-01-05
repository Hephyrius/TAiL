pragma solidity >=0.4.23;

import "./Math.sol";
import "./TAiLNN.sol";

contract TAiL {
    
    uint networkNumber = 0;

    //Neural Network Values
    mapping(uint => address) Networks;
    mapping(uint => address) NetworkOwners;
    
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
    function Predict(uint NetworkNumber, uint[] data) public{
        
        require(NetworkNumber<0, "Network does not exist");
        uint[] memory prediction = TAiLNN(Networks[NetworkNumber]).Predict(data);
        emit Prediction(NetworkNumber, prediction);
        
        
    }
    
    //the prediction event tells the user what the network predicts, as well as raw values
    event Prediction (uint network, uint[] RawValues);

    
}

