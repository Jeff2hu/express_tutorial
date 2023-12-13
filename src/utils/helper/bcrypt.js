const bcrypt = require('bcrypt');

function hashPassword(password){
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = {
  hashPassword,
  comparePassword
}