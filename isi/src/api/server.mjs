import express from "express"
import morgan from "morgan"
import cors from "cors"
let server = express();

server.use(morgan("tiny"))
server.use(cors())

import api from "./api.mjs"
server.use(api)

const port = 8000;
server.listen(port, () => {
  console.log(`This server presents a Web API at http://localhost:${port}`);
  console.log("It also serves static files at ./dist.");
  console.log("Before you run this server, 'npm run build' to build the sample web app.");
  console.log(`Next, point your browser to http://localhost:${port}/`);
});
