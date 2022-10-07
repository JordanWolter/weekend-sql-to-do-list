//const { notDeepStrictEqual } = require('assert');
const express = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool');

taskRouter.get('/', (req, res) => {

    let sqlText = `SELECT * 
                    FROM "tasks" 
                    ORDER BY "id";`;

    pool.query(sqlText)
        .then((dbRes) => {

            res.send(dbRes.rows);

        }).catch((err) => {
            console.log('error in GET', err);

            res.sendStatus(500);
        });
});

taskRouter.post('/', (req, res) => {
    console.log(req.body);

    const sqlText = `
    INSERT INTO "tasks"
        ("task", "notes", "complete")
    VALUES
        ($1, $2, $3);`;

    const sqlParams = [
        req.body.task,
        req.body.notes,
        req.body.complete
    ];

    console.log('sqlParams', sqlParams);

    pool.query(sqlText, sqlParams)
        .then(dbRes => {

            res.sendStatus(201);

        }).catch((err) => {
            console.log('error in POST', err);

            res.sendStatus(500);

        });
});

taskRouter.put('/:id', (req, res) => {
    console.log('in PUT', req.params.id);

    const taskId = req.params.id;

    const completed = req.body.complete;

    let sqlText = ``;

    sqlText = `UPDATE "tasks"
                SET "complete" = TRUE
                WHERE "id" = $1;`;
    
    const sqlParams = [taskId];

    pool.query(sqlText, sqlParams)
    .then((dbRes) => {

        res.sendStatus(201);

    }).catch((err) => {
        console.log('error in PUT', err);

        res.sendStatus(500);

    });

});

taskRouter.delete('/:id', (req, res) => {
    console.log('delete', req.params.id);

    const taskId = req.params.id;

    const sqlText = `DELETE FROM
                        "tasks"
                        WHERE "id" = $1;`;
    const sqlParams = [taskId];

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {

            res.sendStatus(201);

        }).catch((err) => {
            console.log('error in DELETE', err);

            res.sendStatus(500);

        });
});

module.exports = taskRouter;