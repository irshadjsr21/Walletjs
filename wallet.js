const bjl = require("bitcoinjs-lib");
const bip32 = require("bip32");
const coinselect = require("coinselect");

const config = require("./config");
const blockcypher = require("./blockcypher");

class Wallet {
  constructor(network) {
    this.network = network;
    this.token = "5849c99db61a468db0ab443bab0a9a22";
  }

  address_list(xpub, chain = 0, start = 0, end = 5) {
    const addresses = [];

    for (let i = start; i <= end; i++) {
      const key = bip32.fromBase58(xpub, this.network).derivePath(`${chain}/${i}`).publicKey;

      const res = bjl.payments.p2pkh({
        pubkey: key,
        network: this.network
      });

      addresses.push(res.address);
    }

    return addresses;
  }

  // this function will generate bitcoin testnet addresses using "xpub" for "chain" index = 0 or 1 from range index "start" to "end".

  async add_wallet(name, addresses) {
    return await blockcypher.createWallet(name, addresses);
  }

  // this function will add the "addresses" list on blockcypher database. This list is recognised by the "name" argument.

  async add_addresses(name, addresses) {
    return await blockcypher.addAddresses(name, addresses);
  }

  //this function will add the "addresses" on blockcypher database to an already existing wallet recognised by the "name" argument.

  async fetch_wallet(name) {
    return await blockcypher.getWallet(name);
  }

  //this function will fetch the "addresses" from blockcypher database of an already existing wallet recognised by the "name" argument.

  async fetch_utxo(recieve, change) {
    return await blockcypher.getUTXO(recieve);
  }

  //this function will fetch "UTXOs" using wallet name provided in "receive" and "change" argumnets using blockcypher APIs

  async generate_unsigned_transaction(xpub, output_address, amount) {}

  //this fucntion will generate unsigned txn using "xpub" to send "amount" to "output_address"
}

const WALLET_NAME = "wallet";

async function run() {
  let a = new Wallet(bjl.networks.testnet);

  const addresses = a.address_list(config.XPUB, 0, 0, 2);
  console.log(addresses);

  let wallet = await blockcypher.listWallet();
  console.log(wallet);

  //let wallet = await a.add_wallet(WALLET_NAME, addresses);
  //console.log(wallet);

  //wallet = await a.fetch_wallet(WALLET_NAME);
  //console.log(wallet);

  //wallet = await a.add_addresses(WALLET_NAME, addresses);
  //console.log(wallet);

  //let utxo = await a.fetch_utxo(addresses[0]);
  //console.log(utxo);
}

run();
