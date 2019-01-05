import React, { Component } from 'react';
import NetworkItem from "./NetworkItem";
import DummyItem from "./DummyItem";
class Networks extends Component {

  render() {
    let NetworkItems;
    let Networks = JSON.parse(localStorage.getItem("Networks"))
    
    
    if(Networks && Networks.length >0) {
      NetworkItems = Networks.map(Network => {
            return (
                <NetworkItem key={Network.NetworkNumber} Network={Network}/>
            )
        } );

    } else {
      NetworkItems = <DummyItem />
    }
    
    return (
      <div className="Networks">
        <div class="container">
            <div class="row">
              {NetworkItems}
            </div>
          </div>
        </div>
    );
  }
}

export default Networks;
