var Soundex_ = require('soundex-encode')

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
        }
    }
    return output
}

module.exports = soundex;
