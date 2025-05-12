const express = require('express');
const cors = require('cors'); // Require CORS
const app = express();
const PORT = process.env.PORT || 3000;

let timerStartTime = null;
let timerDuration = 2 * 60 * 60; // 2 hours in seconds

app.use(cors()); // Use CORS middleware
app.use(express.json());

app.post('/start-timer', (req, res) => {
    timerStartTime = Date.now();
    console.log(`Timer started at ${new Date(timerStartTime).toLocaleString()}`);
    res.json({ message: 'Timer started' });
});

app.get('/timer', (req, res) => {
    if (timerStartTime) {
        const elapsed = Math.floor((Date.now() - timerStartTime) / 1000);
        const remaining = timerDuration - elapsed;
        console.log(remaining);
        res.json({ remaining: remaining > 0 ? remaining : 0 });
    } else {
        res.json({ remaining: timerDuration }); // Return full duration if not started
    }
});

app.post('/stop-timer', (req, res) => {
    timerStartTime = null;
    res.json({ message: 'Timer stopped' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});