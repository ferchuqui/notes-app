const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  res.render('/views/index.hbs')
})
router.get('/about', (req, res) =>{
  res.render('/views/about.hbs')
})

module.exports = router;