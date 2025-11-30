const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Rate Limiting: Prevent spam (max 5 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Load SSL Certificates
let options = {};
try {
  options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
} catch (err) {
  console.error("Error loading SSL certificates. Ensure 'key.pem' and 'cert.pem' exist.");
  process.exit(1);
}

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify Transporter Connection
transporter.verify(function (error, success) {
  if (error) {
    console.log('Transporter Error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Routes
app.post('/api/send-email', [
  // Input Validation & Sanitization
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').escape()
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // Sender address (might be overridden by Gmail to be the authenticated user)
    to: 'abdessamadguia11@gmail.com', // Receiver address
    subject: `New Message from Portfolio: ${name}`,
    text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    replyTo: email // Ensure you can reply to the sender
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email. Check server logs.' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Start HTTPS Server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Secure Server running on https://localhost:${PORT}`);
  console.log(`Email User Configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
});

