const Pool = require('pg').Pool
const pool = new Pool({
    user: 'candidate',
    host: 'localhost',
    database: 'fruity',
    password: 'candidate',
    port: 5432,
})

export default pool;