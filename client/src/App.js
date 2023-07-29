import { useEffect, useState } from 'react'

// server comunication
import axios from 'axios';
// Style 
import './App.css'
// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'

function App() {
    const [tasks, setTasks] = useState(() => {
        getTodos();
    });
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Get the list of todos from an API and render them in the component.
  
    /*********************
     * Interface Display *
     *********************/
    const addTask = (task) => {
        createTodo(task.name)
        
    }
    const deleteTask = (task) => {
        deleteTodo(task)
    }
    const toggleTask = (task) => {
        modifyStatusTodo(task);
    }
    const updateTask = (task) => {
        editTodo(task)
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
    /*********************
     * Server Connection *
     *********************/

    //The getTodos function retrieves the list of tasks from the server and updates the state of the application
    async function getTodos() {
        const response = await axios.get("http://localhost:5000/todos");
        setTasks(response.data);
    }
    //The createTodo function creates a new task on the server and updates the state of the application
    async function createTodo(todo) {
        const response = await axios.post("http://localhost:5000/todos", {
            name: todo,
        });
        getTodos();
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
        const response = await axios.put(`http://localhost:5000/todos/${todo.id}`, {
            id: todo.id,
            name: todo.name,
            status: !todo.status,
        });
        getTodos();
    }
    //The editTodo function updates the name of the selected task on the server and updates the state of the application
    async function editTodo(task) {
        const response = await axios.put(`http://localhost:5000/todos/${task.id}`, {
            id: task.id,
            status: task.status,
            name: task.name,
        });
       getTodos();
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