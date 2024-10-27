import * as express from 'express';
import {Request, Response} from 'express';
import pool from "./db";
import * as cors from 'cors';
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Welcome to Backend")
});

app.get('/fruits', async (req: Request<any>, res: Response <{status: any, json: {[k: string]: any}}>) => {
    pool.query('SELECT * FROM fruit', (error, results) => {
        if (error) {
            console.log("Error occured while fetching fruits from DB.")
        }
        res.status(200).json(results.rows)
    })
});

app.get('/location', async (req: Request<any>, res: Response <{status: any, json: {[k: string]: any}}>) => {
    pool.query('SELECT * FROM location', (error, results) => {
        if (error) {
            console.log("Error occured while fetching location from DB.")
        }
        res.status(200).json(results.rows)
    })
});

/**
 * FOR DEMONSTRATION PURPOSE - THIS API HAS TYPESCRIPT COMPLETELY IMPLEMENTED
 * WITH PROPER RESPONSES AND ERROR HANDLING
 * TESTS ARE ADDED FOR THIS API IN tests/ folder
 */
app.get('/consumption/:location/:year', async (req: Request<any>, res: Response <{body: [{name: string, year: string, amount: number}] | null, message: string}>) => {
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
            GROUP BY fruit.name, ledger.time, amount`, (error: Error, results: {rows: [{name: string, year: string, amount: number}] | []}) => {

        if(results.rows.length === 0) {
            return res.status(200).json({body: null, message: "No fruits found"})
        }
        if (error) {
            return res.status(500).json({body: null, message: "Error occurred"})
        }
        return res.status(200).json({body: results.rows, message: "OK!"})
    })
});

interface customRequest extends Request {
    location: string,
    fruits: {
        [fruitName: string]: string
    }
}
app.post('/purchase', async (req: Request<customRequest>, res: Response <{body: string}>) => {
        const location = req.body.location || "";
        const fruits = req.body.fruits || {}

        const totalKCal = await pool.query(`SELECT sum(kcal) from fruit where name in (${Object.keys(fruits).map((f) => `'${f}'`).join(',')})`);

        if(totalKCal.rows[0].sum > 250) {
            return res.status(500).json({body: "Number of calories exceeded"})
        }
        for(let f in fruits) {
            let quantity = fruits[f];
            pool.query(`INSERT INTO ledger ("fruit_id", "location_id", "amount", "time") values (
                            ( SELECT id from fruit where name = '${f}'), ( SELECT id from location where name = '${location}' ), ${quantity}, NOW()
                        )`, (error, results) => {
                if (error) {
                    console.log("ERROR occurred")
                }
                console.log("query added..");
            })
        }
        return res.status(200).json({body: "added"});
});


app.listen(port,  () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});