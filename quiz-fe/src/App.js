// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { getRequest } from '../src/utils/requests'

function App() {

  //Properties
  const [finalResult, setFinalResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState([])


  function fetchQuestions(){
    // setCTATxt("Adding Review")
    // isLoading(true)

    getRequest('api/question/get-questions', (response) => {
      if(response.status===200){
        setQuestion(response.data?.data)
      }else{
        // showErrorToast("Something went wrong")
      }
    },(error)=>{
      // isLoading(false)
      // showErrorToast(error.toString() || "Something went wrong")
    });

    // postRequest('/api/feedback/supervisor', {
    //     "doubt" : doubtId,
    //     "solved" : questionSolved,
    //     "feedback" : {
    //         "key" : feedbackType,
    //         "label" : fetchFeedbackLabels(questionSolved, feedbackType)
    //     },
    //     "tutorId" : tutorId,
    //     "studentId" : studentId,
    //     "classId" : classId,
    //     "subjectId" : subjectId,
    //     "doubtPickTime" : doubtPickedTime,
    // }, (response)=>{
    //   setCTATxt("Add Review")
    //   isLoading(false)
    //   if(response.status===200) {
    //     showSuccessToast("Review added successfully")
    //     window.location.reload();
    //   }
    // }, (error)=>{
    //   showErrorToast(error.toString())
    //   setCTATxt("Add Review")
    //   isLoading(false)
    //   console.log(error);
    // })
  }

  // fetchQuestions()
  // console.log("heree",question)
  const questions = [{
    text: "What is the capital of America?",
    option1 : "Yes",
    option2 : "No"
  }
]
  // const questions = [
  //   {
  //     text: "What is the capital of America?",
  //     options: [
  //       { id: 0, text: "New York City", isCorrect: false },
  //       { id: 1, text: "Boston", isCorrect: false },
  //       { id: 2, text: "Santa Fe", isCorrect: false },
  //       { id: 3, text: "Washington DC", isCorrect: true },
  //     ],
  //   },
  //   {
  //     text: "What year was the Constitution of America written?",
  //     options: [
  //       { id: 0, text: "1787", isCorrect: true },
  //       { id: 1, text: "1776", isCorrect: false },
  //       { id: 2, text: "1774", isCorrect: false },
  //       { id: 3, text: "1826", isCorrect: false },
  //     ],
  //   },
  //   {
  //     text: "Who was the second president of the US?",
  //     options: [
  //       { id: 0, text: "John Adams", isCorrect: true },
  //       { id: 1, text: "Paul Revere", isCorrect: false },
  //       { id: 2, text: "Thomas Jefferson", isCorrect: false },
  //       { id: 3, text: "Benjamin Franklin", isCorrect: false },
  //     ],
  //   },
  //   {
  //     text: "What is the largest state in the US?",
  //     options: [
  //       { id: 0, text: "California", isCorrect: false },
  //       { id: 1, text: "Alaska", isCorrect: true },
  //       { id: 2, text: "Texas", isCorrect: false },
  //       { id: 3, text: "Montana", isCorrect: false },
  //     ],
  //   },
  //   {
  //     text: "Which of the following countries DO NOT border the US?",
  //     options: [
  //       { id: 0, text: "Canada", isCorrect: false },
  //       { id: 1, text: "Russia", isCorrect: true },
  //       { id: 2, text: "Cuba", isCorrect: true },
  //       { id: 3, text: "Mexico", isCorrect: false },
  //     ],
  //   },
  // ];

  return (

    <div className="App">
      <h1> Multichoice Quiz</h1>
      <div>
        <button onClick={fetchQuestions()}>Start</button>
      </div>
      {
        // finalResult ?
        //   (<div className='final-result'>
        //     <button>Restart</button>
        //   </div>)
        //   :
        //   (
          
          <div className='question-card'>
            <h2>Question {currentQuestion + 1} out of {question.length}</h2>
            <h3 className='question-text'>{question[currentQuestion].text}</h3>

            {/* <ul>
              {questions[currentQuestion].options.map((option) => {
                return (
                  // onClick={() => optionClicked(option.isCorrect)}
                  <li key={option.id}>{option.text}</li>
                )
              })}
            </ul> */}
          </div>
          // )
      }
    </div>
  );
}

export default App;