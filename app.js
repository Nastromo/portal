require('dotenv').config();
const express = require('express');
const { db } = require('./db');
const cors = require('cors');
const apiV1 = require('./routes/apiV1');
const checkRequest = require('./middleware/CheckRequest');




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkRequest);

console.log(process.env.NODE_ENV);
console.log(process.env.DB_USER);

apiV1(app);

(async () => {
    try {
        await db.sync({ force: process.env.NODE_ENV === 'production' ? false : false });
        console.log(`${process.env.NODE_ENV} Database & Tables created!`);
        const port = process.env.MY_PORT;
        if (process.env.NODE_ENV === 'production') {
            app.listen(port, '127.0.0.1', () => { console.log(`Prod Main Server listening ${port} port...`); });
        } else {
            app.listen(port, () => { console.log(`Dev Main Server listening ${port} port...`); });
        }
    } catch (err) {
        console.log(err);
    }
})();