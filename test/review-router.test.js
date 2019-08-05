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
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    __v: 0
                });
            });
    });  
      
      
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
                expect(res.body).toEqual([

                    { _id: review1._id.toString(), 
                        rating: review1.rating,
                        review: review1.review,
                        film: {
                            _id: film._id.toString(),
                            title: film.title
                        },
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String), },

                    { _id: review2._id.toString(), 
                        rating: review2.rating,
                        review: review2.review,
                        film: {
                            _id: film._id.toString(),
                            title: film.title
                        },
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String), }
                ]);
            });
    });


    it('PUT reviews/:id updates a review by id', async() => {

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

        const review = await Review.create({
            rating: 100,
            reviewer: reviewer._id,
            review: 'oh my gosh what on earth',
            film: film._id,
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
                    rating: 100,
                    reviewer: reviewer._id.toString(),
                    review: 'oh my gosh what on earth',
                    film: film._id.toString(),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    __v: 0 });
            });
    });
});
