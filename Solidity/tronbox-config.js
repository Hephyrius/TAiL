module.exports = {
  networks: {
    development: {
      privateKey: '1d44df630080992cda5941f05e3bf57b86d44741d2f2c0fd0748309790e8fd45',
      consume_user_resource_percent: 90,
      fee_limit: 1000000000,
      fullHost: "https://api.trongrid.io",
      network_id: "*"
    },
    shasta: {
      privateKey: "e58f9af16a78e73ac173affa33265f81012e4f1898564fd8831c8e9079e2c959",
      consume_user_resource_percent: 30,
      fee_limit: 1000000000,

      // tronbox 2.1.9+
      // fullHost: "https://api.shasta.trongrid.io",

      // tronbox < 2.1.9
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",

      network_id: "2"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 1000
    }
  }
};