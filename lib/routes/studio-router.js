const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router() 

// .post('/', (req, res, next) => {

//     const {
//         name,
//         city,
//         state,
//         profileImage,
//         email
//     } = req.body;

//     Studio
//         .create({ name, city, state, profileImage, email })
//         .then(studio => {
//             res.send(Studio);
//         })
//         .catch(next);
// })

    .get('/', (req, res, next) => {
        
        Studio
            .find()
            .then(studios => {
                res.send(studios);
            })
            .catch(next);
    }) 

// .get('/:id', (req, res, next) => {

//     Studio
//         .findById(req.params.id)
//         .then(Studio => {
//             res.send(Studio);
//         })
//         .catch(next);
// })

// .patch('/:id', (req, res, next) => {

//     const {
//         name,
//     } = req.body;

//     Studio
//         .findByIdAndUpdate(req.params.id, { name }, { new: true })
//         .then(patchedStudio => {
//             res.send(patchedStudio);
//         })
//         .catch(next);
// })

// .put('/:id', (req, res, next) => {

//     const {
//         name,
//         city,
//         state,
//         profileImage,
//         email
//     } = req.body;

//     Studio
//         .findByIdAndUpdate(req.params.id, { name, city, state, profileImage, email }, { new: true })
//         .then(replacedStudio => {
//             res.send(replacedStudio);
//         })
//         .catch(next);

// })

// .delete('/:id', (req, res, next) => {

//     Studio
//         .findByIdAndDelete(req.params.id)
//         .then(deletedStudio => {
//             res.send(deletedStudio);
//         })
//         .catch(next);
// })
;
