import React, { Component } from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="About">
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit}>
            <h3>About !Filter</h3>
                <div>
                <p align="justify">
                NoFilter is a dApp media platform. The platform allows users to share content with other users, akin to platforms such as medium or reddit. 
                It leverages the TronVM event system as a means of storing content in an immutable fashion. The platform allows users to reward the content 
                they like with donations (in trx) and gilding (with the native platform token). The dApp also makes use of Tron SmartContracts to keep 
                track of statistics such as Votes and Donations. The fee model of the dApp is that, a small portion of gildings and donations are psythoned 
                off into a development fund which can support future upgrades and maintenence of the dApp.
                </p>

                <p align="justify">
                The dApp comes in two flavours, Online and Web3. 
                </p>

                <p align="justify">
                The Web3 version is the unadulterated version of the dApp. This version is a desktop (electon) app that allows the user to tap directly 
                into a TVM fullhost/api of their choice. The Web3 flavour uses the events system and smart contract as a database, whilst also saving 
                content to the local machine, when needed/required. Due to the fact that there is no intermediatary, this flavour is entirely uncensored.
                </p>

                <p align="justify">
                The online version of the dapp uses TronLink & trongrid apis in order to interact with the smart contract. As well as a server and DB that 
                stores the events and smart contract data so that it can be accessed easily, without overwhelming the trongrid api platform. This version 
                of the dApp may lead to censorship due to the database/server that is between the dApp and Blockchain.
                </p>

                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default About;
