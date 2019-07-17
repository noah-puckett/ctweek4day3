const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            company,
        } = req.body;

        Reviewer
            .create({ name, company })
            .then(reviewer => {
                res.send(reviewer);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Reviewer
            .find()
            .then(reviewers => {
                res.send(reviewers);
            })
            .catch(next);
    }) 

    //TODO: get a list of all films eventually
    .get('/:id', (req, res, next) => {

        Reviewer
            .findById(req.params.id)
            .then(reviewer => {
                res.send(reviewer);
            })
            .catch(next);
    })

// .patch('/:id', (req, res, next) => {

//     const {
//         name,
//     } = req.body;

//     Reviewer
//         .findByIdAndUpdate(req.params.id, { name }, { new: true })
//         .then(patchedReviewer => {
//             res.send(patchedReviewer);
//         })
//         .catch(next);
// })

    .put('/:id', (req, res, next) => {

        const {
            name,
            company,
        } = req.body;

        Reviewer
            .findByIdAndUpdate(req.params.id, { name, company }, { new: true })
            .then(replacedReviewer => {
                res.send(replacedReviewer);
            })
            .catch(next);

    })

// .delete('/:id', (req, res, next) => {

//     Reviewer
//         .findByIdAndDelete(req.params.id)
//         .then(deletedReviewer => {
//             res.send(deletedReviewer);
//         })
//         .catch(next);
// })
;
