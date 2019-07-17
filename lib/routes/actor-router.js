const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            address,
        } = req.body;

        Actor
            .create({ name, address })
            .then(actor => {
                res.send(actor);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Actor
            .find()
            .then(actors => {
                res.send(actors);
            })
            .catch(next);
    }) 

    //TODO: get a list of all films eventually
    .get('/:id', (req, res, next) => {

        Actor
            .findById(req.params.id)
            .then(actor => {
                res.send(actor);
            })
            .catch(next);
    })

// .patch('/:id', (req, res, next) => {

//     const {
//         name,
//     } = req.body;

//     Actor
//         .findByIdAndUpdate(req.params.id, { name }, { new: true })
//         .then(patchedActor => {
//             res.send(patchedActor);
//         })
//         .catch(next);
// })

    .put('/:id', (req, res, next) => {

        const {
            name,
            address,
        } = req.body;

        Actor
            .findByIdAndUpdate(req.params.id, { name, address }, { new: true })
            .then(replacedActor => {
                res.send(replacedActor);
            })
            .catch(next);

    })

// .delete('/:id', (req, res, next) => {

//     Actor
//         .findByIdAndDelete(req.params.id)
//         .then(deletedActor => {
//             res.send(deletedActor);
//         })
//         .catch(next);
// })
;
