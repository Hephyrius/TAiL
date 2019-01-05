import Swal from 'sweetalert2'

import {a2hex, hex2a, Time2a, MagnetCheck} from "./parser"

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

export async function SubmitMagnetLink(_TorrentTitle, _TorrentDescription, _MagnetLink, TorrentCategory, TorrentSubCategory1, TorrentSubCategory2) {

    if (MagnetCheck(_MagnetLink)){
        //load the contract 
        const contract = await tronWeb.contract().at(contractAddress);

        //convert the data to an appropriate format for the blockchain to handle
        let hexTorrentTitle = a2hex(_TorrentTitle);
        let hexTorrentDescription = a2hex(_TorrentDescription);
        let hexMagnetLink = a2hex(_MagnetLink);

        //notify the user that the post has been submitted
        Swal({title:'Magnet Link Submitted',
            type: 'info'
        });
        //submit the data to the blockchain
        contract.SubmitTorrent(hexTorrentTitle, hexTorrentDescription, hexMagnetLink, "0x00", "0x00", "0x00").send({
            shouldPollResponse:true,
            callValue:0

        }).then(res => Swal({
            title:'Magnet Link Submitted Successfully',
            type: 'success'

        })).catch(err => Swal(
            {
                title:'Magnet Link Submission Failed',
                type: 'error'
            }
        ));
    } else {
        Swal({title:'Incorrect Magnet Link', type: 'error'});
    }

}

//get data from contract events and convert it into a readable/useable state
export async function getNetworks() {

    //load the contract 
    const events = await tronWeb.getEventResult(contractAddress, 0, "NetworkCreated", 0,  200, 1);

    var Networks = []
    for(var i=0; i<events.length; i++){

        let address = events[i]['result']['owner'];
        address = address.substring(2, address.length);
        address = tronWeb.address.fromHex(address)

        let NetworkAddress = events[i]['result']['Network'];
        NetworkAddress = NetworkAddress.substring(2, NetworkAddress.length);
        NetworkAddress = tronWeb.address.fromHex(NetworkAddress)

        //format data so it can be used and stored better
        var NetworkData = {
            NetworkNumber: events[i]['result']['NetworkNumber'],
            Network: NetworkAddress,
            Owner: address
          }

          Networks = Networks.concat(NetworkData);
    }

    localStorage.setItem("Networks", JSON.stringify(Networks));

    return Networks;
}
