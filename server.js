require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 1000;
const mongoConnection = require("./middleware/mongo");
const morgan = require("morgan");
const chalk = require("chalk");
const helmet = require("helmet");
const cors = require("cors");
const winston = require("winston");
const expressWinston = require("express-winston");
const winstonElasticSearch = require("winston-elasticsearch");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const esTransportOpts = require("./middleware/elastic");

// * Main & Security
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// * Session & Cookie
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
});

app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);

// * Logger
app.use(
  expressWinston.logger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winstonElasticSearch.ElasticsearchTransport(esTransportOpts),
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} - {{res.responseTime}}ms",
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

// * Routing
app.use(authRoutes);
app.use(paymentRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// * Database & Server Listen
mongoConnection();

app.listen(PORT, (err) => {
  if (err) {
    console.error(chalk.red.bold(err));
    process.exit(1);
  }
  console.log(chalk.greenBright.inverse(`Server Up on Port : ${PORT}`));
});
