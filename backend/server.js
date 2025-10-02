const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy employees (preloaded)
let employees = [
  { id: 1, name: "Alice Johnson", position: "Software Engineer", salary: 70000 },
  { id: 2, name: "Bob Smith", position: "Project Manager", salary: 90000 },
  { id: 3, name: "Charlie Lee", position: "UI/UX Designer", salary: 60000 }
];
let id = 4; // next id

// Root route
app.get("/", (req, res) => {
  res.send("✅ Employee API is running. Use /api/employees to access data.");
});

// CREATE Employee
app.post("/api/employees", (req, res) => {
  const { name, position, salary } = req.body;
  const newEmployee = { id: id++, name, position, salary };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// READ All Employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// READ One Employee
app.get("/api/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const employee = employees.find(e => e.id === empId);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
});

// UPDATE Employee
app.put("/api/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const employee = employees.find(e => e.id === empId);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  const { name, position, salary } = req.body;
  employee.name = name || employee.name;
  employee.position = position || employee.position;
  employee.salary = salary || employee.salary;

  res.json(employee);
});

// DELETE Employee
app.delete("/api/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  employees = employees.filter(e => e.id !== empId);
  res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Employee API running at http://localhost:${PORT}`));
