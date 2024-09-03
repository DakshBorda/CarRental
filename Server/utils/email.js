const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services
  auth: {
    user: '22cs011@charusat.edu.in',
    pass: 'xcpm czao bykq tgay',
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: '22cs011@charusat.edu.in',
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
