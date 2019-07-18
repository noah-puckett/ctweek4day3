require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
// const Review = require('../lib/models/Review');
// const Reviewer = require('../lib/models/Reviewer');

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

    // POST /api/v1/Films to create a Film
    it('POST route creates a film in the database', async() => {

        const studio = await Studio.create({
            name: 'A1'
        });
        const actor = await Actor.create({
            name: 'Crying Lady'
        });

        return request(app)
            .post('/api/v1/films')
            .send({ 
                title: 'Midsommar',
                studio: studio._id,
                released: 2019,
                cast: [{
                    actor: actor._id
                }]
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'Midsommar',
                    studio: expect.any(String),
                    released: 2019,
                    cast: [{
                        _id: expect.any(String),
                        actor: expect.any(String),
                    }], 
                    __v: 0
                });
            });
    });  
      
      
    it('GET returns all Films', async() => {

        const studio = await Studio.create({
            name: 'A1'
        });

        const actor = await Actor.create({
            name: 'Crying Lady'
        });

        const film1 = await Film.create({
            title: 'Midsommar',
            studio: studio._id,
            released: 2019,
            cast: [{
                actor: actor._id
            }]
        });

        const film2 = await Film.create({
            title: 'Midsommar2 Electric Cultaroo',
            studio: studio._id,
            released: 2020,
            cast: [{
                actor: actor._id
            }]
        });

        return request(app)
            .get('/api/v1/films')
            .then(res => {
                const film1JSON = JSON.parse(JSON.stringify(film1));
                const film2JSON = JSON.parse(JSON.stringify(film2));
                expect(res.body).toEqual([film1JSON, film2JSON]);
            });
    });


    // GET /api/v1/Films/:id to get a Film by id
    it('GET /:id returns a Film by id', async() => {

        const studio = await Studio.create({
            name: 'A1'
        });

        const actor = await Actor.create({
            name: 'Crying Lady'
        });

        // const reviewer = await Reviewer.create({
        //     name: 'kyle',
        //     company: 'ehhhhhh'
        // });

        // const review = await Review.create({
        //     reviewer: 'guy with an opinion',
        //     rating: 100,
        //     review: 'amazing, oh my gosh y\'all',
        //     film: 'a film'
        // });

        const film = await Film.create({
            title: 'Midsommar',
            studio: studio._id,
            released: 2019,
            cast: [{
                actor: {
                    _id: actor._id,
                    role: actor.role,
                    name: actor.name
                }
            }],
            // reviews: [{
            //     _id: review._id,
            //     rating: review.rating,
            //     review: review.review,
            //     reviewer: {
            //         _id: reviewer._id,
            //         name: reviewer.name
            //     }
            // }]
        });

        return request(app)
            .get(`/api/v1/films/${film._id}`)
            .then(res => {
                const filmJSON = JSON.parse(JSON.stringify(film));
                expect(res.body).toEqual(filmJSON);
            });
    });

    // //PATCH /api/v1/:id
    // it('PATCH Films/:id updates a single value on a Film by id', async() => {

    //     const owner = await Film.create({
    //         name: 'FilmLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Film = await Film.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     const newFilm = {
    //         name: 'NEW pupperoni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     };

    //     return request(app)
    //         .patch(`/api/v1/Films/${Film._id}`)
    //         .send(newFilm)
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


    it('PUT Films/:id updates a Film by id', async() => {

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
        const newFilm = {
            title: 'Midsommar2',
            studio: studio._id,
            released: 2012,
            cast: [{
                actor: actor._id
            }]
        };

        return request(app)
            .put(`/api/v1/films/${film._id}`)
            .send(newFilm)
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    title: 'Midsommar2',
                    studio: studio._id.toString(),
                    released: 2012,
                    cast: [{
                        _id: expect.any(String),
                        actor: actor._id.toString()
                    }], 
                    __v: 0 });
            });
    });

    // // DELETE /api/v1/Films/:id to delete a Film
    // it('DELETEs a Film by its id', async() => {

    //     const owner = await Film.create({
    //         name: 'FilmLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Film = await Film.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     return request(app)
    //         .delete(`/api/v1/Films/${Film._id}`)
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
