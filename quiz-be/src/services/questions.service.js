const { options } = require('../app')
const questionModel = require('../models/questions.models')


// [
//     {
//       text: "What is the capital of America?",
//       options: [
//         { id: 0, text: "New York City", isCorrect: false },
//         { id: 1, text: "Boston", isCorrect: false },
//         { id: 2, text: "Santa Fe", isCorrect: false },
//         { id: 3, text: "Washington DC", isCorrect: true },
//       ],
//     },
//     {
//       text: "What year was the Constitution of America written?",
//       options: [
//         { id: 0, text: "1787", isCorrect: true },
//         { id: 1, text: "1776", isCorrect: false },
//         { id: 2, text: "1774", isCorrect: false },
//         { id: 3, text: "1826", isCorrect: false },
//       ],
//     },
//     {
//       text: "Who was the second president of the US?",
//       options: [
//         { id: 0, text: "John Adams", isCorrect: true },
//         { id: 1, text: "Paul Revere", isCorrect: false },
//         { id: 2, text: "Thomas Jefferson", isCorrect: false },
//         { id: 3, text: "Benjamin Franklin", isCorrect: false },
//       ],
//     },

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
        // console.log(questionDetails)
        questions.push ({
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

    console.log(questions)
    // console.log(questionList)
    return questions
}


module.exports = {
    fetchRandomQuestion
}