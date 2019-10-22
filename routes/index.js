const express = require('express');
const router = express.Router();
const fs = require('fs');
const VOCA = require('../models/VOCA');
let Ngram = require('../src/Ngram');
let hybird = require('../src/hybrid');
let levenshtein = require('../src/levenshtein');
let soundex = require('../src/soundex');
let metadex = require('../src/metadex');
let metaphone = require('../src/metaphone');



var meanArr= new Array();
var wordArr= new Array();
var strstr= new Array();

// Main Page
router.get('/', (req, res) => {
    res.render('../views/index.html');
});
router.get('/about', (req, res) => {
    res.render('../views/about.html');
});

router.get('/search', (req, res) => {
    res.render('../views/search.html',{input : "" ,Ngram : "", hybrid : "", soundex : "", metadex : ""});
});

router.get('/question', (req, res) => {
    res.render('../views/question.html');
});

router.post('/setquestion', (req, res) => {
    let input = req.body.input
    let voca = []
    VOCA.find().select('voca -_id')
        .then(vocaset =>{
            for(i in vocaset) {
                voca.push(vocaset[i].voca)
            }
            let outHybrid = hybird.SVC(input,voca,4)
            res.send(outHybrid);
        })
});


router.post('/clustering',(req,res, err) => {
    let input = req.body.input
    let voca = []
    VOCA.find().select('voca -_id')
        .then(vocaset =>{
            for(i in vocaset) {
                voca.push(vocaset[i].voca)
            }
            let outNgram = Ngram.SVC(input,voca,10)
            let outSoundex = soundex.SVC(input,voca)
            let outMetadex = metadex.SVC(input, voca)
            let outHybrid = hybird.SVC(input,voca,10)
            res.render('../views/search.html',{input : input ,Ngram : outNgram, hybrid : outHybrid, soundex : outSoundex, metadex : outMetadex });
        })
})

// 주소창에 localhost:5000/setdataset 이라고 치면 데이터 자동으로 들어감
router.get('/setdataset', (req, res) => {
    fs.readFile('dataset/dataset_5.txt','utf-8', function(err, data){
        str=data.split('\n');

        for(var i =0; i< str.length; i++){
            strstr.push(str[i].split('\t'));
            wordArr.push(strstr[i][0]);
            meanArr.push(strstr[i][1]);
        }
        for(let i=0; i< wordArr.length; i++){
            let newVoca = new VOCA({ voca :wordArr[i], meaning :meanArr[i]});
            newVoca.save()
                .then(result => {
                })
                .catch(err =>{ throw err});
        }
    });
});


module.exports = router;
