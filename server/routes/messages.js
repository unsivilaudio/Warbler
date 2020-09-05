const express = require('express');
const {
    createMessage,
    getMessage,
    deleteMessage,
} = require('../handlers/message');

const router = express.Router({ mergeParams: true });

router.route('/').post(createMessage);
router.route('/:message_id').get(getMessage).delete(deleteMessage);

module.exports = router;
