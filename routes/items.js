"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex('items')
      .select('category', 'description', 'user_id')
      .where('user_id', req.session.id)
      .then((results) => {
        res.json(results);
      });
  });
  return router;
};
