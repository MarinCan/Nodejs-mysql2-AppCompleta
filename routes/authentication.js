const express = require('express');
const router = express.Router();
const passport = require('passport')

/* GET users listing. */
router.get('/signup', (req, res, next) => {
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
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin', (req, res) => {
  res.render('auth/signin')
})

router.post('/signin', (req, res, next) => {
  // console.log(req.body)
  // res.send('Login correcto')
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next)
})

router.get('/profile', (req, res) => {
  // res.send('Personal profile')
  res.render('profile')
})

module.exports = router;
