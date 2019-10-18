var Metaphone_ = require('metaphone')
var Soundex_ = require('soundex-encode')

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

// metaphone.SVC("meet",
//     ["mode", "ewnkjwe","mood", "wnjkfewa","mate","fwean","meadow","fewkln","myth","wet" ,"faweae","mate","mounth"],
//     3)
//
//
// soundex.SVC("pineapple",
//     ["ahrab", "arrab", "apple","asynarab","href","rabbit",],
//     3)
// soundex.SVC("pect", ["ahrab", "arrab","fact","fect" ,"effect","bear", "apple","asynarab","href","rabbit",], 3)

module.exports = metaphone;
