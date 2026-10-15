
const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");

/**
 * Checks the average returned for the first request.
 */
test("first number becomes the initial average", async () => {
    const app = createApp();

    const response = await request(app)
        .post("/average")
        .send({ number: 10 });

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
        number: 10,
        count: 1,
        average: 10
    });
});

/**
 * Checks that multiple requests update the running average.
 */
test("calculates the average across requests", async () => {
    const app = createApp();

    await request(app).post("/average").send({ number: 10 });

    const response = await request(app)
        .post("/average")
        .send({ number: 20 });

    assert.equal(response.status, 200);
    assert.equal(response.body.count, 2);
    assert.equal(response.body.average, 15);
});

/**
 * Checks that missing or non-numeric input is rejected.
 */
test("rejects invalid input", async () => {
    const app = createApp();

    const missing = await request(app)
        .post("/average")
        .send({});

    const stringValue = await request(app)
        .post("/average")
        .send({ number: "10" });

    assert.equal(missing.status, 400);
    assert.equal(stringValue.status, 400);
});

test("accepts zero and negative numbers", async () => {
    const app = createApp();

    await request(app).post("/average").send({ number: 0 });

    const response = await request(app)
        .post("/average")
        .send({ number: -10 });

    assert.equal(response.status, 200);
    assert.equal(response.body.count, 2);
    assert.equal(response.body.average, -5);
});

test("rejects malformed JSON", async () => {
    const app = createApp();

    const response = await request(app)
        .post("/average")
        .set("Content-Type", "application/json")
        .send('{"number":');

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Request body must be valid JSON.");
});
