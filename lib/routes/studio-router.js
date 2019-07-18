const { Router } = require('express');
const Studio = require('../models/Studio');
const Film = require ('../models/Film');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            address,
            film,
        } = req.body;

        Studio
            .create({ name, address, film })
            .then(studio => {
                res.send(studio);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Studio
            .find()
            .then(studios => {
                res.send(studios);
            })
            .catch(next);
    }) 

    //TODO: get a list of all films eventually
    .get('/:id', (req, res, next) => {
        Promise.all([
            Studio
                .findById(req.params.id)
                .select({ __v: false }),
            Film
                .find({ studio: req.params.id })
                .select({ cast: false, __v: false, studio: false, released: false })
        ])
            .then(([studio, films]) => {
                res.send({ ...studio.toJSON(), films });
            })
            .catch(next);
    })


    .put('/:id', (req, res, next) => {

        const {
            name,
            address,
        } = req.body;

        Studio
            .findByIdAndUpdate(req.params.id, { name, address }, { new: true })
            .then(replacedStudio => {
                res.send(replacedStudio);
            })
            .catch(next);

    })

// .delete('/:id', (req, res, next) => {

//     Studio
//         .findByIdAndDelete(req.params.id)
//         .then(deletedStudio => {
//             res.send(deletedStudio);
//         })
//         .catch(next);
// })
;
