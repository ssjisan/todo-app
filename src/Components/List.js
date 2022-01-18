import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import taskPriority from "./JSON/Priority.json";
import taskStatus from "./JSON/Status.json";
import "./Style/ListStyle.css";
  
export default function List({ tasks, setTasks }) {
  const handleDelete = (handlerID) => {
    const newTaskList = tasks.filter((task) => task.id !== handlerID);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
    setTasks(newTaskList);
  };
  const [allStatus, setAllStatus] = useState([]);
  useEffect(() => {
    setAllStatus(taskStatus);
  }, []);
  const [allPriority, setAllPriority] = useState([]);
  useEffect(() => {
    setAllPriority(taskPriority);
  }, []);
  // const [details, setDetails] = useState("");
  // const [priority, setPriority] = useState("");
  // const [status, setStatus] = useState("");
  // const updateTask = [...tasks, { details, priority, status }];
  const handleStatusUpdate = (e, id, priority, details) => {
    const newID = Date.now();
    let updatedTask = tasks.filter((task) => task.id !== id);
    updatedTask = [
      ...updatedTask,
      { id: newID, details: details, priority: priority, status: e },
    ];
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    setTasks(updatedTask);
  };

  const handlePriorityUpdate = (e, id, status, details) => {
    const newID = Date.now();
    let updatedTask = tasks.filter((task) => task.id !== id);
    updatedTask = [
      ...updatedTask,
      { id: newID, details: details, priority: e, status: status },
    ];
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    setTasks(updatedTask);
  };

  return (
    <div>
      {tasks.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="tableHeader">
                <TableCell style={{ fontWeight: "bold" }}>Task</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Priority</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow  className="tableRow"
                  style={{
                    margin: "10px 0",
                    backgroundColor:
                      task.priority === "Normal"
                        ? "#6C6"
                        : task.priority === "Medium"
                        ? "#EA0"
                        : task.priority === "Urgent"
                        ? "#E21"
                            : ""
                  }}
                >
                  <TableCell><Typography variant="h6" style={{textDecoration: task.status === "Done" ? "line-through" : "none",color:"white"}}>{task.details}</Typography></TableCell>
                  <TableCell>
                    <Select
                      style={{ width: "100%",color:"white" }}
                      size="small"
                      value={task.status}
                      onChange={(e) =>
                        handleStatusUpdate(
                          e.target.value,
                          task.id,
                          task.priority,
                          task.details
                        )
                      }
                    >
                      {allStatus &&
                        allStatus.map((data, index) => (
                          <MenuItem key={index} value={data}>
                            {data}
                          </MenuItem>
                        ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      style={{ width: "100%",color:"white"}}
                      size="small"
                      value={task.priority}
                      onChange={(e) =>
                        handlePriorityUpdate(
                          e.target.value,
                          task.id,
                          task.status,
                          task.details
                        )
                      }
                    >
                      {allPriority &&
                        allPriority.map((data, index) => (
                          <MenuItem key={index} value={data}>
                            {data}
                          </MenuItem>
                        ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon style={{color:"white"}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
