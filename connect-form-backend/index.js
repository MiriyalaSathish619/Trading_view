const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5200;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root@619',
  database: 'connect_trade'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL DB.');
});

// POST /contact route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // SQL insert
  const sql = `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`;
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }
    res.json({ success: true, message: 'Message saved successfully!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
