import React, { useState, useEffect } from 'react';
import Form from './components/form'
import TodoList from './components/todoList'

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const getLocalTodos = () => {
      if(localStorage.getItem('todos') ===null) {
        localStorage.setItem('todos', JSON.stringify([]));
      }else{
         let todoLocal = JSON.parse(localStorage.getItem('todos'));
         setTodos(todoLocal)
      }
    };
    getLocalTodos();
  }, []);


  useEffect(() => {
    const filterHandler = () => {
      switch(status){
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true))
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false))
          break;
        default:
          setFilteredTodos(todos)
          break;
      }
    }
    filterHandler();
    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className='App'>
      <header>
        <h1>To-Do List</h1>
      </header>

    <Form 
      setInputText={setInputText}
      inputText={inputText}
      todos={todos}
      setTodos={setTodos}
      setStatus={setStatus}
    />

    <TodoList 
      todos={todos}
      setTodos={setTodos}
      filteredTodos={filteredTodos}
    />
    </div>
  );
}

export default App;