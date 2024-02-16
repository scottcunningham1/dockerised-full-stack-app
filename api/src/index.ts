import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DataTypes, Sequelize } from "sequelize";
import cors from "cors";

const sequelize = new Sequelize("postgres", "sammy", "your_password", {
  host: "database",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

try {
  sequelize.authenticate();
  console.log("Database connection has been established.");
} catch (error) {
  console.error("Unable to connect to database: ", error);
}

const Person = sequelize.define("Person", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/users/:name/:age", async (req, res: Response) => {
  try {
    const newPerson = await Person.create({
      name: req.params.name,
      age: +req.params.age,
    });

    res.send(newPerson);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/users", async (_, res: Response) => {
  try {
    const people = await Person.findAll();

    console.log(people);

    res.send(people);
  } catch (err) {
    console.error(err);
    res.send("Problem finding people" + err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
