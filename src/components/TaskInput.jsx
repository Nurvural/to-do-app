import React, { useState } from "react";

function TaskInput({ addTask, setTaskChangeCount }) {
  const [task, setTask] = useState("");

  function handleInputValue(event) {
    setTask(event.target.value);
  }

  function handleAddTask(event) {
    event.preventDefault();
    if (task.trim() === "") return;
    addTask(task);
    setTask("");
    setTaskChangeCount((prev) => prev + 1);
  }

  return (
    <form className="inputField" onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Add Item"
        value={task}
        onChange={handleInputValue}
      />
      <button>+</button>
    </form>
  );
}

export default TaskInput;
