const bcrypt = require('bcryptjs')

const helpers = {}

// Creado de encriptado: 
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

// Decriptacion de contraseñas:
helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword)
    } catch(error){
        console.log(error)
    }
}

module.exports = helpers