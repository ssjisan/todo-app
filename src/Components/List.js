import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import taskPriority from "./JSON/Priority.json";
import taskStatus from "./JSON/Status.json";

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
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div>
      {tasks.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Task</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Priority</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  style={{
                    backgroundColor:
                      task.priority === "Normal"
                        ? "#A3C8AE"
                        : task.priority === "Medium"
                        ? "#FFFAA0"
                        : task.priority === "Urgent"
                        ? "#F54040"
                        : "",
                  }}
                >
                  <TableCell>{task.details}</TableCell>
                  <TableCell>
                    <Select
                      style={{ width: "100%" }}
                      size="small"
                      onChange={(e) => setStatus(e.target.value)}
                      defaultValue={task.status}
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
                      style={{ width: "100%" }}
                      size="small"
                      onChange={(e) => setPriority(e.target.value)}
                      defaultValue={task.priority}
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
                    <IconButton edge="end">
                      <DeleteIcon onClick={() => handleDelete(task.id)} />
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
