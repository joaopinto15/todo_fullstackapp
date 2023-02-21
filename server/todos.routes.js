// Express
const express = require("express");
const todosRoutes = express.Router();
const { response } = require("express");
// SQLite
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/database.db', (err) => {
    // Check if the connection is 200
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// CREATE
todosRoutes.post('/todos', (req, res) => {
    const { name } = req.body;
    const status = false; // Default status is false
    db.run(
        // Insert name and status to db
        'INSERT INTO Todo (name, status) VALUES (?, ?)',
        [name, status],
        function (err) {
            if (err) {
                console.log(err.message);
                return res.status(500).send('Internal server error');
            }
            const id = this.lastID;
            db.get('SELECT * FROM Todo WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).send('Internal server error');
                }
                return res.status(201).json(row);
            });
        },
    );
});

// READ
todosRoutes.get('/todos', (req, res) => {
    db.all('SELECT * FROM Todo', (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(rows);
    });
});

// UPDATE
todosRoutes.put('/todos/:id', (req, res) => {
    const { name, status } = req.body;
    const { id } = req.params;

    db.run(
        'UPDATE Todo SET name = ?, status = ? WHERE id = ?',
        [name, status, id],
        function (err) {
            if (err) {
                console.log(err.message);
                return res.status(500).send('Internal server error');
            }
            if (this.changes === 0) {
                return res.status(404).send('Todo not found');
            }
            db.get('SELECT * FROM Todo WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).send('Internal server error');
                }
                return res.status(200).json(row);
            });
        },
    );
});

// DELETE
todosRoutes.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM Todo WHERE id = ?', [id], function (err) {
        if (err) {
            console.log(err.message);
            return res.status(500).send('Internal server error');
        }
        if (this.changes === 0) {
            return res.status(404).send('Todo not found');
        }
        return res.status(200).send();
    });
});

module.exports = todosRoutes;
