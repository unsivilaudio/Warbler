const express = require('express');
const { signin, signup } = require('../handlers/auth');

const router = express.Router({ mergeParams: true });

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;
