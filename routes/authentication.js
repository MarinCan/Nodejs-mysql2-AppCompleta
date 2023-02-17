const express = require('express');
const router = express.Router();
const passport = require('passport')
const { isLoggedIn, isNotLogged } = require('../lib/auth')


/* GET users listing. */
router.get('/signup', isNotLogged, (req, res, next) => {
  res.render('auth/signup');
});

// REGISTRO DE USUARIOS:
// Se podría hacer asi:

// router.post('/signup', (req, res, next) => {
//   // console.log(req.body)
//   passport.authenticate('local.signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: true
//   })
//   res.send('Registrado!!');
// });

//OTRA FORMA DE HACERLO más rápido:
router.post('/signup', isNotLogged, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin', isNotLogged, (req, res) => {
  res.render('auth/signin')
})

router.post('/signin',isNotLogged, (req, res, next) => {
  // console.log(req.body)
  // res.send('Login correcto')
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next)
})


// primero pasará por el middleware isLoggedIn que hemos creado. Si no lo está, no pasará

router.get('/profile', isLoggedIn, (req, res) => {
  // res.send('Personal profile')
  res.render('profile')
})


router.get('/logout', isLoggedIn, (req, res) => {
  //hay que hacer una callback ahora para que vaya:
  req.logOut(function(err){
    if(err) return next(err)
  })
  res.redirect('/signin')
})

module.exports = router;
