const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            title,
            studio,
            released,
            cast
        } = req.body;

        Film
            .create({ title, studio, released, cast })
            .then(film => {
                res.send(film);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Film
            .find()
            .populate('studio', { __v: false, address: false })
            .select({ cast: false, __v: false })
            .then(films => {
                res.send(films);
            })
            .catch(next);
    }) 

    .get('/:id', (req, res, next) => {

        Promise.all([
            Film
                .findById(req.params.id)
                .populate('studio', { __v: false, address: false })
                .populate('cast.actor', { _id: true, name: true })
                .select({ __v: false }),
            Review
                .find({ film: req.params.id })
                .populate('reviewer', { __v: false, company: false })
                .select({ __v: false, film: false }) 
        ])
            .then(([film, reviews]) => {
                res.send({ ...film.toJSON(), reviews });
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

        Film
            .findByIdAndUpdate(req.params.id, { title, studio, released, cast }, { new: true })
            .then(replacedFilm => {
                res.send(replacedFilm);
            })
            .catch(next);

    })

// .delete('/:id', (req, res, next) => {

//     Film
//         .findByIdAndDelete(req.params.id)
//         .then(deletedFilm => {
//             res.send(deletedFilm);
//         })
//         .catch(next);
// })
;
