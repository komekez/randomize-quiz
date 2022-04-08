const { options } = require('../app')
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
    let questions = []
    questionList.forEach(questionDetails => {
        questions.push ({
            'question_id' : questionDetails._id,
            'question' : questionDetails.questiontext,
            'option1' : questionDetails.option1,
            'option2' : questionDetails.option2,
            'option3' : questionDetails.option3,
            'option4' : questionDetails.option4,
            'option5' : questionDetails.option5,
            'option6' : questionDetails.option6,
            'option7' : questionDetails.option7,
        })
    });
    return questions
}


module.exports = {
    fetchRandomQuestion
}