const bcrypt = require('bcryptjs');

const plainPassword = 'DriveNowAdmin@0411';  // Replace with the password you want to hash
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);
});
