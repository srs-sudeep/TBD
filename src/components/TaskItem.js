// TaskItem.js
import React from "react";

const TaskItem = ({ task }) => {
  return <li>{task.text}</li>;
};

export default TaskItem;
