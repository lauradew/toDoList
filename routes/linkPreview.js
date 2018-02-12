"use strict";

const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

// require a link as param when JSON results show up
module.exports = () => {

  router.get('/', (req, res) => {
<<<<<<< HEAD
    $.ajax({
      method: "GET",
      url: ' http://api.linkpreview.net/?key=5a80e0e23ce911c724d8cda8d11859b1e2e63abdaeaea&q=http://www.imdb.com/title/tt0120737/'
    }).done((meta) => {
      res.send(meta);
  
    });

=======
    fetch('http://api.linkpreview.net/?key=5a80e0e23ce911c724d8cda8d11859b1e2e63abdaeaea&q=http://www.imdb.com/title/tt0120737/')
      .then((result) => {
        res.send(result);
      });
    
>>>>>>> 89fc51d639528d6e731fe245eeda1534be4e0d19
  });
  
  return router;
};
