import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import List from "./Components/List";

function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  // const [tasks, setTasks] = useState([]);
  return (
    <div style={{ padding: "30px" }}>
      <Card
        style={{
          maxWidth: "1200px",
          margin: "auto",
          boxShadow:
            "0 19px 38px rgba(0,0,0,0.30),0 15px 12px rgba(0,0,0,0.22)",
          padding: "20px",
        }}
      >
        <CardContent>
          <Form setTasks={setTasks} tasks={tasks} />
          <br />
          <br />
          <br />
          <List setTasks={setTasks} tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
