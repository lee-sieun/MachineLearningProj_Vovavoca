const express = require('express');
const router = express.Router();
const fs = require('fs');
const CSAT = require('../models/CSAT');
const leven = require('fast-levenshtein');



var meanArr= new Array();
var wordArr= new Array();

var strstr= new Array();

Ngram = {};

Ngram.KVC = function (input, dataset, k) {
    let sim_set = []
    let output = new Array()
    for (i in dataset) {
        sim_set.push({ voca : dataset[i], sim: Ngram.similarity(input, dataset[i])})
    }
    sim_set.sort((a, b) => a.sim < b.sim ? 1 : a.sim > b.sim ? -1 : 0)
    for (let i = 0; i < k; i++) {
        output.push(sim_set[i].voca)
    }
    return output
}

Ngram.split =  function (str) {
    let set = new Array()

    set.push(str[0])
    for (let i = 0; i < str.length - 1; i++) {
        set.push(str[i] + str[i + 1])
    }
    set.push(str[str.length - 1])

    return set;
}

Ngram.similarity = function (str1, str2) {
    let set1 = Ngram.split(str1)
    let set2 = Ngram.split(str2)

    let n = 0;

    for (i in set1) {
        for (j in set2) {
            if (set1[i] == set2[j]) {
                n++;
            }
        }
    }

    let sim = n / (set1.length + set2.length - n)
    if(sim==1)
        sim=0
    return sim;
}

shingle ={}

shingle.KVC = function(input, dataset, k) {
    let sim_set = []
    let output = new Array()
    for (i in dataset) {
        sim_set.push({voca: dataset[i], sim: similarity(input, dataset[i])})
    }
    sim_set.sort((a, b) => a.sim < b.sim ? 1 : a.sim > b.sim ? -1 : 0)
    console.log(sim_set)
    for (let i = 0; i < k; i++) {
        output.push(sim_set[i].voca)
    }
    return
}

shingle.similarity = function (str1, str2) {
    let set1 = split(str1)
    let set2 = split(str2)

    let n = 0;

    for (i in set1) {
        for (j in set2) {
            if (set1[i] == set2[j]) {
                n++;
            }
        }
    }

    let sim = n / (set1.length + set2.length - n)

    return sim;
}

shingle.split = function(str) {
    let set = new Array()

    for (let i = 0; i < str.length - 1; i++) {
        set.push(str[i] + str[i + 1])
    }

    return set;
}

levenshtein = {}

levenshtein.KVC =function(input, dataset, k) {
    let sim_set = []
    let output = new Array()
    for (i in dataset) {
        sim_set.push({voca: dataset[i], sim: leven.get(input, dataset[i])})
    }
    console.log(sim_set)
    sim_set.sort((a, b) => a.sim < b.sim ? 1 : a.sim > b.sim ? -1 : 0)
    console.log(sim_set)
    for (let i = 0; i < k; i++) {
        output.push(sim_set[i].voca)
    }
    console.log(output)
    return
}

// Main Page
router.get('/', (req, res) => {
    res.render('../views/home.html')
});

router.post('/clustering',(req,res, err) => {
    let input = req.body.input
    let voca = []
    console.log(input)
    CSAT.find().select('voca -_id')
        .then(vocaset =>{
            for(i in vocaset) {
                voca.push(vocaset[i].voca)
            }
            let output = Ngram.KVC(input,voca,4)
            console.log(output)

            res.render('../views/home.html',{input : input ,output : output});
        })
})

// 주소창에 localhost:5000/setdataset 이라고 치면 데이터 자동으로 들어감
router.get('/setdataset', (req, res) => {
    fs.readFile('dataset/dataset_2.txt','utf-8', function(err, data){
        str=data.split('\n');

        for(var i =0; i< str.length; i++){
            strstr.push(str[i].split('\t'));
            wordArr.push(strstr[i][0]);
            meanArr.push(strstr[i][1]);
        }
        for(let i=0; i< wordArr.length; i++){
            let newVoca = new CSAT({ voca :wordArr[i], meaning :meanArr[i]});
            newVoca.save()
                .then(result => {
                })
                .catch(err =>{ throw err});
        }
    });
});


module.exports = router;
