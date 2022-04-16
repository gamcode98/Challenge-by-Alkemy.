const express = require("express");
const routerApi = require("./routes");
const cors = require("cors");
const { checkApiKey } = require("./middlewares/auth.handler");
require("./utils/auth");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;

// const whiteList = [];
// const options = {
//   origin: (origin, callback) => {
//     if (whiteList.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed"));
//     }
//   },
// };
// app.use(cors(options));
app.use(cors());
app.use(express.json());

app.get("/nueva-ruta", checkApiKey, (req, res) => {
  res.send("Hi, cheee");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server on port: " + port);
});
