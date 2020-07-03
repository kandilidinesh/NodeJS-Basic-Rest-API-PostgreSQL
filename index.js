const express = require('express');

const app = express();

const pool = require("./db");

app.use(express.json()); // Requesting data from body

//Routes

//Get all todos

app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Get a todo

app.get('/todos/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const idTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(idTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Create a todo

app.post('/todos', async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Update a todo

app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;  // WHERE
        const {description} = req.body; // SET
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id]);
        res.json(updateTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Delete a todo

app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const delTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id]);
        res.json(delTodo.rows);
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log
    (`Listening on port number ${port}...`);
});