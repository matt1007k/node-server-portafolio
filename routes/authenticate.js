const express = require('express')

const router = express()

const authenticateController = require('../controllers/authenticate_controller')

router.post('/register', authenticateController.register)

router.post('/login', authenticateController.login)

module.exports = router