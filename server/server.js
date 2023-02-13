const { readFileSync, writeFileSync } = require('fs');

const express = require('express');
const app = express();

app.get('/', (req,res) => {
	const count = readFileSync('./count.txt');
	console.log('count ',count)

	const newCount = parseInt(count) + 1

	writeFileSync('./count.txt', newCount.toString());

	res.send(`

	<!DOCTYPE html>
	<html lang="en">
	<head>
    		<meta charset="UTF-8">
    		<meta http-equiv="X-UA-Compatible" content="IE=edge">
    		<meta name="viewport" content="width=device-width, initial-scale=1.0">
    		<title>Document</title>
	</head>
	<body>

<div id="myDIV" class="header">
  <h2>My To Do List</h2>
  <input type="text" id="myInput" placeholder="Title...">
  <span onclick="newElement()" class="addBtn">Add</span>
</div>

<ul id="myUL">
  <li>Hit the gym</li>
  <li class="checked">Pay bills</li>
  <li>Meet George</li>
  <li>Buy eggs</li>
  <li>Read a book</li>
  <li>Organize office</li>
</ul>

	</body>
`);

});

app.listen(5000, () => console.log('http://localhost:5000/'));
