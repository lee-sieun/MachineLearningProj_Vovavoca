var Metaphone_ = require('metaphone')

metaphone = {};

metaphone.SVC = async function (input, dataset, k){
    let code1 = Metaphone_(input);
    let output = new Array();

    for(i in dataset){
        if(input == dataset[i]){
            continue;
        }
        let code2 = Metaphone_(dataset[i])

        if(code1==code2) {
            output.push(dataset[i])

        }
    }
    return output
}

module.exports = metaphone;
