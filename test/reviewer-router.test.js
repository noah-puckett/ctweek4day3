require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Review = require('../lib/models/Review');

describe('app routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    // POST /api/v1/Reviewers to create a Reviewer
    it('POST route creates a Reviewer in the database', () => {

        return request(app)
            .post('/api/v1/reviewers')
            .send({ 
                name: 'sir critiquesalot',
                company: 'clickbait headliner LLC'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'sir critiquesalot',
                    company: 'clickbait headliner LLC', 
                    __v: 0
                });
            });
    });  
      
      
    // GET /api/v1/Reviewers to get all Reviewers
    it('GET returns all Reviewers', async() => {

        const reviewer1 = await Reviewer.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC',
        });

        const reviewer2 = await Reviewer.create({
            name: 'ReviewerCreaturePerson 456',
            company: 'shocknews yellingsite TM'
        });

        return request(app)
            .get('/api/v1/reviewers')
            .then(res => {
                expect(res.body).toEqual([
                    { _id: reviewer1._id.toString(), name: reviewer1.name, company: reviewer1.company },
                    { _id: reviewer2._id.toString(), name: reviewer2.name, company: reviewer2.company }
                ]);
            });
    });


    // GET /api/v1/Reviewers/:id to get a Reviewer by id
    it('GET /:id returns a Reviewer by id', async() => {

        const reviewer = await Reviewer.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC',
        });

        const studio = await Studio.create({
            name: 'A1'
        });

        const actor = await Actor.create({
            name: 'Crying Lady'
        });
        
        const film = await Film.create({
            title: 'Midsommar',
            studio: studio._id,
            released: 2019,
            cast: [{
                actor: actor._id,
            }],
        });

        const review = await Review.create({
            rating: 100,
            reviewer: reviewer._id,
            review: 'oh my gosh what on earth',
            film: film._id,
        });

        return request(app)
            .get(`/api/v1/reviewers/${reviewer._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: reviewer._id.toString(),
                    name: reviewer.name,
                    company: reviewer.company,
                    reviews: [{
                        _id: review._id.toString(),
                        rating: review.rating,
                        review: review.review,
                        film: {
                            _id: film._id.toString(),
                            title: film.title
                        }
                    }]
                });
            });
    });

    // //PATCH /api/v1/:id
    // it('PATCH Reviewers/:id updates a single value on a Reviewer by id', async() => {

    //     const owner = await Reviewer.create({
    //         name: 'ReviewerLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Reviewer = await Reviewer.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     const newReviewer = {
    //         name: 'NEW pupperoni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     };

    //     return request(app)
    //         .patch(`/api/v1/Reviewers/${Reviewer._id}`)
    //         .send(newReviewer)
    //         .then(res => {
    //             expect(res.body).toEqual({
    //                 _id: expect.any(String),
    //                 name: 'NEW pupperoni',
    //                 age: 12,
    //                 weight: '200lbs',
    //                 owner: owner._id.toString(), 
    //                 __v: 0
    //             });
    //         });
    // });


    it('PUT Reviewers/:id updates a Reviewer by id', async() => {

        const reviewer = await Reviewer.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC',
        });

        return request(app)
            .put(`/api/v1/reviewers/${reviewer._id}`)
            .send({ 
                name: 'NEW Reviewerlady 456',
                company: 'mommybloggers inc'
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'NEW Reviewerlady 456',
                    company: 'mommybloggers inc', 
                    __v: 0 });
            });
    });

    // // DELETE /api/v1/Reviewers/:id to delete a Reviewer
    // it('DELETEs a Reviewer by its id', async() => {

    //     const owner = await Reviewer.create({
    //         name: 'ReviewerLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Reviewer = await Reviewer.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     return request(app)
    //         .delete(`/api/v1/Reviewers/${Reviewer._id}`)
    //         .then(res => {
    //             expect(res.body).toEqual({ 
    //                 _id: expect.any(String),
    //                 name: 'pupperooni',
    //                 age: 12,
    //                 weight: '200lbs',
    //                 owner: owner._id.toString(), 
    //                 __v: 0 });
    //         });
    // });
});
