var Soundex_ = require('soundex-encode')
var async = require('async');

Hybrid = {};
Hybrid.SVC = function (input, dataset, k) {
    let sim_set = []
    let output = new Array()
    let code1 = Soundex_(input);
    let sim = 0
    let result = new Array()

    for (i in dataset) {
        if(input == dataset[i]){
            continue;
        }
        let code2 = Soundex_(dataset[i])

        sim_set.push({ voca : dataset[i], sim: Hybrid.similarity(input, dataset[i],code1,code2)});
    }
    sim_set.sort((a, b) => a.sim < b.sim ? 1 : a.sim > b.sim ? -1 : 0)

    for (let i = 0; i < k; i++) {
        output.push(sim_set[i].voca)
        result.push(sim_set[i])
    }

    console.log(result)
    return output
}

Hybrid.split =  function (str,status) {
    let set = new Array()
    if(status==0){
        set.push(0)
        for (let i = 0; i < str.length - 1; i++) {
            set.push(str[i] + str[i + 1])
        }
        set.push(str[str.length-1])
        return set
    }
    if(status==1){
        set.push(0)
        set.push(str[str.length-1])
    }
    for (let i = 0; i < str.length - 1; i++) {
        set.push(str[i] + str[i + 1])
    }

    // console.log(set)
    return set;
}
// Hybrid.split =  function (str) {
//     let set = new Array()
//
//     set.push(str[0])
//     if(str.length<3)
//         return set
//     else {
//         set.push(str[0]+str[1])
//         for (let i = 0; i < str.length - 2; i++) {
//             set.push(str[i] + str[i + 1]+str[i+2])
//         }
//         set.push(str[str.length - 1]+str[str.length - 2])
//         // console.log(set)
//         return set;
//     }
// }

Hybrid.similarity = function (str1, str2, code1, code2) {
    let status

    if(str1.length<4){
        status=0
    }else if(str1.length==4){
        status=1
    }else {
        status=2
    }

    let set1 = Hybrid.split(str1,status)
    if(str2.length-str1.length>1){
        status=2
    }

    let set2 = Hybrid.split(str2,status)
    let sim = 0
    let n = 0;


    for (i in set1) {
        for (j in set2) {
            if (set1[i] == set2[j]) {
                n++;
            }
        }
    }

    sim += n / (set1.length + set2.length - n)

    if(code1==code2){
        sim *=1.5
        sim+=0.2
        if(str1.length<4){
            sim+=0.4
        }else if(str1.length==4){
            sim+=0.3
        }
    }

    return sim;
}

// console.log(Hybrid.SVC("bare", ["ahrab", "arrab","fact","fect" ,"effect","bear", "apple","asynarab","href","rabbit",], 3))

module.exports = Hybrid;
