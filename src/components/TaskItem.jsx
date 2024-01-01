import React, { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TaskItem({
  task,
  deleteTask,
  toggleCheck,
  startEditing,
  isEditing,
  editTask,
}) {
  const [editedTask, setEditedTask] = useState(task.taskName);

  const handleEditInputChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    editTask(task.taskName, editedTask);
  };

  return (
    <li className="items">
      <div className="items-text">
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              className="edit-input"
              type="text"
              value={editedTask}
              onChange={handleEditInputChange}
              autoFocus
            />
          </form>
        ) : (
          <>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleCheck(task.taskName)}
            />
            <p className={task.checked ? "isChecked" : ""}>{task.taskName}</p>
            <p className={task.checked ? "isChecked" : ""}>{task.date}</p>
          
          </>
        )}
      </div>
      <div className="icon-container">
        <MdDeleteSweep
          className="delete-icon"
          onClick={() => deleteTask(task.taskName)}
        />
        <FaEdit
          className="edit-icon"
          onClick={() => startEditing(task.taskName)}
        />
      </div>
    </li>
  );
}

export default TaskItem;
