var Metaphone_ = require('metaphone')

metaphone = {};

metaphone.SVC = async function (input, dataset, k){
    let code1 = Metaphone_(input);
    let output = new Array();
    let sim_set = [];
    let result = new Array()

    for(i in dataset){
        if(input == dataset[i]){
            continue;
        }
        let code2 = Metaphone_(dataset[i])

        sim_set.push({ voca : dataset[i], sim: metaphone.similarity(code1, code2)})
    }
    sim_set.sort((a, b) => a.sim < b.sim ? 1 : a.sim > b.sim ? -1 : 0)

    for (let i = 0; i < k; i++) {
        output.push(sim_set[i].voca)
        result.push(sim_set[i])
    }
    console.log(result)
    return output
}

metaphone.similarity = function (code1 , code2){
    console.log(code1,code2)
    let sim = 0
    if(code1 == code2){
        sim += 1
    }
    return sim
}

metaphone.SVC("meet",
    ["mode", "ewnkjwe","mood", "wnjkfewa","mate","fwean","meadow","fewkln","myth","faweae","mate","mounth"],
    3)
//
//
// soundex.SVC("pineapple",
//     ["ahrab", "arrab", "apple","asynarab","href","rabbit",],
//     3)
// soundex.SVC("pect", ["ahrab", "arrab","fact","fect" ,"effect","bear", "apple","asynarab","href","rabbit",], 3)

module.exports = metaphone;
