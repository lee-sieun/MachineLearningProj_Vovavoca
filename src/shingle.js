//N_gram 을 이용한 K_VOCA_CLUSTERING
shingle ={}

shingle.SVC = function(input, dataset, k) {
        let sim_set = []
        let output = new Array()
        for (i in dataset) {
            sim_set.push({voca: dataset[i], sim: shingle.similarity(input, dataset[i])})
        }
        sim_set.sort((a, b) => a.sim < b.sim ? 1 : a.sim > b.sim ? -1 : 0)
        console.log(sim_set)
        for (let i = 0; i < k; i++) {
            output.push(sim_set[i].voca)
        }
        console.log(output)
        return
    }

shingle.similarity = function (str1, str2) {
        let set1 = shingle.split(str1)
        let set2 = shingle.split(str2)

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
        // console.log(set)
        return set;
    }

// shingle.SVC("arab",
//     ["ahrab", "arrab", "apple","asynarab","href","rabbit",],
//     3)

module.exports = shingle;
