module.exports = {

    // Para capar las rutas en caso de los usuarios que no estén logueados/registrados:
    // Esto es un middleware (nuestro), asi que ahora se pondrá en authentication.js y en todos los links

    isLoggedIn(req, res, next){
        if (req.isAuthenticated()){
            return next()
        }

        return res.redirect('/signin')
    },

    isNotLogged(req, res, next){
        if (!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/profile')
    }
}