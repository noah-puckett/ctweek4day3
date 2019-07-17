const { Router } = require('express');
const Person = require('../models/Person');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            city,
            state,
            profileImage,
            email
        } = req.body;

        Person
            .create({ name, city, state, profileImage, email })
            .then(person => {
                res.send(person);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Person
            .find()
            .then(people => {
                res.send(people);
            })
            .catch(next);
    }) 

    .get('/:id', (req, res, next) => {

        Person
            .findById(req.params.id)
            .then(person => {
                res.send(person);
            })
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {

        const {
            name,
        } = req.body;

        Person
            .findByIdAndUpdate(req.params.id, { name }, { new: true })
            .then(patchedPerson => {
                res.send(patchedPerson);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {

        const {
            name,
            city,
            state,
            profileImage,
            email
        } = req.body;

        Person
            .findByIdAndUpdate(req.params.id, { name, city, state, profileImage, email }, { new: true })
            .then(replacedPerson => {
                res.send(replacedPerson);
            })
            .catch(next);

    })

    .delete('/:id', (req, res, next) => {

        Person
            .findByIdAndDelete(req.params.id)
            .then(deletedPerson => {
                res.send(deletedPerson);
            })
            .catch(next);
    });
