import Swal from 'sweetalert2'

import {a2hex, hex2a, Time2a, intToUint} from "./parser"

const TronWeb = require('tronweb')


//connecting tronweb to the local docker node
const tronWeb = new TronWeb(
    "http://127.0.0.1:9090",
    "http://127.0.0.1:9090",
    "http://127.0.0.1:9090",
    'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
)

//address of the contract
const contractAddress = "TDT3Yggb6KsC4doWqK8jF1SMe2wiFyZmJd";

export async function CreateNetwork(fr) {
    

    //load the contract 
    const contract = await tronWeb.contract().at(contractAddress);

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

    //construct the bias array
    let Inputs = []

    for(var i =0; i<Values.length; i++){
        if (Values[i] !== ''){
            var n = intToUint((Number(Values[i]) * 10000))
            console.log(n)
            Inputs = Inputs.concat(n)
        }
    }
    console.log(Inputs)

    let Networks = JSON.parse(localStorage.getItem("Networks"))
    let address = ""
    for(var i =0; i<Networks.length; i++){
        if(Networks[i]["NetworkNumber"] == Network){
            address = Networks[i]["HexNetworkAddress"]
        }
    }

    //notify the user that the request has been submitted
    Swal({title:'Prediction Transaction Requested',
    type: 'info'
    });

    address = address.substring(2, address.length);
    console.log(address);

    //load the contract 
    const contract = await tronWeb.contract().at(address);


    //submit the data to the blockchain
    contract.Predict(Inputs).send({
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
