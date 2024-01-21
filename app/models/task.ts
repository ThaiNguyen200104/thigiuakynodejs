import fs from "fs";

export const createTask = (
  id: string,
  name: string,
  price: number,
  amount: number,
  description: string
) => {
  const newTask = { id, name, price, amount, description };
  let taskList = readAllTask();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

export const readAllTask = () => {
  const buffer = fs.readFileSync("task.json");
  const taskString = buffer.toString();
  const taskJson = JSON.parse(taskString);
  return taskJson;
};

export const readDetailTask = (id: string) => {
  let taskList = readAllTask();
  const task = taskList.find((task: { id: string }) => task.id === id);
  return task;
};

export const updateTask = (
  id: string,
  name: string,
  price: number,
  amount: number,
  description: string
) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task: { id: string }) => task.id === id);
  if (index !== -1) {
    const oldTask = taskList[index];
    const newTask = { ...oldTask, name, price, amount, description };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};

export const deleteTask = (id: string) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task: { id: string }) => task.id === id);
  if (index !== -1) {
    const task = taskList[index];
    taskList = taskList.filter((task: { id: string }) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

export const insertAmount = (id: string, name: string, amount: number) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task: { id: string }) => task.id === id);
  if (index !== -1) {
    const oldTask = taskList[index];
    const newAmount = oldTask.amount + 50; //Number(oldTask.amount)
    const newTask = { ...oldTask, amount: newAmount };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};
