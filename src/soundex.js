var Soundex_ = require('soundex-encode')
var Metaphone_ = require('metaphone')
soundex = {};

soundex.SVC = function (input, dataset){
    let code1 = Soundex_(input);
    let output = new Array();

    for(i in dataset){
        if(input == dataset[i]){
            continue;
        }
        let code2 = Soundex_(dataset[i])
        if(code1==code2) {
            output.push(dataset[i])
            console.log(dataset[i],code1,Metaphone_(dataset[i]))
        }
    }
    return output
}

module.exports = soundex;
