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
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const esTransport = require("./middleware/elastic");

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
    transports: [esTransport],
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
app.get("/", (req, res, next) => {
  res.json({ success: true });
});

// * Server Listen & Database
mongoConnection();

app.listen(PORT, (err) => {
  if (err) {
    console.error(chalk.red.bold(err));
    process.exit(1);
  }
  console.log(chalk.greenBright.inverse(`Server Up on Port : ${PORT}`));
});
