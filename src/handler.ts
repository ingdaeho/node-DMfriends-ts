import awsServerlessExpress from "aws-serverless-express";
import { APIGatewayProxyHandler } from "aws-lambda";
import app from "./app";

const server = awsServerlessExpress.createServer(app);

export const lambda_handler: APIGatewayProxyHandler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return awsServerlessExpress.proxy(server, event, context);
};
