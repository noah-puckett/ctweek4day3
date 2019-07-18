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
            .then(films => {
                res.send(films);
            })
            .catch(next);
    }) 

    //TODO: get a list of allReviews eventually
    .get('/:id', (req, res, next) => {

        Review
            .findById(req.params.id)
            .then(Film => {
                res.send(Film);
            })
            .catch(next);
    })

// .patch('/:id', (req, res, next) => {

//     const {
//         name,
//     } = req.body;

//    Review
//         .findByIdAndUpdate(req.params.id, { name }, { new: true })
//         .then(patchedFilm => {
//             res.send(patchedFilm);
//         })
//         .catch(next);
// })

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

    })

// .delete('/:id', (req, res, next) => {

//    Review
//         .findByIdAndDelete(req.params.id)
//         .then(deletedFilm => {
//             res.send(deletedFilm);
//         })
//         .catch(next);
// })
;
