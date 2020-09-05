require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./handlers/error');

const Message = require('./models/message');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
};

mongoose.connect('mongodb://localhost/warbler', mongoOpts);
const db = mongoose.connection;

db.on('connected', () => console.log('[Mongoose] Connected to DB'));
db.on('error', err => console.log('[Mongoose] error: ' + err.message));

app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    messageRoutes
);

app.get('/api/messages', loginRequired, async (req, res, next) => {
    try {
        let messages = await Message.find()
            .sort({ createdAt: 'desc' })
            .populate('user', {
                username: true,
                profileImageUrl: true,
            });
        return res.status(200).json(messages);
    } catch (e) {
        return next(e.message);
    }
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('[Server] Listening on port ' + PORT);
});
