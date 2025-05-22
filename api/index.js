import app from "../src/route";
import serverless from "serverless-http";

export const handler = serverless(app)