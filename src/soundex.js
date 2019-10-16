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


// console.log(soundex.SVC("meet",
//     ["mode", "ewnkjwe","mood", "wnjkfewa","mate","fwean","meadow","fewkln","myth","faweae","mate","mounth"],
//     3))
//
//
// soundex.SVC("pineapple",
//     ["ahrab", "arrab", "apple","asynarab","href","rabbit",],
//     3)
// soundex.SVC("pect", ["ahrab", "arrab","fact","fect" ,"effect","bear", "apple","asynarab","href","rabbit",], 3)

module.exports = soundex;
