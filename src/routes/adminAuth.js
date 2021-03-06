const express = require('express');
const router = express.Router();

const {signup, signin, signout} = require('../controllers/adminAuthController');

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router;
