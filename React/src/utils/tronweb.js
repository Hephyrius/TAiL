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

import Swal from 'sweetalert2'

import {a2hex, hex2a, Time2a, intToUint} from "./parser"

const TronWeb = require('tronweb')

var tronWeb;

//connecting tronweb to the local docker node
const tronWebDefault = new TronWeb(
    "https://api.trongrid.io",
    "https://api.trongrid.io",
    "https://api.trongrid.io",
    'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0', //default testnet pkey
)

function dynamicTronlink(){
    var tron = tronWebDefault

    if (!!window.tronWeb){
        tron = window.tronWeb;
    }

    return tron;
}

//address of the contract
const contractAddress = "TYmKe1dhZupYYReBGpLdsEV9oqWwX7TFbE";
//const contractAddress = "TRfMXBToAQAgbnKskpcu25ZkJyDd6cgDRT"; //latest shasta version

export async function CreateNetwork(fr) {
    

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //construct the bias array
    let Biases = []

    for(var i =0; i<fr['Biases'].length; i++){
        Biases = Biases.concat(intToUint(fr['Biases'][i]))
    }
    console.log(Biases)

    //construct the connection arrays
    let Connections = []

    for(var i =0; i<fr['Connections'].length; i++){
        Connections = Connections.concat(intToUint(fr['Connections'][i]))
    }
    console.log(Connections)
    
    //construct the size array
    let LayerSize = []

    for(var i =0; i<fr['LayerSize'].length; i++){
        LayerSize = LayerSize.concat(intToUint(fr['LayerSize'][i]))
    }
    console.log(LayerSize)


    //notify the user that the post has been submitted
    Swal({title:'Neural Network Submitted for Creation',
        type: 'info'
    });
    //submit the data to the blockchain
    contract.SetupNetwork(LayerSize, Biases, Connections).send({
        shouldPollResponse:true,
        callValue:0

    }).then(res => Swal({
        title:'Neural Network Creation Successfully',
        type: 'success'

    })).catch(err => Swal(
        {
            title:'Neural Network Creation Failed',
            type: 'error'
        }
    ));
    

}

export async function Predict(Network, Values) {

    //load the contract 
    const contract = await window.tronWeb.contract().at(contractAddress);

    //construct the bias array
    let Inputs = []

    for(var i =0; i<Values.length; i++){
        if (Values[i] !== ''){
            var n = intToUint((Number(Values[i]) * 1000000))
            console.log(n)
            Inputs = Inputs.concat(n)
        }
    }
    console.log(Inputs)
    let NetworkNumber =  "0x" + Number(Network).toString(16);
    //notify the user that the post has been submitted
    Swal({title:'Prediction Transaction Requested',
        type: 'info'
    });
    //submit the data to the blockchain
    contract.Predict(NetworkNumber, Inputs).send({
        shouldPollResponse:true,
        callValue:0

    }).then(res => Swal({
        title:'Prediction Successfull',
        type: 'success'

    })).catch(err => Swal(
        {
            title:'Prediction Failed',
            type: 'error'
        }
    ));
}


//get data from contract events and convert it into a readable/useable state
export async function getNetworks() {
    tronWeb = dynamicTronlink()
    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "NetworkCreated", 0,  200, 1);

    var Networks = []
    for(var i=0; i<events.length; i++){

        let address = events[i]['result']['owner'];
        let HexOwnerAddress = events[i]['result']['owner'];
        address = address.substring(2, address.length);
        address = tronWeb.address.fromHex(address)

        let NetworkAddress = events[i]['result']['Network'];
        let  HexNetworkAddress= events[i]['result']['Network'];
        NetworkAddress = NetworkAddress.substring(2, NetworkAddress.length);
        NetworkAddress = "41" + NetworkAddress;
        NetworkAddress = tronWeb.address.fromHex(NetworkAddress)

        //format data so it can be used and stored better
        var NetworkData = {
            NetworkNumber: events[i]['result']['NetworkNumber'],
            Network: NetworkAddress,
            HexNetworkAddress: HexNetworkAddress,
            Owner: address,
            HexOwnerAddress:HexOwnerAddress
          }

          Networks = Networks.concat(NetworkData);
    }

    localStorage.setItem("Networks", JSON.stringify(Networks));

    return Networks;
}

//get data from contract events and convert it into a readable/useable state
export async function getNetworksStored() {
    tronWeb = dynamicTronlink()
    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "NetworkCreated", 0,  200, 1);

    var Networks = []
    for(var i=0; i<events.length; i++){

        let address = events[i]['result']['owner'];
        let HexOwnerAddress = events[i]['result']['owner'];
        address = address.substring(2, address.length);
        address = tronWeb.address.fromHex(address)

        let NetworkAddress = events[i]['result']['Network'];
        let  HexNetworkAddress= events[i]['result']['Network'];
        NetworkAddress = NetworkAddress.substring(2, NetworkAddress.length);
        NetworkAddress = "41" + NetworkAddress;
        NetworkAddress = tronWeb.address.fromHex(NetworkAddress)

        //format data so it can be used and stored better
        var NetworkData = {
            NetworkNumber: events[i]['result']['NetworkNumber'],
            Network: NetworkAddress,
            HexNetworkAddress: HexNetworkAddress,
            Owner: address,
            HexOwnerAddress:HexOwnerAddress
          }

          Networks = Networks.concat(NetworkData);
    }

    localStorage.setItem("Networks", JSON.stringify(Networks));

    return Networks;
}

//get data from contract events and convert it into a readable/useable state
export async function getPredictions() {
    tronWeb = dynamicTronlink()

    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "NetworkPredictionMade", 0,  200, 1);
    console.log(events)
    
    var Predictions = []
    for(var i=0; i<events.length; i++){

        //format data so it can be used and stored better
        var Prediction = {
            NetworkNumber: events[i]['result']['network'],
            Network: events[i]['result']['RawValues']
          }

          Predictions = Predictions.concat(Prediction);
    }

    localStorage.setItem("Predictions", JSON.stringify(Predictions));

    return Predictions;
}

//get the vote counters from the blockchain
export async function getNetworkData() {

    tronWeb = dynamicTronlink()

    var Networks = []
    var PredictionData = []

    const contract = await tronWeb.contract().at(contractAddress);

    let NumberNetworks = await contract.getNetworkCount().call();
    let TotalNetworks = tronWeb.toBigNumber(NumberNetworks['_hex']).toNumber();

    for(var i=0; i<TotalNetworks; i++){
        let id = "0x" + Number(i).toString(16);
        let NetworkAddress= await contract.getNetworkAddress(id).call();
        let TronAddress = tronWeb.address.fromHex(NetworkAddress);

        let OwnerNetworkAddress= await contract.getNetworkOwners(id).call();
        let OwnerTronAddress = tronWeb.address.fromHex(OwnerNetworkAddress);

        let NumberPredictions = await contract.getTotalNetworkPredictions(id).call();
        let TotalNetworkPredictions = tronWeb.toBigNumber(NumberPredictions['_hex']).toNumber();

        for(var j=0; j<TotalNetworkPredictions; j++){
            let pid = "0x" + Number(j).toString(16);

            let Predictions = await contract.getHistoricPrediction(id, pid).call();
            let Pred = []
            let Predicted = 0
            let PredictedClass = 0
            for(var k = 0; k< Predictions.length; k++){
                let Value = tronWeb.toBigNumber(Predictions[k]).toNumber();
                Pred = Pred.concat(Value)
                if(Value > Predicted){
                    Predicted = Value
                    PredictedClass = k
                }
            }
            var Prediction = {
                NetworkNumber: i,
                PredictionNumber: j,
                RawPrediction: Pred,
                PredictedClass: PredictedClass
            }
            PredictionData = PredictionData.concat(Prediction);
        }

        //format data so it can be used and stored better
        var NetworkData = {
            NetworkNumber: i,
            Network: TronAddress,
            HexNetworkAddress: NetworkAddress,
            Owner: OwnerTronAddress,
            HexOwnerAddress:OwnerNetworkAddress,
            TotalPredictions: TotalNetworkPredictions
            }

            Networks = Networks.concat(NetworkData);
    } 

    localStorage.setItem("Networks", JSON.stringify(Networks));
    localStorage.setItem("Predictions", JSON.stringify(PredictionData));

    return Networks;
}