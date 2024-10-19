const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services
  auth: {
    user: 'dakshborada@gmail.com',
    pass: 'qnsr ltau dfaj toxl',
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: 'dakshborada@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      console.log(otp);
    }
  });
};

module.exports = sendOTP;
