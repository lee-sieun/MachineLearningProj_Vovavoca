const express = require('express');
const router = express.Router();
const algorithm = require('../src/Ngram');


// Main Page
router.get('/', (req, res) => {
    res.send(true)
});

const al = algorithm();
al.KVC("arab", ["ahrab", "arrab", "aaab"], 2)

router.get('/setdataset', (req, res) => {

});


module.exports = router;
