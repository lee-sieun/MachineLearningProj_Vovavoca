const express = require('express');
const router = express.Router();



// Main Page
router.get('/', (req, res) => {
    res.send(true)
});

router.get('/setdataset', (req, res) => {

});


module.exports = router;
