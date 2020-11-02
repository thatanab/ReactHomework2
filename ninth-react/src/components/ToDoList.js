import React, { Component } from 'react';
import TodoItem from './ToDoItem';

export default class TodoList extends Component {
  state = {
    inputValue: "",
    todoList: [
      {
        id: 1,
        task: "Do Homework"
      },
      {
        id: 2,
        task: "Swimming"
      },
      {
        id: 3,
        task: "Shopping"
      }
    ]
  };

  createNewTask = () => {
    const newTask = this.state.inputValue;
    if (newTask === "") return;
    const newTodoList = [...this.state.todoList];
    newTodoList.push({ task: newTask, id: Math.round(Math.random() * 1000) });
    this.setState({ todoList: newTodoList });
    this.setState({ inputValue: "" });
  };

  // deleteTask = (id) => {
  //   const newTodoList = [...this.state.todoList];
  //   const targetTodoIdx = newTodoList
  //   .findIndex(e => e.id === id);
  //   newTodoList.splice(targetTodoIdx, 1);
  //   this.setState({ todoList: newTodoList });
  // };

  deleteTask = (id) => {
    const newTodoList = this.state.todoList
      .filter(e => e.id !== id);
    this.setState({ todoList: newTodoList });
  };

  editTask = (targetId, newTask) => {
    const newTodoList = [...this.state.todoList];
    const targetIdx = newTodoList.findIndex(e => e.id === targetId);
    newTodoList[targetIdx].task = newTask;
    this.setState({ todoList: newTodoList });
  };

  render() {
    const { todoList, inputValue } = this.state;

    return (
      <div >
        <div>
          <input
            value={inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })} />
          <button onClick={this.createNewTask}>Add todo</button>
        </div>
        <div>
          <ul style={{ width: "400px", margin: "0 auto" }}>
            {todoList.map(todo => (
              <TodoItem todo={todo} editFn={this.editTask} deleteTask={this.deleteTask} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}