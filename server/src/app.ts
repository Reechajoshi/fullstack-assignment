import express from 'express';
import pool from "./db";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Welcome to Backend")
});

app.get('/fruits', async (req, res) => {
    pool.query('SELECT * FROM fruit', (error, results) => {
        if (error) {
            console.log("Error occured while fetching fruits from DB.")
        }
        res.status(200).json(results.rows)
    })
});

app.get('/consumption/:location/:year', async (req, res) => {
    pool.query(`SELECT fruit.name, extract('year' from ledger.time) as year, amount
            FROM ledger 
            INNER JOIN fruit
            ON fruit.id = CAST(ledger.fruit_id AS INTEGER)
            INNER JOIN location 
            ON ledger.location_id = location.id
            where location.name='${req.params.location}' AND extract(
                year from ledger.time
                ) IN ('${req.params.year}')
                AND amount = (SELECT MIN(amount) from ledger)
            GROUP BY fruit.name, ledger.time, amount`, (error, results) => {
        if (error) {
            console.log("ERROR occured")
        }
        res.status(200).json(results.rows)
    })
});

app.listen(port,  () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});