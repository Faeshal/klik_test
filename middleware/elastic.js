require("dotenv").config();

const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: process.env.ELASTIC_URI,
    log: "info",
  },
};

module.exports = esTransportOpts;
