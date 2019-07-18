require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

describe('review routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    // POST /api/v1/Reviews to create a Review
    it('POST route creates a Review in the database', async() => {

        const reviewer = await Reviewer.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC'
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
                actor: actor._id
            }]
        });

        return request(app)
            .post('/api/v1/reviews')
            .send({ 
                rating: 100,
                reviewer: reviewer._id,
                review: 'oh my gosh what on earth',
                film: film._id,
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    rating: 100,
                    reviewer: reviewer._id.toString(),
                    review: 'oh my gosh what on earth',
                    film: film._id.toString(),
                    __v: 0
                });
            });
    });  
      
      
    // GET /api/v1/Reviews to get all Reviews
    it('GET returns all reviews', async() => {

        const reviewer = await Reviewer.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC'
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
                actor: actor._id
            }]
        });

        const review1 = await Review.create({
            rating: 100,
            reviewer: reviewer._id,
            review: 'oh my gosh what on earth',
            film: film._id,
        });

        const review2 = await Review.create({
            rating: 20,
            reviewer: reviewer._id,
            review: 'today I created this review and it was good',
            film: film._id,
        });

        return request(app)
            .get('/api/v1/reviews')
            .then(res => {
                const review1JSON = JSON.parse(JSON.stringify(review1));
                const review2JSON = JSON.parse(JSON.stringify(review2));
                expect(res.body).toEqual([review1JSON, review2JSON]);
            });
    });


    // GET /api/v1/Reviews/:id to get a Review by id
    it('GET /:id returns a review by id', async() => {

        const review = await Review.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC',
        });

        return request(app)
            .get(`/api/v1/reviews/${review._id}`)
            .then(res => {
                const reviewJSON = JSON.parse(JSON.stringify(review));
                expect(res.body).toEqual(reviewJSON);
            });
    });

    // //PATCH /api/v1/:id
    // it('PATCH Reviews/:id updates a single value on a Review by id', async() => {

    //     const owner = await Review.create({
    //         name: 'ReviewLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Review = await Review.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     const newReview = {
    //         name: 'NEW pupperoni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     };

    //     return request(app)
    //         .patch(`/api/v1/Reviews/${Review._id}`)
    //         .send(newReview)
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


    it('PUT reviews/:id updates a review by id', async() => {

        const review = await Review.create({
            name: 'sir critiquesalot',
            company: 'clickbait headliner LLC',
        });

        return request(app)
            .put(`/api/v1/reviews/${review._id}`)
            .send({ 
                name: 'NEW Reviewlady 456',
                company: 'mommybloggers inc'
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'NEW Reviewlady 456',
                    company: 'mommybloggers inc', 
                    __v: 0 });
            });
    });

    // // DELETE /api/v1/Reviews/:id to delete a Review
    // it('DELETEs a Review by its id', async() => {

    //     const owner = await Review.create({
    //         name: 'ReviewLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Review = await Review.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     return request(app)
    //         .delete(`/api/v1/Reviews/${Review._id}`)
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
