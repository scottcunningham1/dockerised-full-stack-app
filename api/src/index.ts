import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/users", (_, res: Response) => {
  res.send([
    {
      firstname: "Scott",
      age: 30,
    },
    {
      firstname: "John",
      age: 60,
    },
  ]);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});