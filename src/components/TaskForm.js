// TaskForm.js
import React, { useState } from "react";

const TaskForm = ({ handleAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(newTask);
    setNewTask("");
  };

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTask} onChange={handleTaskChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

