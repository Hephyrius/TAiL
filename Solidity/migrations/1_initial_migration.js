var Migrations = artifacts.require("./Migrations.sol");
var nofilter = artifacts.require ("./NoFilter.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(nofilter);
};
