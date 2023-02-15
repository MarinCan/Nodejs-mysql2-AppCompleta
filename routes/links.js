const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */
router.get('/', async (req, res, next) => {

  //con esto podemos saber si esta conectando bien:
  // const [result] = await pool.query("SELECT 1+1")

  const [ links ] = await pool.query("SELECT * FROM links")

  console.log(links)
  // res.send('Lista de links here!')
  res.render('links/list', { links })

  // res.send('LINKS !! ');
});


router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {
  console.log(req.body)

  const {title, url, description} = req.body
  const new_link = {
    title,
    url,
    description
  }

  // console.log(new_link)

  await pool.query('INSERT INTO links SET ?', [new_link])
  
  res.redirect('/links')
})

router.get('/delete/:id', async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [id])
  res.redirect('/links')
})

module.exports = router;
