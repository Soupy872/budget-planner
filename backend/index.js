const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const { response } = require('express');
const port = 3000;

// OAuth2
// https://developers.google.com/identity/sign-in/web/sign-in
// https://tomanagle.medium.com/google-oauth-with-node-js-4bff90180fe6

// PostgresSQL
// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
