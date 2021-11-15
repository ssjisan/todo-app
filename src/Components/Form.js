import {
  Button, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import taskPriority from "./JSON/Priority.json";
import taskStatus from "./JSON/Status.json";



export default function Form({ setTasks,tasks}) {
  const [allStatus, setAllStatus] = useState([]);
  useEffect(() => {
   setAllStatus(taskStatus)
  }, [])
  const [allPriority, setAllPriority] = useState([]);
  useEffect(() => {
    setAllPriority(taskPriority)
  }, [])
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  
  const handleAdd = () => {
    const id = Date.now();
    const allTask = [...tasks,{ id, details, status, priority}];
    localStorage.setItem("tasks", JSON.stringify(allTask));
    setTasks(allTask);
  }
  console.log(tasks);
  return (
    <div style={{textAlign: 'center'}}>
      <Typography variant="h6" style={{ padding: "20px" }}>
        What's to do today??
      </Typography>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={12} md={4}>
          <InputLabel>Task</InputLabel>
          <TextField label="task" style={{ width: "100%" }} size="small" onChange={(e) =>setDetails(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <InputLabel>Status</InputLabel>
          <Select style={{ width: "100%" }} size="small" onChange={(e) => setStatus(e.target.value)} defaultValue=" ">
            {allStatus && allStatus.map((data, index)=> <MenuItem key={index} value={data}>{data}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <InputLabel>Priority</InputLabel>
          <Select style={{ width: "100%" }}size="small" onChange={(e)=>setPriority(e.target.value)} defaultValue=" ">
            {allPriority && allPriority.map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)}
            
          </Select>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="outlined" onClick={handleAdd}> Add </Button>
        </Grid>
      </Grid>
    </div>
  );
}