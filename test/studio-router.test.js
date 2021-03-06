require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

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


    it('POST / route', () => {

        return request(app)
            .post('/api/v1/studios')
            .send({ 
                name: 'bad pickle',
                address: { city: 'boston', state: 'new york', country: 'usa' }
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'bad pickle',
                    address: { city: 'boston', state: 'new york', country: 'usa' }, 
                    __v: 0
                });
            });
    });  


    it('GET / gets all studios', async() => {

        const studio1 = await Studio.create({
            name: 'A1',
            address: { city: 'nyc', state: 'new york', country: 'usa' }
        });
        const studio2 = await Studio.create({
            name: 'lionsgate',
            address: { city: 'montreal', state: 'somewhere', country: 'canada' }
        });

        return request(app)
            .get('/api/v1/studios')
            .then(res => {
                expect(res.body).toEqual([
                    { _id: studio1._id.toString(), name: studio1.name },
                    { _id: studio2._id.toString(), name: studio2.name }
                ]);
            });
    });


    it('GET /:id route', async() => {

        const studio = await Studio.create({
            name: 'A1',
            address: { city: 'nyc', state: 'new york', country: 'usa' }
        });

        const film = await Film.create({
            title: 'Midsommar',
            studio: studio._id,
            released: 2019,
            cast: []
        });

        return request(app)
            .get(`/api/v1/studios/${studio._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: studio._id.toString(),
                    name: studio.name,
                    address: studio.address, 
                    films: [{ 
                        _id: film._id.toString(),
                        title: film.title
                    }]
                });
            });
    });


    it('PUT studios/:id route', async() => {

        const studio = await Studio.create({
            name: 'A1',
            address: { city: 'nyc', state: 'new york', country: 'usa' }
        });

        return request(app)
            .put(`/api/v1/studios/${studio._id}`)
            .send({ 
                name: 'Lionsgate',
                address: { city: 'boston', state: 'new york', country: 'usa' }
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'Lionsgate',
                    address: { city: 'boston', state: 'new york', country: 'usa' },
                    __v: 0 });
            });
    });


    it('deletes if there is NO film', async() => {

        const studio = await Studio.create({
            name: 'A1',
            address: { city: 'nyc', state: 'new york', country: 'usa' }
        });

        return request(app)
            .delete(`/api/v1/studios/${studio._id}`)
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'A1',
                    address: { city: 'nyc', state: 'new york', country: 'usa' }, 
                    __v: 0 });
            });
    });

    
    it('does NOT delete if there IS a film', async() => {

        const studio = await Studio.create({
            name: 'A1',
            address: { city: 'nyc', state: 'new york', country: 'usa' }
        });

        await Film.create({
            title: 'Midsommar',
            studio: studio._id,
            released: 2019,
            cast: []
        });

        return request(app)
            .delete(`/api/v1/studios/${studio._id}`)
            .then(res => {
                expect(res.body).toEqual({ error: 'nope' });
            });
    });
});
