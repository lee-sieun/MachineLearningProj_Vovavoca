const express = require('express');
const router = express.Router();
const fs = require('fs');
const VOCA = require('../models/VOCA');
let Ngram = require('../src/Ngram');
let hybird = require('../src/hybrid');
let levenshtein = require('../src/levenshtein');
let shingle = require('../src/shingle');
let soundex = require('../src/soundex');
let metadex = require('../src/metadex');
let metaphone = require('../src/metaphone');



// var meanArr= new Array();
// var wordArr= new Array();
// var strstr= new Array();

// Main Page
router.get('/', (req, res) => {
    res.render('../views/index.html');
});
router.get('/home', (req, res) => {
    res.render('../views/home.html');
});

router.get('/search', (req, res) => {
    res.render('../views/search.html',{input : "" ,Ngram : "", hybrid : "", soundex : "", metadex : ""});
});

router.get('/question', (req, res) => {
    res.render('../views/question.html');
});

router.post('/clustering',(req,res, err) => {
    let input = req.body.input
    let voca = []
    VOCA.find().select('voca -_id')
        .then(vocaset =>{
            for(i in vocaset) {
                voca.push(vocaset[i].voca)
            }
            let outNgram = Ngram.SVC(input,voca,20)
            let outSoundex = soundex.SVC(input,voca)
            let outMetadex = metadex.SVC(input, voca)
            let outHybrid = hybird.SVC(input,voca,20)
            metaphone.SVC(input,voca)
            // console.log("outNgram",outNgram)
            // console.log("outSoundex",outSoundex)
            // console.log("outHybrid",outHybrid)
            res.render('../views/search.html',{input : input ,Ngram : outNgram, hybrid : outHybrid, soundex : outSoundex, metadex : outMetadex });
        })
})

// 주소창에 localhost:5000/setdataset 이라고 치면 데이터 자동으로 들어감
router.get('/setdataset', (req, res) => {
    fs.readFile('dataset/dataset_3.txt','utf-8', function(err, data){
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
