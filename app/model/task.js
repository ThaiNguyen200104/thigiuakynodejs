const fs = require("fs");

const createTask = (id, name, price, amount, description) => {
  const parsedPrice = Number(price);
  const parsedAmount = Number(amount);
  const newTask = {
    id,
    name,
    price: parsedPrice,
    amount: parsedAmount,
    description,
  };
  let taskList = readAllTask(); // Sử dụng kiểu dữ liệu let để có thể sửa được
  // taskList.push(newTask); // Không nên xài cách này vì có thể gây tham chiếu
  taskList = [...taskList, newTask]; // Cách này giúp không gây tham chiếu
  /* Viết file đồng bộ, sẽ được chia ra 2 trường hợp
    1. Sau khi viết xong thì chạy những tác vụ khác
    2. Chưa viết xong thì để đó */
  fs.writeFileSync("task.json", JSON.stringify(taskList)); // fs.writeFileSync("<tên file>.json", JSON.stringify(<dữ liệu cần lưu>));
  // Khi lưu vào local storage thì dùng JSON.stringify() - giúp bảo mật hơn
  return newTask;
};

const readAllTask = () => {
  const buffer = fs.readFileSync("task.json"); // buffer hoặc gọi là mã HEX
  // Chuyển sang chuỗi (taskString không phải là một mảng (không thể lấy ra object 1))
  const taskString = buffer.toString();
  // Chuyển sang JSON (giúp taskString lấy ra được object => Là một mảng)
  const taskJson = JSON.parse(taskString);
  return taskJson;
};

const readDetailTask = (id) => {
  let taskList = readAllTask();
  const task = taskList.find((task) => task.id === id);
  return task;
};

const updateTask = (id, name, price, amount, description) => {
  let taskList = readAllTask(); // Lấy ID
  const index = taskList.findIndex((task) => task.id === id); // Tìm vị trí
  if (index !== -1) {
    // index !== -1 là tìm thấy
    // Nếu thấy thì trả về -1, thực hiện update. Nếu không thấy thì trả về 1 => NOT FOUND
    const oldTask = taskList[index]; // Lấy dữ liệu task cũ
    const newTask = { ...oldTask, name, price, amount, description }; // Cập nhật dữ liệu: copy oldTask, sau đó ghi đè thuộc tính mới lên oldTask
    taskList[index] = newTask; // Cập nhật lại vị trí của newTask
    fs.writeFileSync("task.json", JSON.stringify(taskList)); // Lưu lại mảng vào file .json
    return newTask;
  } else {
    // Không tìm thấy thì thông báo cho user
    return false;
  }
};

const deleteTask = (id) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task = taskList[index];
    taskList = taskList.filter((task) => task.id !== id); // filter() sẽ lọc id nếu khác thì sẽ giữ, giống sẽ xóa
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

const insertAmount = (id, amount) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const oldTask = taskList[index];
    const newAmount = Number(oldTask.amount) + 50;
    const newTask = { ...oldTask, amount: newAmount };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};

module.exports = {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
  insertAmount,
};
