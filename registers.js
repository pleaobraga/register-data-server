let db = {
  aubay: []
}

function getData (token = 'aubay') {
  let data = db[token]
  return data
}


function emailIsRegistered (registers, email) {

  let isRegistered = false

  registers.forEach(register => {

    if(register.email == email) {
       isRegistered = true
     }
  });

  return isRegistered

}


function checkEmail(email, token = 'aubay') {
  return new Promise((res) => {

    let registers = getData(token)

    res(emailIsRegistered(registers, email))
  })
}

function getAll (token = 'aubay') {
  return new Promise((res) => {
    const registers = getData(token)
    let keys = Object.keys(registers)
    res(keys.map(key => registers[key]))
  })
}

function saveNewRegister  (token = 'aubay', data) {
  return new Promise((res) => {

    let registers = getData(token)

    if(!emailIsRegistered(registers, data.email)) {

      let newRegister = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      }

      registers.push(newRegister)

      res("register added successfully")

    } else {
      throw new Error("402")
    }
  })
}

module.exports = {
  getAll,
  saveNewRegister,
  checkEmail
}
