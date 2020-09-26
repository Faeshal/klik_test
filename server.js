require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 1000;
const mongoConnection = require("./middleware/mongo");
const client = require("./middleware/elastic");
const MONGO_URI = "mongodb://localhost:27017/klik";
const morgan = require("morgan");
const chalk = require("chalk");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

// * Main & Security
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// * Session & Cookie
const store = new MongoDBStore({
  uri: MONGO_URI,
});

app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    store: store,
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

// client.cluster.health({}, function (err, resp, status) {
//   console.log("-- Client Health --", resp);
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error(chalk.red.bold(err));
    process.exit(1);
  }
  console.log(chalk.greenBright.inverse(`Server Up on Port : ${PORT}`));
});
