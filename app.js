const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();

console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/timestamp/', (req, res) => {
    let date = new Date();
    res.json({ 'unix': date.getTime(), 'utc': date.toUTCString() });
});

app.get('/api/timestamp/:timeInput', (req, res) => {
    let timeInput = req.params.timeInput;
    let date = moment(timeInput);
    if (!date.isValid()) {
        date = moment(timeInput, 'X');
    }
    let unixTime = date.format('X');
    let utcTime = date.format('ddd, D MMM YYYY, h:mm:ss z');

    res.json({ 'timeInput': timeInput, 'date': date, 'unix': unixTime, 'utc': utcTime });
});

const listener = app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});
