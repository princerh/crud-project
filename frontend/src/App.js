import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col, Card } from "react-bootstrap";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", salary: "" });
  const [editingId, setEditingId] = useState(null);

  // 🚨 Unused state (code smell)
  const [debugMode] = useState(false);

  // Load employees
  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => {
        setEmployees(data);

        // 🚨 Unnecessary console log
        console.log("Employees loaded:", data);
      });

    // 🚨 Nested if (complexity smell)
    if (employees && employees.length > 0) {
      if (employees.length > 2) {
        console.log("More than 2 employees found");
      }
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new employee
  const addEmployee = () => {
    fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(newEmp => {
        setEmployees([...employees, newEmp]);
        setForm({ name: "", position: "", salary: "" });

        // 🚨 Extra console log
        console.log("New employee added successfully!");
      });
  };

  // Update employee
  const updateEmployee = (id) => {
    fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(updated => {
        setEmployees(employees.map(emp => (emp.id === id ? updated : emp)));
        setEditingId(null);
        setForm({ name: "", position: "", salary: "" });
      });
  };

  // Delete employee
  const deleteEmployee = (id) => {
    fetch(`/api/employees/${id}`, { method: "DELETE" })
      .then(() => setEmployees(employees.filter(emp => emp.id !== id)));
  };

  // Start editing
  const startEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ name: emp.name, position: emp.position, salary: emp.salary });
  };

  // 🚨 Duplicate function for salary formatting
  function formatSalary(sal) {
    return "$" + sal;
  }
  function formatSalaryAgain(sal) { // Duplicate code smell
    return "$" + sal;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">👥 Employee Management</h1>

      {/* Form Section */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>{editingId ? "Edit Employee" : "Add Employee"}</h4>
        <Row>
          <Col>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="mb-2"
            />
          </Col>
          <Col>
            <Form.Control
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Position"
              className="mb-2"
            />
          </Col>
          <Col>
            <Form.Control
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="mb-2"
            />
          </Col>
          <Col xs="auto">
            {editingId ? (
              <Button variant="warning" onClick={() => updateEmployee(editingId)}>Update</Button>
            ) : (
              <Button variant="success" onClick={addEmployee}>Add</Button>
            )}
          </Col>
        </Row>
      </Card>

      {/* Employees Table */}
      <Card className="shadow-sm">
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  {/* Using duplicate formatter */}
                  <td>{formatSalary(emp.salary)}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => startEdit(emp)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      ❌ Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No employees found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default App;
