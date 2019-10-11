//N_gram 을 이용한 K_VOCA_CLUSTERING


module.exports = () => {
    function KVC(input, dataset, k) {
        let sim_set = []
        let output = new Array()
        for (i in dataset) {
            sim_set.push({voca: dataset[i], sim: similarity(input, dataset[i])})
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

    function similarity(str1, str2) {
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
        console.log(set1)
        console.log(set2)

        let sim = n / (set1.length + set2.length - n)
        console.log(sim)
        return sim;
    }

    function split(str) {
        let set = new Array()

        set.push(str[0])
        for (let i = 0; i < str.length - 1; i++) {
            set.push(str[i] + str[i + 1])
        }
        set.push(str[str.length - 1])
        return set;
    }
}




