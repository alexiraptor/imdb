const express = require('express');
const app = express();

app.listen(8000, () => {
    console.log('Authentication service started on port 8000');
});

const users = [
    {
        name: 'john',
        email: 'john@gmail.com',
        password: 'password123admin',
        admin: '1'
    }, {
        name: 'anna',
        email: 'anna@gmail.com',
        password: 'password123member',
        admin: '0'
    }
];

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const accessTokenSecret = 'youraccesstokensecret';

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { email, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.email === email && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ email: user.email,  admin: user.admin }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('email or password incorrect');
    }
});