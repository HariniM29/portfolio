const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Serve HTML form
app.get('/', (req, res) => {
    res.render('index'); // Replace 'your-html-file.html' with the actual name of your HTML file
});

// Handle form submission
app.post('/submit', (req, res) => {
  // Get form data
  const { name, email, phone, message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harini200329@gmail.com', // Replace with your Gmail address
      pass: 'mofc zuhl ilxi opol', // Replace with your Gmail password or an app-specific password
    },
  });

  // Set up email options
  const mailOptions = {
    from: 'harini200329@gmail.com', // Replace with your Gmail address
    to: 'harini200329@gmail.com', // Replace with the recipient's email address
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ' + info.response);
  });

  // Redirect to a thank you page or any desired page
  res.redirect('/thankyou');
});
app.get('/thankyou', (req, res) => {
    res.render('thankyou');
  });
// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
