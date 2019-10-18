var Soundex_ = require('soundex-encode')
var Metaphone_ = require('metaphone')


metadex = {};

metadex.SVC = function (input, dataset){
    let code1 = Soundex_(input);
    let code3 = Metaphone_(input);
    let output = new Array();
    let length = code3.length
    for(i in dataset){
        if(input == dataset[i]){
            continue;
        }
        let code2 = Soundex_(dataset[i])
        let code4 = Metaphone_(dataset[i])
        if(code1.substring(1,4)==code2.substring(1,4)) {
            if (length > code4.length) {
                length = code4.length
            }
            let check = 0;
            if (length > 3) {
                for (let i = 0; i < 3; i++) {
                    if (code3[i] != code4[i]) {
                        check = 1
                    }
                }
            }else if(length == 1){
                if(code1[0]!=code2[0]){
                    check=1;
                }
            }else if(length < 4) {
                for (let i = 0; i < 2; i++) {
                    if (code3[i] != code4[i]) {
                        check = 1
                    }
                }
            }
            if (check == 0) {
                output.push(dataset[i])
            }
        }
    }
    return output
}

module.exports = metadex
