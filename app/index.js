const yargs = require("yargs"); // es5 (common js: chuẩn chung của js)
const fs = require("fs"); // fs = file system (built in NodeJS)
const chalk = require("chalk"); // Tạo màu cho thông báo
const {
  createTask,
  readAllTask,
  readDetailTask,
  updateTask,
  deleteTask,
  insertAmount,
} = require("./model/task.js");

// Tạo lệnh test - node app/index.js test
yargs.command({
  command: "test",
  handler: () => {
    console.log("Test completed");
  },
});

// CRUD
// Create - node app/index.js create --id="" --name="" --price="" --amount="" --description="" | ID must be p<number>
yargs.command({
  command: "create",
  builder: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, name, price, amount, description } = args;
    const newTask = createTask(id, name, price, amount, description);
    console.log(chalk.green("Product is created"), newTask);
  },
});

// Read All - node app/index.js read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(chalk.yellow("Product list: "), result);
  },
});

// Read Detail - node app/index.js read-detail --id=""
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log(chalk.blue("Product's id"), id + chalk.blue(" info: "), task);
    } else {
      console.log(chalk.red("Not found!"));
    }
  },
});

// Update - node app/index.js update --id="" --name="" --price="" --amount="" --description=""
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, name, price, amount, description } = args;
    const task = updateTask(id, name, price, amount, description);
    if (task) {
      console.log(
        chalk.green("Product's id"),
        id + chalk.green(" updated"),
        task
      );
    } else {
      console.log(chalk.red("ID is not exist"));
    }
  },
});

// Delete - node app/index.js delete --id=""
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log(chalk.green("Product's ID"), id + chalk.green(" deleted"));
    } else {
      console.log(chalk.red("ID is not exist"));
    }
  },
});

// Insert amount - node app/index.js insert-amount --id=""
yargs.command({
  command: "insert-amount",
  builder: {
    id: {
      type: "string",
    },
    amount: {
      type: "number",
    },
  },
  handler: (args) => {
    const { id, amount } = args;
    const addTask = insertAmount(id, amount);
    if (addTask) {
      console.log(chalk.green("Amount added sucessful"));
      console.log(
        chalk.yellow("The amount of product's id"),
        id + chalk.yellow(" is now:"),
        addTask.amount
      );
    } else {
      console.log(chalk.red("ID is not exist"));
    }
  },
});

// Lưu lại các lệnh vừa tạo
yargs.parse();
