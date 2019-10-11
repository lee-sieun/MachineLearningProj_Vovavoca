//N_gram 을 이용한 K_VOCA_CLUSTERING
const levenshtein = require('fast-levenshtein');

    function KVC(input, dataset, k) {
        let sim_set = []
        let output = new Array()
        for (i in dataset) {
            sim_set.push({voca: dataset[i], sim: levenshtein.get(input, dataset[i])})
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

KVC("arab", ["ahrab", "arrab", "aaab"], 2)
