var Soundex_ = require('soundex-encode')

soundex = {};

soundex.KVC = function (input, dataset, k){
    let code1 = Soundex_(input);
    let output = new Array();
    let sim_set = [];

    for(i in dataset){
        if(input == dataset[i]){
            continue;
        }
        let code2 = Soundex_(dataset[i])
        sim_set.push({ voca : dataset[i], sim: soundex.similarity(code1, code2)})
    }
    sim_set.sort((a, b) => a.sim > b.sim ? 1 : a.sim < b.sim ? -1 : 0)
    console.log(sim_set)
    for (let i = 0; i < k; i++) {
        output.push(sim_set[i].voca)
    }
    console.log(output)
    return output
}

soundex.similarity = function (code1 , code2){
    code1 = code1.substring(1,3);
    code2 = code2.substring(1,3);
    let sim = code1-code2
    console.log(code1,code2)
    console.log(sim)
    return sim
}

soundex.KVC("arab", ["ahrab", "arrab", "aaab","asvwefe"], 2)
