const winston = require("winston");
const Elasticsearch = require("winston-elasticsearch");
const asyncHandler = require("../middleware/asyncHandler");
const chalk = require("chalk");
const stringify = require("json-stringify-safe");
const express = require("express");

const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: "http://localhost:9200",
    log: "info",
  },
};

// exports.logger = async (req, res, next) => {
//   try {
//     const esTransportOpts = {
//       level: "info",
//       clientOpts: {
//         node: "http://localhost:9200",
//         log: "info",
//       },
//     };
//     winston.createLogger({
//       level: "info",
//       format: winston.format.json(),
//       defaultMeta: {
//         hostname: `${req.protocol}`,
//         method: req.method,
//         url: req.originalUrl,
//       },
//       transports: [new Elasticsearch.ElasticsearchTransport(esTransportOpts)],
//     });
//     next();
//   } catch (error) {
//     console.error(chalk.red.inverse(error));
//     process.exit(1);
//   }
// };

exports.hello = async (name) => {
  try {
    console.log(chalk.red.inverse("Nama:" + name));
  } catch (error) {
    console.error(chalk.red.inverse(error));
    process.exit(1);
  }
};
