const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/studios', require('./routes/studio-router'));
app.use('/api/v1/actors', require('./routes/actor-router'));
app.use('/api/v1/reviewers', require('./routes/reviewer-router'));
app.use('/api/v1/films', require('./routes/film-router'));
app.use('/api/v1/reviews', require('./routes/review-router'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
