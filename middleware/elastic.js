require("dotenv").config();
const ElasticsearchTransport = require("winston-elasticsearch");

const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: process.env.ELASTIC_URI,
    log: "info",
  },
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

module.exports = esTransport;
