const express = require('express');
const router = express.Router();
const algorithm = require('../src/Ngram');


var fs = require('fs');


var meanArr= new Array();
var wordArr= new Array();

fs.readFile('dataset_2.txt','utf-8', function(err, data){
    var str=data.split('\t');
    console.log(str.length);

    for(var i=0; i<str.length; i++){
        wordArr[i]= str[i];
        console.log(wordArr[i++]);
        meanArr[i]= str[i];
        console.log(meanArr[i]);
    }
});



// Main Page
router.get('/', (req, res) => {
    res.send(true)
});

const al = algorithm();
al.KVC("arab", ["ahrab", "arrab", "aaab"], 2)

router.get('/setdataset', (req, res) => {

});


module.exports = router;
