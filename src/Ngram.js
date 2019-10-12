//N_gram 을 이용한 K_VOCA_CLUSTERING

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
    console.log(set1)
    console.log(set2)

    let sim = n / (set1.length + set2.length - n)
    console.log(sim)
    return sim;
}

// Ngram.KVC("arab", ["ahrab", "arrab", "aaab"], 2);
module.exports - Ngram;
