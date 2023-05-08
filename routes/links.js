const express = require('express');
const router = express.Router();

const pool = require('../database')

const { isLoggedIn } = require('../lib/auth')

/* GET users listing. */
router.get('/', isLoggedIn, async (req, res, next) => {

  //con esto podemos saber si esta conectando bien:
  // const [result] = await pool.query("SELECT 1+1")

  const [ links ] = await pool.query("SELECT * FROM links WHERE user_id = ?", [req.user.id])

  console.log(links)
  // res.send('Lista de links here!')
  res.render('links/list', { links })

  // res.send('LINKS !! ');
});


router.get('/add', isLoggedIn, (req, res) => {
  res.render('links/add')
})

router.post('/add', isLoggedIn, async (req, res) => {
  console.log(req.body)

  const {title, url, description} = req.body
  const new_link = {
    title,
    url,
    description,
    user_id: req.user.id
  }

  // console.log(new_link)

  await pool.query('INSERT INTO links SET ?', [new_link])
  
  req.flash('success', 'Link saved! :D')

  res.redirect('/links')
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [id])

  req.flash('success', 'Eliminado! :O')
  res.redirect('/links')
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  // console.log(req.params.id)
  const { id } = req.params

  const [link] = await pool.query('SELECT * FROM links WHERE id = ?', [id])
  console.log(link)
  
  res.render('links/edit', { link:link[0] })
  // res.send('editado')
})

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params 
  const { title, url, description } = req.body
  const new_link = {
    title, 
    url,
    description
  }

  await pool.query('UPDATE links SET ? WHERE id = ?', [new_link, id])

  req.flash('success', 'Editado de forma correcta! :)')

  res.redirect('/links')
})

module.exports = router;
