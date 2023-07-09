const express = require ('express');
const app = express();
const mysql = require('mysql2')
require('dotenv').config();

const {insert, read, update, remove} = require('./operations');

app.use(express.json());

//conexión a la base de datos (adaptar a los parámetros de la BD)
const connection = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
});

const pool = mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
})


connection.connect((err)=>{
if(err) throw err;
console.log('Conected to database');
});

app.get('/', (req, res) => {//esta parte del código es solo para comprobar que el servidor está funcionando y corre desde el navegador
    res.send('Hello world');
});

//Ejecución de la función insert contenida en el modulo operations.js
app.get('/insert', (req, res) => {
    insert(pool, {id: '11', nombres: 'Carpinchito', edad: '26'}, result => {
        res.json(result);
    });
});

//Ejecución de la función read contenida en el modulo operations.js
app.get('/read', (req, res) => {
    read(pool, result => {
        res.json(result);
    });
});

//Ejecución de la función update contenida en el modulo operations.js
app.get('/update', (req, res) => {
    update(pool, {edad: '50', id: '11'}, result => {
        res.json(result);
    });
});

//Ejecución de la función removeQuery contenida en el modulo operations.js
app.get('/remove', (req, res) => {
    remove(pool, {id: '10'}, result => {
        res.json(result);
    });
});


app.listen(3000, ()=> {
    console.log('Server running on port 3000...')
});