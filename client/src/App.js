import { useState } from 'react'

// server comunication
import axios from 'axios';
// Style 
import './App.css'
// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'

function App() {
    const [tasks, setTasks] = useState([]);
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const addTask = (task) => {
        setTasks(prevState => [...prevState, task])
    }

    const deleteTask = (id) => {
        setTasks(prevState => prevState.filter(t => t.id !== id));
    }

    const toggleTask = (id) => {
        setTasks(prevState => prevState.map(t => (
            t.id === id
                ? { ...t, checked: !t.checked }
                : t
        )))
    }

    const updateTask = (task) => {
        setTasks(prevState => prevState.map(t => (
            t.id === task.id
                ? { ...t, name: task.name }
                : t
        )))
        closeEditMode();
    }

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocusEl.focus();
    }

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true);
        setPreviousFocusEl(document.activeElement);
    }

    return (
        <div className="container">
            <header>
                <h1>My Task List</h1>
            </header>
            {
                isEditing && (
                    <EditForm
                        editedTask={editedTask}
                        updateTask={updateTask}
                        closeEditMode={closeEditMode}
                    />
                )
            }
            <CustomForm addTask={addTask} />
            {tasks && (
                <TaskList
                    tasks={tasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    enterEditMode={enterEditMode}
                />
            )}
        </div>
    )
}

export default App


/*
// old code

    //The getTodos function retrieves the list of tasks from the server and updates the state of the application
    async function getTodos() {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data);
        console.log(response.data);
    }
    //The editTodo function updates the name of the selected task on the server and updates the state of the application
    async function editTodo() {
        const response = await axios.put("http://localhost:5000/todos", {
            id: selectedTodo.id,
            name: inputValue,
        });
        setSelectedTodo();
        setInputVisility(false);
        getTodos();
        setInputValue("");
    }
    //The deleteTodo function deletes a task from the server and updates the state of the application
    async function deleteTodo(todo) {
        const response = await axios.delete(
            `http://localhost:5000/todos/${todo.id}`
        );
        getTodos();
    }
    //The modifyStatusTodo function updates the status of a task on the server and updates the state of the application.
    async function modifyStatusTodo(todo) {
        const response = await axios.put("http://localhost:5000/todos", {
            id: todo.id,
            status: !todo.status,
        });
        getTodos();
    }
    //The createTodo function creates a new task on the server and updates the state of the application
    async function createTodo() {
        const response = await axios.post("http://localhost:5000/todos", {
            name: inputValue,
        });
        getTodos();
        setInputVisility(!inputVisbility);
        setInputValue("");
    }
*/