const request = require("supertest");
const app = require("../app");
const { sequelize, Movie, User } = require("../models");

let token;
let movies;

beforeAll(async () => {
  try {
    // create user & get token
    const user = await User.create({
      email: "testmovies@mail.com",
      password: "rahasiajuga",
      name: 'Test Movies',
      username: 'testmoviesuser',
      phoneNumber: '08111119',
    });

    token = user.generateToken();

    movies = await Movie.bulkCreate([
      { title: "Movie 1", synopsis: "Synopsis Movie 1", trailerUrl: "Trailer Movie 1", imgUrl: "Image Movie 1", rating: 5, status: "active" },
      { title: "Movie 2", synopsis: "Synopsis Movie 2", trailerUrl: "Trailer Movie 2", imgUrl: "Image Movie 2", rating: 5, status: "active" },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
    await Movie.destroy({ truncate: true });
    await User.destroy({ truncate: true, cascade: true });
    await sequelize.close();
});

describe("EndPoint /api/v1/movies", () => {
  it("Should be able to get all movies", async () => {
    const response = await request(app)
      .get("/api/v1/movies")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("Should be able to get single movie by id", async () => {
    const response = await request(app)
      .get(`/api/v1/movies/${movies[0].id}`)
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });
      
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.title).toBeDefined();
      expect(response.body.synopsis).toBeDefined();
      expect(response.body.trailerUrl).toBeDefined();
      expect(response.body.imgUrl).toBeDefined();
      expect(response.body.rating).toBeDefined();
      expect(response.body.status).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });
});