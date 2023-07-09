const mysql = require('mysql2');

//función para insertar registro
function insert(pool,  data, callback){
    let insertQuery ="INSERT INTO personas (id, nombres, edad) VALUES (?, ?, ?)";
    let query = mysql.format(insertQuery, [data.id, data.nombres, data.edad]);
    
    pool.getConnection((err, connection)=>{
        if (err) throw err;
        connection.query(query, (err, result)=> {
            if(err) throw err;
            callback(result);
        
            connection.release();
           });
        })    
    };

//Función para leer los registros
function read(pool, callback) {
    pool.getConnection((err, connection)=>{
        if (err) throw err;
        connection.query('SELECT * FROM personas', (err, result)=>{
            if(err) throw err;
            callback(result);
            connection.release();
            })
        })
    };

//función para actualizar registros
function update(pool,  data, callback){
    let updateQuery ="UPDATE personas SET edad = ? WHERE id=?";
    let query = mysql.format(updateQuery, [data.edad, data.id]);
    
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query(query, (err, result)=> {
            if(err) throw err;
            callback(result);
            connection.release();
            });
        })
    };

//función para eliminar registros
function remove(pool,  data, callback){
    let removeQuery ="DELETE FROM personas WHERE id=?";
    let query = mysql.format(removeQuery, [data.id]);

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query(query, (err, result)=> {
            if(err) throw err;
            callback(result);        
            connection.release();
            })
    
        });
    };

module.exports = { insert, read, update, remove };