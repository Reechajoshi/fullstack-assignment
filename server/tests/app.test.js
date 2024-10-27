
const supertest = require('supertest');
const request = supertest('http://localhost:3001')

describe('GET REQUESTS', () =>{
    it('GET /', async () => {
        const response = await request.get('/')
        // 200 OK
        expect(response.status).toBe(200)
        expect(response.text).toBe("Welcome to Backend")
    })
})

describe('GET CONSUMPTION', () => {
    it('GET /consumption/:location/:year - Should return No fruits in response', async () => {
        const location = 'Amsterdam';
        const year = '2024';
        const response = await request.get(`/consumption/${location}/${year}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({body: null, message: "No fruits found"})
    })

    it('GET /consumption/:location/:year - Should return Array of fruits', async () => {
        const location = 'Berlin';
        const year = '2024';
        const response = await request.get(`/consumption/${location}/${year}`)
        expect(response.status).toBe(200)
        expect(response.body.body.length).toEqual(2)
        expect(response.body.body[0]).toHaveProperty("name")
        expect(response.body.body[0]).toHaveProperty("year")
        expect(response.body.body[0]).toHaveProperty("amount")
    })
})

describe('POST purchase', () => {
    it('POST /purchase - Should return Number of calories exceeded for fruits Pear, Kiwi, Pineapple, Plum, Mango', async () => {

    })

    it('POST /purchase - Should Add the fruits to the ledger for fruits Pear, Kiwi', async () => {

    })
})


