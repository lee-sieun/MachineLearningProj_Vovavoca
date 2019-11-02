const leven = require('fast-levenshtein');

levenshtein = {}

levenshtein.SVC =function(input, dataset, k) {
    console.log("Input: "+ input)
        let sim_set = []
        let output = new Array()
        for (i in dataset) {
            sim_set.push({voca: dataset[i], sim: leven.get(input, dataset[i])})
        }

        sim_set.sort((a, b) => a.sim > b.sim ? 1 : a.sim < b.sim ? -1 : 0)

        for (let i = 0; i < k; i++) {
            output.push(sim_set[i].voca)
        }
        console.log("Similar "+ k+ " Words : ")
        console.log(output)
        return
    }



    levenshtein.SVC("arab", ["ahrab", "arrab", "apple","asynarab","href","rabbit",], 3)

module.exports = levenshtein;
