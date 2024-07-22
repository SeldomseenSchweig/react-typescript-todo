import React, { useEffect, useState } from "react";
import "./todoList.css";
import axios from "axios";

const TodoList = (): any => {
  const [todoList, setTodoList] = useState<
    { id: number; priority: string; task: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<string>("");
  const [id, setId] = useState(0);
  const [quotes, setQuotes] = useState<any>([]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handlePriorityChange = (event: any) => {
    setPriority(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getData();
    if (inputValue.trim() !== "" && priority.trim() !== "") {
      const todo = { id, priority, task: inputValue.trim() };
      setId(id + 1);
      setTodoList([...todoList, todo]);
      setInputValue(""); // Clear the input field
      setPriority(""); // Clear the priority field
    }
  };

  const handleTodoPriorityChange = (id: number, newPriority: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const del = (id: number) => {
    const shouldRemove = window.confirm("Are you sure you want to delete?");
    if (shouldRemove) {
      const newList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newList);
    } else {
      alert("Not Deleted!");
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="todo-list-container">
      <h1> {quotes}</h1>
      <div className="adder">
        <h2>Add Tasks here</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="task"> Task: </label>
          <input
            type="text"
            name="task"
            id="task"
            value={inputValue}
            onChange={handleInputChange}
          />
          <select
            className="priority-dropdown"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="" disabled>
              Priority
            </option>
            <option className="high" value="High">
              High
            </option>
            <option className="medium" value="Medium">
              Medium
            </option>
            <option className="low" value="Low">
              Low
            </option>
          </select>
          <button className="add-button" type="submit">
            Add
          </button>
        </form>
      </div>
      <div className="todos">
        <h2>Todos</h2>
        <ul className="todo-list">
          {todoList.map((todo) => (
            <div
              className={`task-container task ${todo.priority.toLowerCase()}`}
              key={todo.id}
              id={`${todo.id}`}
            >
              <li>
                <select
                  className="priority-dropdown"
                  value={todo.priority}
                  onChange={(e) =>
                    handleTodoPriorityChange(todo.id, e.target.value)
                  }
                >
                  <option className="high" value="High">
                    High
                  </option>
                  <option className="medium" value="Medium">
                    Medium
                  </option>
                  <option className="low" value="Low">
                    Low
                  </option>
                </select>
              </li>
              <li>{todo.task}</li>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  del(todo.id);
                }}
              >
                Complete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
