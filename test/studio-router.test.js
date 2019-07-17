require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');


describe('studio routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });


    it('GET / gets all studios I guess?', async() => {

        const studio = await Studio.create({
            name: 'A1',
            address: { city: 'nyc', state: 'new york', country: 'usa' }
        });

        return request(app)
            .get('/api/v1/studios')
            .then(res => {
                const studioJSON = JSON.parse(JSON.stringify(studio));
                expect(res.body).toEqual([studioJSON]);
            });
    });
});








//     // POST /api/v1/dogs to create a dog
//     it('POST route creates a dog in the database', async() => {

//         const owner = await Person.create({
//             name: 'DogLady 123',
//             email: 'ownerlady@gmail.com'
//         });

//         return request(app)
//             .post('/api/v1/dogs')
//             .send({ 
//                 name: 'pupperooni',
//                 age: 12,
//                 weight: '200lbs',
//                 owner: owner._id
//             })
//             .then(res => {
//                 expect(res.body).toEqual({
//                     _id: expect.any(String),
//                     name: 'pupperooni',
//                     age: 12,
//                     weight: '200lbs',
//                     owner: owner._id.toString(), 
//                     __v: 0
//                 });
//             });
//     });  
      
      
//     // GET /api/v1/dogs to get all dogs
//     it('GET returns all dogs', async() => {

//         const owner = await Person.create({
//             name: 'DogLady 123',
//             email: 'ownerlady@gmail.com'
//         });

//         const dog = await Dog.create({
//             name: 'pupperooni',
//             age: 12,
//             weight: '200lbs',
//             owner: owner._id.toString(), 
//         });

//         return request(app)
//             .get('/api/v1/dogs')
//             .then(res => {
//                 const dogJSON = JSON.parse(JSON.stringify(dog));
//                 expect(res.body).toEqual([dogJSON]);
//             });
//     });


//     // GET /api/v1/dogs/:id to get a dog by id
//     it('GET /:id returns a dog by id', async() => {

//         const owner = await Person.create({
//             name: 'DogLady 123',
//             email: 'ownerlady@gmail.com'
//         });

//         const dog = await Dog.create({
//             name: 'pupperooni',
//             age: 12,
//             weight: '200lbs',
//             owner: owner, 
//         });

//         return request(app)
//             .get(`/api/v1/dogs/${dog._id}`)
//             .then(res => {
//                 const dogJSON = JSON.parse(JSON.stringify(dog));
//                 expect(res.body).toEqual(dogJSON);
//             });
//     });

//     //PATCH /api/v1/:id
//     it('PATCH dogs/:id updates a single value on a dog by id', async() => {

//         const owner = await Person.create({
//             name: 'DogLady 123',
//             email: 'ownerlady@gmail.com'
//         });

//         const dog = await Dog.create({
//             name: 'pupperooni',
//             age: 12,
//             weight: '200lbs',
//             owner: owner._id.toString(), 
//         });

//         const newDog = {
//             name: 'NEW pupperoni',
//             age: 12,
//             weight: '200lbs',
//             owner: owner._id.toString(), 
//         };

//         return request(app)
//             .patch(`/api/v1/dogs/${dog._id}`)
//             .send(newDog)
//             .then(res => {
//                 expect(res.body).toEqual({
//                     _id: expect.any(String),
//                     name: 'NEW pupperoni',
//                     age: 12,
//                     weight: '200lbs',
//                     owner: owner._id.toString(), 
//                     __v: 0
//                 });
//             });
//     });

//     // PUT /api/v1/dogs/:id to update a dog
//     it('PUT dogs/:id updates a dog by id', async() => {

//         const owner = await Person.create({
//             name: 'DogLady 123',
//             email: 'ownerlady@gmail.com'
//         });

//         const dog = await Dog.create({
//             name: 'pupperooni',
//             age: 12,
//             weight: '200lbs',
//             owner: owner._id.toString(), 
//         });

//         return request(app)
//             .put(`/api/v1/dogs/${dog._id}`)
//             .send({ 
//                 name: 'A New Dog', 
//                 age: 3,
//                 weight: '150lbs',
//                 owner: owner._id.toString(), 
//             })
//             .then(res => {
//                 expect(res.body).toEqual({ 
//                     _id: expect.any(String),
//                     name: 'A New Dog', 
//                     age: 3,
//                     weight: '150lbs',
//                     owner: owner._id.toString(), 
//                     __v: 0 });
//             });
//     });

//     // DELETE /api/v1/dogs/:id to delete a dog
//     it('DELETEs a dog by its id', async() => {

//         const owner = await Person.create({
//             name: 'DogLady 123',
//             email: 'ownerlady@gmail.com'
//         });

//         const dog = await Dog.create({
//             name: 'pupperooni',
//             age: 12,
//             weight: '200lbs',
//             owner: owner._id.toString(), 
//         });

//         return request(app)
//             .delete(`/api/v1/dogs/${dog._id}`)
//             .then(res => {
//                 expect(res.body).toEqual({ 
//                     _id: expect.any(String),
//                     name: 'pupperooni',
//                     age: 12,
//                     weight: '200lbs',
//                     owner: owner._id.toString(), 
//                     __v: 0 });
//             });
//     });
// });
// //------------------------------------------------------------------------------------------------------------

// describe('person routes', () => {
//     beforeAll(() => {
//         connect();
//     });

//     beforeEach(() => {
//         return mongoose.connection.dropDatabase();
//     });

//     afterAll(() => {
//         return mongoose.connection.close();
//     });

//     // POST /api/v1/dogs to create a dog
//     it('POST route creates a person in the database', () => {

//         return request(app)
//             .post('/api/v1/people')
//             .send({ 
//                 name: 'Madamme ladydogowner ESQ',
//                 email: 'things@stuff.com'
//             })
//             .then(res => {
//                 expect(res.body).toEqual({
//                     _id: expect.any(String),
//                     name: 'Madamme ladydogowner ESQ',
//                     email: 'things@stuff.com', 
//                     __v: 0
//                 });
//             });
//     });  


//     // GET /api/v1/people to get all people
//     it('GET returns all people', async() => {

//         const person = await Person.create({
//             name: 'Madamme ladydogowner ESQ',
//             email: 'things@stuff.com'
//         });

//         return request(app)
//             .get('/api/v1/people')
//             .then(res => {
//                 const personJSON = JSON.parse(JSON.stringify(person));
//                 expect(res.body).toEqual([personJSON]);
//             });
//     });


//     // GET /api/v1/people/:id to get a person by id
//     it('GET /:id returns a person by id', async() => {

//         const person = await Person.create({
//             name: 'Madamme ladydogowner ESQ',
//             email: 'things@stuff.com'
//         });

//         return request(app)
//             .get(`/api/v1/people/${person._id}`)
//             .then(res => {
//                 const personJSON = JSON.parse(JSON.stringify(person));
//                 expect(res.body).toEqual(personJSON);
//             });
//     });

//     //PATCH /api/v1/:id
//     it('PATCH people/:id updates a single value on a person by id', async() => {

//         const person = await Person.create({
//             name: 'Madamme ladydogowner ESQ',
//             email: 'things@stuff.com'
//         });

//         const newPerson = {
//             name: 'Sir Pupper Owner II',
//             email: 'things@stuff.com'
//         };

//         return request(app)
//             .patch(`/api/v1/people/${person._id}`)
//             .send(newPerson)
//             .then(res => {
//                 expect(res.body).toEqual({
//                     _id: expect.any(String),
//                     name: 'Sir Pupper Owner II',
//                     email: 'things@stuff.com',
//                     __v: 0
//                 });
//             });
//     });

//     // PUT /api/v1/people/:id to update a person
//     it('PUT people/:id updates a person by id', async() => {

//         const person = await Person.create({
//             name: 'Madamme ladydogowner ESQ',
//             email: 'things@stuff.com'
//         });

//         return request(app)
//             .put(`/api/v1/people/${person._id}`)
//             .send({ 
//                 name: 'A New person', 
//                 email: 'SOMETHING_DIFFERENT@gmail.org' })
//             .then(res => {
//                 expect(res.body).toEqual({ 
//                     _id: expect.any(String),
//                     name: 'A New person',
//                     city: null,
//                     state: null,
//                     profileImage: null, 
//                     email: 'SOMETHING_DIFFERENT@gmail.org', 
//                     __v: 0 });
//             });
//     });

//     // DELETE /api/v1/people/:id to delete a person
//     it('DELETEs a person by its id', async() => {

//         const person = await Person.create({
//             name: 'Goodguy Dogfellow', 
//             email: 'mandog@sneakerton.co'
//         });

//         return request(app)
//             .delete(`/api/v1/people/${person._id}`)
//             .then(res => {
//                 expect(res.body).toEqual({ 
//                     _id: expect.any(String),
//                     name: 'Goodguy Dogfellow', 
//                     email: 'mandog@sneakerton.co', 
//                     __v: 0 });
//             });
//     });
// });