import React, { Component } from 'react';
import {DepositTrx, withdrawTrx, ChangeUsername} from "../utils/tronweb";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        DepositValue: 0,
        WithdrawValue: 0,
        WithdrawAll: false,
        Username: ""
      };

      this.handleDepositChange = this.handleDepositChange.bind(this);
      this.handleDepositSubmit = this.handleDepositSubmit.bind(this);

      this.handleWithdrawChange = this.handleWithdrawChange.bind(this);
      this.handleWithdrawAllChange = this.handleWithdrawAllChange.bind(this);
      this.handleWithdrawSubmit = this.handleWithdrawSubmit.bind(this);

      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleUserSubmit = this.handleUserSubmit.bind(this);

  }

  handleDepositChange(event) {
    this.setState({DepositValue: event.target.value});
  }

  handleDepositSubmit(event) {
    DepositTrx(this.state.DepositValue);
    this.state.DepositValue = 0;
    event.preventDefault();
  }

  handleWithdrawChange(event) {
    this.setState({WithdrawValue: event.target.value});
  }

  handleWithdrawAllChange(event) {
    this.setState({WithdrawAll: event.target.value});
  }

  handleWithdrawSubmit(event) {
    withdrawTrx(this.state.WithdrawAll, this.state.WithdrawValue);
    this.state.WithdrawValue = 0;
    event.preventDefault();
  }

  handleUserChange(event) {
    this.setState({Username: event.target.value});
  }

  handleUserSubmit(event) {
    ChangeUsername(this.state.Username);
    this.state.Username = " ";
    event.preventDefault();
  }

  render() {
    let userData = JSON.parse(localStorage.getItem("User"))

    return (
    <div className="Account">
        <div class="container">

            <h2>Account Settings and Information</h2>

            <div className="Information">
                <h3>Current User Information</h3>
                <p></p>
                    <strong>Username: </strong> {userData['UserName']}
                <p></p>
                    <strong>Balance: </strong> {Number(userData['SunBalance'])/1000000} Trx
                <p></p>
                    <strong>Address: </strong> {userData['TronAddress']}
                <p></p>
                    <strong>Hex Address: </strong> {userData['HexAddress']}
                <p></p>

            </div>

            <div className="Usename">
                <h3>Update Username</h3>

                <form onSubmit={this.handleUserSubmit}>
                
                    <label> Username</label>

                    <div>
                        <input type="Text" maxLength={12} value={this.state.Username} onChange={this.handleUserChange} />
                    </div>

                    <p></p>
                        <input type="submit" class="btn btn-outline-dark btn-sm" value="Change" />
                    <p></p>

                </form>
            </div>

            <div className="Deposit">
                <h3>Deposit Trx</h3>

                <form onSubmit={this.handleDepositSubmit}>
                    <label> Deposit Value </label>

                    <div>
                        <input type="number" value={this.state.DepositValue} onChange={this.handleDepositChange} />
                    </div>

                    <p></p>
                        <input type="submit" class="btn btn-outline-dark btn-sm" value="Deposit" />
                    <p></p>
                </form>

            </div>

            <div className="Withdraw">
                <h3>Withdraw Trx</h3>

                <form onSubmit={this.handleWithdrawSubmit}>
                    <label> Withdrawal Amount: </label>
                    <div>
                        <input type="number" value={this.state.WithdrawValue} onChange={this.handleWithdrawChange} />
                    </div>
                    <p></p>
                    
                    <div>
                        <label> Withdrawal Entire Balance : </label><input type="checkbox" value={this.state.WithdrawAll} onChange={this.handleWithdrawAllChange} />
                    </div>
                    <p></p>

                     <input type="submit" class="btn btn-outline-dark btn-sm" value="Withdraw" />
                    <p></p>
                </form>

            </div>

        </div>
      </div>
    );
  }
}

  export default Account;
