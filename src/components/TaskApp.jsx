import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";

function TaskApp() {
  const [toDoList, setToDoList] = useState([]);
  const [taskChangeCount, setTaskChangeCount] = useState(0);
  const [editingTask, setEditingTask] = useState();

  useEffect(() => {
    if (taskChangeCount > 0) {
      localStorage.setItem("tasks", JSON.stringify(toDoList));
    }
  }, [taskChangeCount]);

  useEffect(() => {
    const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
    setToDoList(localStorageTasks ?? []);
  }, []);

  const addTask = (taskName) => {
    const newTask = {
      taskName,
      checked: false,
      date: new Date().toLocaleString(),
    };
    setToDoList([...toDoList, newTask]);
    setTaskChangeCount((prev) => prev + 1);
  };

  function deleteTask(deleteTaskName) {
    setToDoList(toDoList.filter((task) => task.taskName !== deleteTaskName));
    setTaskChangeCount((prev) => prev + 1);
  }

  function toggleCheck(taskName) {
    setToDoList((prevToDolist) =>
      prevToDolist.map((task) =>
        task.taskName === taskName ? { ...task, checked: !task.checked } : task
      )
    );
    setTaskChangeCount((prev) => prev + 1);
  }

  const startEditing = (taskName) => {
    setEditingTask(taskName);
  };

  const editTask = (oldTaskName, newTaskName) => {
    setToDoList((prevToDolist) =>
      prevToDolist.map((task) =>
        task.taskName === oldTaskName
          ? { ...task, taskName: newTaskName }
          : task
      )
    );
    setEditingTask(null);
    setTaskChangeCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="container">
        <h1>To Do App</h1>
        <TaskInput addTask={addTask} setTaskChangeCount={setTaskChangeCount} />
        <div className="toDoList">
          <span>To Do</span>
          <ul className="list-items">
            {toDoList.map((item, index) => (
              <TaskItem
                task={item}
                key={index}
                deleteTask={deleteTask}
                toggleCheck={toggleCheck}
                startEditing={startEditing}
                editTask={editTask} // Fonksiyonu TaskItem bileşenine iletiyoruz
                isEditing={editingTask === item.taskName} // Düzenleme modunda mı kontrolü
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TaskApp;
