import conectaNaDatabase, { disconnectTestDB } from "../src/config/dbConnect.js";

beforeAll(async () => {
    await conectaNaDatabase();
});

afterAll(async () => {
    await disconnectTestDB();
});
