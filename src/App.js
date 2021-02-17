//import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect  } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp,todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()
    const inputPlace = "Type a new todo";

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }
    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        console.log(name)
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
    }

    function handleClearTodos(e) {
       const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
        <>
            <header>
                <h1>My Todo App</h1>
            </header>
            <form>
                <p>
                    <input ref={todoNameRef} type="text" placeholder={inputPlace}/>
                </p>
                <p>
                    <button onClick={handleAddTodo}>Add Todo</button>
                </p>
                <p>
                    <button onClick={handleClearTodos}>Clear Completed</button>
                </p>
                <p>{todos.filter(todo => !todo.complete).length} left to do
                </p>
            </form>
             <br/>
            <section>
                <h2>Todos</h2>
                <div>
                    <TodoList todos={todos} toggleTodo={toggleTodo}/>
                </div>
            </section>
        </>
    )
}

export default App;