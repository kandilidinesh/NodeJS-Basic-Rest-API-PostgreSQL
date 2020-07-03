const express = require('express');

const app = express();

const pool = require("./db");



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log
    (`Listening on port number ${port}...`);
});