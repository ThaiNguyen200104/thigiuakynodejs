import yargs from "yargs";
import chalk from "chalk";
import {
  createTask,
  readAllTask,
  readDetailTask,
  updateTask,
  deleteTask,
  insertAmount,
} from "./models/task";

// CRUD
// Create - npx ts-node app/index.ts create --id="" --name="" --price="" --amount="" --description=""
yargs.command({
  command: "create",
  builder: {
    id: { type: "string" },
    name: { type: "string" },
    price: { type: "number" },
    amount: { type: "number" },
    description: { type: "string" },
  },
  handler: (args) => {
    const { id, name, price, amount, description } = args;
    const newTask = createTask(id, name, price, amount, description);
    console.log(chalk.green("Product is created"), newTask);
  },
});

// Read All - npx ts-node app/index.ts read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(chalk.yellow("Product list: "), result);
  },
});

// Read Detail - npx ts-node app/index.ts read-detail --id=""
yargs.command({
  command: "read-detail",
  builder: { id: { type: "string" } },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log(chalk.blue("Product"), id + chalk.blue(" info: "), task);
    } else {
      console.log(chalk.red("Not found!"));
    }
  },
});

// Update - npx ts-node app/index.ts update --id="" --name="" --price="" --amount="" --description=""
yargs.command({
  command: "update",
  builder: {
    id: { type: "string" },
    name: { type: "string" },
    price: { type: "number" },
    amount: { type: "number" },
    description: { type: "string" },
  },
  handler: (args) => {
    const { id, name, price, amount, description } = args;
    const task = updateTask(id, name, price, amount, description);
    if (task) {
      console.log(
        chalk.green("Product's id:"),
        id + chalk.green(" updated"),
        task
      );
    } else {
      console.log(chalk.red("ID is not exist"));
    }
  },
});

// Delete - npx ts-node app/index.ts delete --id=""
yargs.command({
  command: "delete",
  builder: { id: { type: "string" } },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log(chalk.green("Product's ID:"), id + chalk.green(" deleted"));
    } else {
      console.log(chalk.red("ID is not exist"));
    }
  },
});

// Insert amount - npx ts-node app/index.ts insert-amount --id=""
yargs.command({
  command: "insert-amount",
  builder: {
    id: { type: "string" },
    name: { type: "string" },
    amount: { type: "number" },
  },
  handler: (args) => {
    const { id, name, amount } = args;
    const addTask = insertAmount(id, name, amount);
    if (addTask) {
      console.log(
        chalk.green(addTask.name + "'s amount is added 50:", addTask.amount)
      );
    } else {
      console.log(chalk.red("ID is not exist"));
    }
  },
});

yargs.parse();
