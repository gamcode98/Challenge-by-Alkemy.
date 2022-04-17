const express = require("express");
const routerApi = require("./routes");
const { config } = require("./config/config");
const cors = require("cors");
require("./utils/auth");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server on port: " + port);
});
