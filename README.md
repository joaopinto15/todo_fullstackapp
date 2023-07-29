# todo_fullstackapp

### Description

  
>This is a JavaScript React component that represents a task list application.
>The component defines and manages the state of the application using the useState hook, which includes an array of tasks, the previousFocusEl element, the editedTask, and the isEditing boolean.

>The useEffect hook is used to retrieve the list of tasks from a server API and update the state of the application.
>The component has several child components, including CustomForm, EditForm, and TaskList, which handle adding, editing, and displaying tasks, respectively.
>The addTask, deleteTask, toggleTask, updateTask, closeEditMode, and enterEditMode functions are defined to handle user interactions and server communication.
>The component uses Axios to connect to a server API, which is used to retrieve, create, update, and delete tasks from the server.

>Overall, the component provides basic CRUD functionality for managing tasks and updating the server API.
### 🛠Tools
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" height='40'/>](https://reactjs.org/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height='40'/>](https://nodejs.org/en/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" height='40' />](https://www.sqlite.org/index.html)
                              

### Website

__This project is being host in a raspberry pi 4. You can acess the website in this link :__[🕸️](http://joaopinto.zapto.org)

### Used scripts
1. create a default react app (client folder)
```bash
npx create-react-app client
```
2. check the database status and info via Prisma (server folder)
```bash
npx prisma studio
```
### Pre-requirements 
1. install all depencies (both folders)
```bash
npm install
```
### Run the app
1. On the server folder start the backend
```bash
npm run start
```
2. On the client folder start the frontend
```bash
npm run start
```
