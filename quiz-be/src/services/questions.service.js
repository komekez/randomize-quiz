const questionModel = require('../models/questions.models')

async function fetchRandomQuestion() {
    const randomVarNames = []
    const limit = 10
    const max = 36
    const min = 1
    while(randomVarNames.length < limit){
        let r = Math.floor(Math.random() * (max - min + 1) + min)
        if(randomVarNames.indexOf(r) === -1) randomVarNames.push('mfq_'+r);
    }
    const questionList = await questionModel.find({"varname" : {$in : randomVarNames}})
    console.log(questionList)
    return questionList
}


module.exports = {
    fetchRandomQuestion
}