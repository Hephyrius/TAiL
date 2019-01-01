var Migrations = artifacts.require("./Migrations.sol");
var TronAiNeuralNetwork = artifacts.require ("./TronAiNeuralNetwork.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TronAiNeuralNetwork);
};
