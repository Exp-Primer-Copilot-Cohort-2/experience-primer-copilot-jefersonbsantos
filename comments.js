// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

// Use body-parser
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', function (req, res) {
    const comment = req.body;
    // Read comments from file
    fs.readFile('./comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
            return;
        }
        const comments = JSON.parse(data);
        // Add a new comment to the list
        comments.push(comment);
        // Write comments to file
        fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error');
                return;
            }
            res.send(comment);
        });
    });
});

// Get all comments
app.get('/comments', function (req, res) {
    // Read comments from file
    fs.readFile('./comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
            return;
        }
        res.send(data);
    });
});

// Start the server
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});