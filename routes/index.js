const express = require('express');
const router = express.Router();
const algorithm = require('../src/Ngram');
const fs = require('fs');


var meanArr= new Array();
var wordArr= new Array();

var strstr= new Array();



fs.readFile('../dataset/dataset_2.txt','utf-8', function(err, data){

    var replaceData=data.replace(/\r/g, '');
    var str=replaceData.split('\n');

    for(var i =0; i< str.length; i++){
        strstr.push(str[i].split('\t'));
        wordArr.push(strstr[i][0]);
        meanArr.push(strstr[i][1]);
        //console.log(strstr[i]);
    }

    console.log(wordArr)
    console.log(meanArr)
});



// Main Page
router.get('/', (req, res) => {
    res.send(true)
});


router.get('/setdataset', (req, res) => {
    fs.readFile('dataset_2.txt','utf-8', function(err, data){
        str=data.split('\n');

        for(var i =0; i< str.length; i++){
            strstr.push(str[i].split('\t'));
            wordArr.push(strstr[i][0]);
            meanArr.push(strstr[i][1]);
            //console.log(strstr[i]);
        }
    });
});


module.exports = router;
