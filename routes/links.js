const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */
router.get('/', async (req, res, next) => {

  //con esto podemos saber si esta conectando bien:
  const [result] = await pool.query("SELECT 1+1")
  res.json(result)

  // res.send('LINKS !! ');
});


router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', (req, res) => {
  res.send('Recibido')
})

module.exports = router;
