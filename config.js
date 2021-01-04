const dotenv = require("dotenv-flow");

dotenv.config();

const getEnvVariable = key => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`ENVIREMENT VARIABLE '${key}' NOT SPECIFIED.`);
  }
  return value;
};

module.exports = {
  XPUB: getEnvVariable("XPUB"),
  NETWORK_TOKEN: getEnvVariable("TOKEN")
};
