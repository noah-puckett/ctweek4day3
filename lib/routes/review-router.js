const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            rating,
            reviewer,
            review,
            film
        } = req.body;

        Review
            .create({ rating, reviewer, review, film })
            .then(film => {
                res.send(film);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Review
            .find()
            .populate('film', { _id: true, title: true })
            .select({ __v: false, reviewer: false })
            .then(reviews => {
                res.send(reviews);
            })
            .catch(next);
    }) 

    .put('/:id', (req, res, next) => {

        const {
            title,
            studio,
            released,
            cast
            
        } = req.body;

        Review
            .findByIdAndUpdate(req.params.id, { title, studio, released, cast }, { new: true })
            .then(replacedFilm => {
                res.send(replacedFilm);
            })
            .catch(next);
    });
