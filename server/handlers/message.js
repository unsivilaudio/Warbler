const Message = require('../models/message');
const User = require('../models/user');

const createMessage = async function (req, res, next) {
    try {
        let message = await Message.create({
            text: req.body.text,
            user: req.params.id,
        });
        let foundUser = await User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await Message.findById(message._id).populate(
            'user',
            {
                username: true,
                profileImageUrl: true,
            }
        );
        return res.status(200).json(foundMessage);
    } catch (e) {
        return next(e.message);
    }
};

const getMessage = async function (req, res, next) {
    try {
        let message = await Message.findById(req.params.message_id);
        return res.status(200).json(message);
    } catch (e) {
        return next(e.message);
    }
};

const deleteMessage = async function (req, res, next) {
    try {
        let foundMessage = await Message.findOne({
            _id: req.params.message_id,
        })
            .remove()
            .exec();
        return res.status(200).json(foundMessage);
    } catch (e) {
        return next(e.message);
    }
};

module.exports = { createMessage, getMessage, deleteMessage };
