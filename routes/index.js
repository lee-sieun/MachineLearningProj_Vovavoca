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
    console.log(input)
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

router.post('/testing',(req,res, err) => {
    let input = []
    let output = []
    let voca = []
    let n=0;
    let NgramScore =0;
    let HybridScore =0;
    VOCA.find().select('voca -_id')
        .then(vocaset =>{
            for(i in vocaset) {
                voca.push(vocaset[i].voca)
            }
            for(i in input) {
                n++;
                let outNgram = Ngram.SVC(input[i], voca, 5)
                let outHybrid = hybird.SVC(input[i], voca, 5)
                console.log(input[i],output[i]);
                for(j in outNgram){
                    if(outNgram[j]==out[i]){
                        NgramScore++;
                        break;
                        console.log(' O');
                    }
                    if(j==outNgram.length-1){
                        console.log(' X');
                    }
                }
                for(j in outHybrid){
                    if(outHybrid[j]==out[i]){
                        hybirdScore++;
                        break;
                        console.log(' O');
                    }
                    if(j==outHybrid.length-1){
                        console.log(' X');
                    }
                }
            }
            console.log("NgramScore",NgramScore/n)
            console.log("HybridScore",HybridScore/n)
        })
})

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
            metaphone.SVC(input,voca)
            // console.log("outNgram",outNgram)
            // console.log("outSoundex",outSoundex)
            // console.log("outHybrid",outHybrid)
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
