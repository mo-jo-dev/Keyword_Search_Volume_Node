const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const { PORT } = require('./config/config');
const bodyParser = require('body-parser');
const { compileFunction } = require('vm');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'words_search',
    port: 3306,
  });


app.post('/word', async (req, res) => {
    try {
        con.connect(function(err) {
            if (err) throw err;
            
            const word = req.body.word;
            
            con.query(`SELECT COUNT FROM WORDS WHERE WORD = ${JSON.stringify(word)}`, (error, result) => {
                if(!result.length){
                    con.query(`INSERT INTO WORDS (WORD, COUNT) VALUES (${JSON.stringify(word)}, 1)`);
                    // document.getElementById("count").innerHTML = 1;
                } else{
                    con.query(`UPDATE WORDS SET COUNT = COUNT+1 WHERE WORD = ${JSON.stringify(word)}`);
                    // document.getElementById("count").innerHTML=Object.values(result[0]);
                }
            });
            res.status(201).json({
                message: "Successfully Posted"
            })          
        });
    } catch (error) {
        throw error;
    }
});

const startServer = async () => {
    app.listen(PORT,() => {
        console.log(`Server Started at port: ${PORT}`);
    });

    
}

startServer();