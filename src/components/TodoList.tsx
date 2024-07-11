import React, { useState } from "react";

import "./todoList.css";

const TodoList = (): any => {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setTodoList([...todoList, inputValue]); // setting todolist
      setInputValue(""); // Clear the input field
    } else {
      return;
    }
  };
  const del = (index: number) => {
    const shouldRemove = window.confirm("are you sure you want to delete?");
    if (shouldRemove) {
      const newList = todoList.filter((_, i) => i !== index);
      setTodoList(newList);
    } else {
      alert("Not Deleted!");
    }
  };
  let id = 0;

  return (
    <>
      <div className="todoList-container">
        <div className="adder">
          <h2>Add Tasks here</h2>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <label htmlFor="task"> Task: </label>
            <input
              type="text"
              name="task"
              id="task"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="addBut" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="todos">
          <h2>Todos</h2>
          <ul className="todoList">
            {todoList.map((todo) => {
              return (
                id++,
                (
                  <li key={id - 1} id={`${id - 1}`}>
                    {todo}{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        del(Number(id - 1));
                      }}
                    >
                      {" "}
                      delete {id - 1}
                    </button>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
