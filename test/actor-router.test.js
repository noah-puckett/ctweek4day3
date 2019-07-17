require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

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

    // POST /api/v1/Actors to create a Actor
    it('POST route creates a Actor in the database', () => {

        return request(app)
            .post('/api/v1/actors')
            .send({ 
                name: 'Keanu Reeves',
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Keanu Reeves', 
                    __v: 0
                });
            });
    });  
      
      
    // GET /api/v1/Actors to get all Actors
    it('GET returns all actors', async() => {

        const actor1 = await Actor.create({
            name: 'ActorLady 123',
        });

        const actor2 = await Actor.create({
            name: 'ActorCreaturePerson 456'
        });

        return request(app)
            .get('/api/v1/actors')
            .then(res => {
                const actor1JSON = JSON.parse(JSON.stringify(actor1));
                const actor2JSON = JSON.parse(JSON.stringify(actor2));
                expect(res.body).toEqual([actor1JSON, actor2JSON]);
            });
    });


    // GET /api/v1/Actors/:id to get a Actor by id
    it('GET /:id returns a Actor by id', async() => {

        const actor = await Actor.create({
            name: 'ActorLady 123',
        });

        return request(app)
            .get(`/api/v1/actors/${actor._id}`)
            .then(res => {
                const actorJSON = JSON.parse(JSON.stringify(actor));
                expect(res.body).toEqual(actorJSON);
            });
    });

    // //PATCH /api/v1/:id
    // it('PATCH Actors/:id updates a single value on a Actor by id', async() => {

    //     const owner = await Actor.create({
    //         name: 'ActorLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Actor = await Actor.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     const newActor = {
    //         name: 'NEW pupperoni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     };

    //     return request(app)
    //         .patch(`/api/v1/Actors/${Actor._id}`)
    //         .send(newActor)
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


    it('PUT actors/:id updates a actor by id', async() => {

        const actor = await Actor.create({
            name: 'ActorLady 123',
        });

        const newActor = await Actor.create({
            name: 'NEW actorlady 456',
        });

        return request(app)
            .put(`/api/v1/actors/${actor._id}`)
            .send({ 
                name: 'NEW actorlady 456',
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'NEW actorlady 456', 
                    __v: 0 });
            });
    });

    // // DELETE /api/v1/Actors/:id to delete a Actor
    // it('DELETEs a Actor by its id', async() => {

    //     const owner = await Actor.create({
    //         name: 'ActorLady 123',
    //         email: 'ownerlady@gmail.com'
    //     });

    //     const Actor = await Actor.create({
    //         name: 'pupperooni',
    //         age: 12,
    //         weight: '200lbs',
    //         owner: owner._id.toString(), 
    //     });

    //     return request(app)
    //         .delete(`/api/v1/Actors/${Actor._id}`)
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
