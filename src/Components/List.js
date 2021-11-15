import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

export default function List({tasks, setTasks}) {
  const handleDelete = (handlerID) => {
      const newTaskList = tasks.filter(task => task.id !== handlerID)
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
      setTasks(newTaskList);
    };
    
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
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <IconButton edge="end">
                      <DeleteIcon onClick={()=>handleDelete(task.id)} />
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