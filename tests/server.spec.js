const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it( 'GET /cafes', async () => {
        const response = await request(server)
            .get('/cafes');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });
    
    it( 'DELETE /cafes/:id', async () => {
        const token = 'token';
        const id = 100;
        const response = await request(server)
            .delete(`/cafes/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
    });

    it( 'POST /cafes', async () => {
        const cafe = { id: 5, nombre: 'Espresso' };
        const response = await request(server)
            .post(`/cafes`)
            .send(cafe);

        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(cafe);
    });

    it( 'PUT /cafes/:id', async () => {
        const cafe = { id: 5, nombre: 'Espresso' };
        const differentId = 4;

        const response = await request(server)
            .put(`/cafes/${differentId}`)
            .send(cafe);

        expect(response.statusCode).toBe(400);
    });
});
