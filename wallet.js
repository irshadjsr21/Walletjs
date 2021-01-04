const bjl = require("bitcoinjs-lib");
const bip32 = require("bip32");
const axios = require("axios");
const coinselect = require("coinselect");

const config = require("./config");

class Wallet {
  constructor(network) {
    this.network = network;
    this.token = "5849c99db61a468db0ab443bab0a9a22";
  }

  address_list(xpub, chain = 0, start = 0, end = 5) {
    const addresses = [];

    for (let i = start; i <= end; i++) {
      const key = bip32.fromBase58(xpub).derivePath(`${chain}/${i}`).publicKey;

      const res = bjl.payments.p2pkh({
        pubkey: key
      });

      addresses.push(res.address);
    }

    return addresses;
  }

  // this function will generate bitcoin testnet addresses using "xpub" for "chain" index = 0 or 1 from range index "start" to "end".

  add_wallet(name, addresses) {

  }

  // this function will add the "addresses" list on blockcypher database. This list is recognised by the "name" argument.

  add_addresses(name, addresses) {}

  //this function will add the "addresses" on blockcypher database to an already existing wallet recognised by the "name" argument.

  async fetch_wallet(name) {}

  //this function will fetch the "addresses" from blockcypher database of an already existing wallet recognised by the "name" argument.

  async fetch_utxo(recieve, change) {}

  //this function will fetch "UTXOs" using wallet name provided in "receive" and "change" argumnets using blockcypher APIs

  async generate_unsigned_transaction(xpub, output_address, amount) {}

  //this fucntion will generate unsigned txn using "xpub" to send "amount" to "output_address"
}

let a = new Wallet(bjl.networks.testnet);

console.log(
  a.address_list(
    config.XPUB,
    0,
    0,
    1
  )
);
