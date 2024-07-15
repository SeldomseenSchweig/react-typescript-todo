import React, { useState } from "react";
import "./todoList.css";

const TodoList = (): any => {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<string>("");
  const [priorityChange, setNewPriority] = useState("");

  const handleNewPriority = (event: any, id: any) => {
    setNewPriority(event.target.value);
    // document.getElementById(`${id}`)?.classList.remove()
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handlePriorityChange = (event: any) => {
    console.log("priortiy change", priority);
    setPriority(event.target.value);
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== "" && priority.trim() !== "") {
      setTodoList([...todoList, `${priority}: ${inputValue}`]); // setting todolist
      setInputValue(""); // Clear the input field
      setPriority(""); // Clear the priority field
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
            {todoList.map((todo) => {
              return (
                id++,
                (
                  <div
                    className={`task-container task ${todo
                      .split(":")[0]
                      .toLowerCase()}`}
                    key={id - 1}
                    id={`${id - 1}`}
                  >
                    <li>{todo.split(":")[0]}</li>
                    <li>{todo.split(":")[1]} </li>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.preventDefault();
                        del(Number(id - 1));
                      }}
                    >
                      Complete
                    </button>
                  </div>
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

{
  /* <form onSubmit={(e) => handleFormSubmit(e)}>
  <label htmlFor="task"> Task: </label>

  <select
    className="priority-dropdown"
    value={NewPriority}
    onChange={handleNewPriority}
  >
    <option value="" disabled>
    {todo.split(":")[0]}
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
</form>; */
}
