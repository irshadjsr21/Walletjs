const axios = require("axios");
const config = require("./config");

const BASE_URL = "https://api.blockcypher.com/v1/btc/main/";

const http = axios.create({ baseURL: BASE_URL });

module.exports = {
  createWallet: async (name, addresses) => {
    try {
      const res = await http.post(`wallets?token=${config.NETWORK_TOKEN}`, {
        name,
        addresses
      });

      return res.data;
    } catch (error) {
      console.log(error.toJSON());
      return null;
    }
  },

  getWallet: async name => {
    try {
      const res = await http.get(
        `wallets/${name}?token=${config.NETWORK_TOKEN}`
      );

      return res.data;
    } catch (error) {
      console.log(error.toJSON());
      return null;
    }
  },

  addAddresses: async (name, addresses) => {
    try {
      const res = await http.post(
        `wallets/${name}/addresses?token=${config.NETWORK_TOKEN}`,
        {
          addresses
        }
      );

      return res.data;
    } catch (error) {
      console.log(error.toJSON());
      return null;
    }
  }
};