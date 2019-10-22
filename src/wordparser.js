wordparser = {};

wordparser.parsing = function (content, min,max) {
    wordset = new Array()

    for(let i in content){
        if(content[i]=='`'||content[i]=='.'||content[i]==','||content[i]=='?'
            ||content[i]=='"'||content[i]=="'"){
            content[i]=' ';
        }
    }
    let wordsplit = content.split(' ');
    for(let i in wordsplit){
        if(wordsplit[i].length>=min&&wordsplit[i].length<=max){
            wordset.push(wordsplit[i]);
        }
    }
}
