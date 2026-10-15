
const express = require("express");

/**
 * Creates an Express application with independent average state.
 *
 * @returns {import("express").Express} Configured Express application.
 */
function createApp() {
    const app = express();
    app.use(express.json());

    let total = 0;
    let count = 0;

    /**
     * Adds a number to the running average.
     *
     * @route POST /average
     * @param {number} req.body.number - Finite number to submit.
     * @returns {{number: number, count: number, average: number}}
     */
    app.post("/average", (req, res) => {
        const { number } = req.body ?? {};

        if (typeof number !== "number" || !Number.isFinite(number)) {
            return res.status(400).json({
                error: 'Please provide a valid numeric "number" field.'
            });
        }

        total += number;
        count += 1;

        return res.status(200).json({
            number,
            count,
            average: total / count
        });
    });
    
    // Handle malformed JSON with a clean client-facing error.
    app.use((err, req, res, next) => {
        if (
            err instanceof SyntaxError &&
            err.status === 400 &&
            err.type === "entity.parse.failed"
        ) {
            return res.status(400).json({
                error: "Request body must be valid JSON."
            });
        }

        return res.status(500).json({
            error: "Internal server error."
        });
    });


    return app;
}

module.exports = { createApp };
