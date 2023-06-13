import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import { getAllJobs } from "./controllers/jobs-controller.js";
dotenv.config();

connect();

const app = express();

app.use(cors());

app.use(express.json());

const fileContents = fs.readFileSync("./src/swagger.yaml", "utf8");

const swaggerDocument = yaml.load(fileContents);

const options = {
  customSiteTitle: "DevJobs - Swagger API",
};


app.use("/images", express.static("public/logos"));

app.get("/jobs/:size/:page", getAllJobs);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(3000);

export default app;