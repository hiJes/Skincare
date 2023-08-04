var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gitjes7@gmail.com',
        pass: 'Qq@1234567'
    }
});

var mailOptions = {
  from: 'gitjes7@gmail.com', // sender address
  to: "jessiino6@gmail.com", // list of receivers
  subject: "Success Make New Account", // Subject line
  text: `
  Congratulation! 
  Welcome to SKINCARE Family. 
  Makes your skin Happy. 
  Enjoy the ride!
  `
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});