const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // console.log(req.body)
    // console.log(username)
    // console.log(password)

    const [ rows ] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    console.log(rows)

    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = helpers.matchPassword(password, user.password)

        if ( validPassword ){
            done(null, user, req.flash('success', 'Bienvenido de nuevo, ' + username + '! :)'))
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'))
        }
        
    } else {
        return done (null, false, req.flash('message', 'El usuario no existe'))
    }

}))


passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // console.log(req.body)
    const {email, fullname} = req.body
    const newUser = {
        username,
        password,
        email,
        fullname
    }

    newUser.password = await helpers.encryptPassword(password)

    const [ result ] = await pool.query('INSERT INTO users SET ?', [newUser])
    //falta encriptar contraseña --> creado archivo en lib (despues, se crea el newUser.password)

    newUser.id = result.insertId
    // console.log(result)

    return done(null, newUser)  // somos optimistas y aqui no hay errores :) de ahi el null
}))

// para mantener la sesion del usuario mientras navega
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

    done(null, rows[0])
})