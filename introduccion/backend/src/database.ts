import mysql from 'mysql';
import keys from './keys';
const pool = mysql.createPool(keys.database);


pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log(connection.state)
});
export default pool;
