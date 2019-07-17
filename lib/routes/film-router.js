const { Router } = require('express');
const Film = require('../models/Film');


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
            .then(films => {
                res.send(films);
            })
            .catch(next);
    }) 

    //TODO: get a list of all films eventually
    .get('/:id', (req, res, next) => {

        Film
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

//     Film
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
