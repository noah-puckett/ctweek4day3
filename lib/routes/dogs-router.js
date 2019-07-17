const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            age,
            weight,
            owner
        } = req.body;

        Dog
            .create({ name, age, weight, owner })
            .then(dog => {
                res.send(dog);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Dog
            .find()
            .then(dogs => {
                res.send(dogs);
            })
            .catch(next);
    }) 

    //.populate is new, apparently knows... what is happening?
    .get('/:id', (req, res, next) => {
        
        Dog
            .findById(req.params.id)
            .populate('owner')
            .then(dog => {
                res.send(dog);
            })
            .catch(next);
    })
//     Promise.all([
    //         Person.findById(req.params.id),
    //         Dog.find({ owner: req.params.id })
    //     ])
    //         .then(([person, dog]) => {
    //             res.send({ person, dog });
    //         })
    //         .catch(next);
    // })

    .patch('/:id', (req, res, next) => {

        const {
            name,
        } = req.body;

        Dog
            .findByIdAndUpdate(req.params.id, { name }, { new: true })
            .then(patchedDog => {
                res.send(patchedDog);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {

        const {
            name,
            age,
            weight,
            owner
        } = req.body;

        Dog
            .findByIdAndUpdate(req.params.id, { name, age, weight, owner }, { new: true })
            .then(replacedDog => {
                res.send(replacedDog);
            })
            .catch(next);

    })

    .delete('/:id', (req, res, next) => {

        Dog
            .findByIdAndDelete(req.params.id)
            .then(deletedDog => {
                res.send(deletedDog);
            })
            .catch(next);
    });
