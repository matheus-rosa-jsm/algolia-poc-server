// const http = require("http");
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const algoliasearch = require("algoliasearch");
const cors = require("cors");

const hostname = "127.0.0.1";
const port = 3000;

const app = express();
app.set("port", port || config.get("server.port"));

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.route("/api/api-key").post((req, res) => {
  // Connect and authenticate with your Algolia app
  const client = algoliasearch(
    "D210A1E023",
    "caaf666b4b15c8c80b9e816a1d9c5617"
  );
  const { body } = req;

  console.log("req", req);
  console.log("body", body);

  const securityApiKey = client.generateSecuredApiKey(
    "4d436fc5d92ff270d7ddf18bdb1ddc24",
    {
      filters: `visible_by:${body.cnpj}`,
      userToken: body.token,
    }
  );
  res.status(200).json({ apikey: securityApiKey });
});
