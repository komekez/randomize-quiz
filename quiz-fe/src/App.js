// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { getRequest } from '../src/utils/requests'

function App() {

  //Properties
  const [finalResult, setFinalResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState([])
  const [popOpen, setpopOpen] = useState(false)


  useEffect(() => {
    getRequest('api/question/get-questions', (response) => {
      if(response.status===200){
        setQuestion(response.data?.data)
      }
      // else{
      //   // showErrorToast("Something went wrong")
      // }
    })
  }, [])
  return (
    <div className="App">
      <h1> Multichoice Quiz</h1>
      {/* <div className="question-card"> */}
      {
        question.map(
          d => (
            <div className="question-card">
            <label>
              <label className='question-text'>{d.question}</label> <br></br>
              <div className='option-card'>
                <label> <input type="radio" value={d.option1} key={d.option1}/> {d.option1} </label> <br></br>
                <label> <input type="radio" value={d.option2} key={d.option2}/> {d.option2} </label> <br></br>
                <label> <input type="radio" value={d.option3} key={d.option3}/> {d.option3} </label> <br></br>
                <label> <input type="radio" value={d.option4} key={d.option4}/> {d.option4} </label> <br></br>
                <label> <input type="radio" value={d.option5} key={d.option5}/> {d.option5} </label> <br></br>
                <label> <input type="radio" value={d.option6} key={d.option6}/> {d.option6} </label> <br></br>
                <label> <input type="radio" value={d.option7} key={d.option7}/> {d.option7} </label> <br></br>
              </div>
            </label>
            </div>
          )
        )
      }
      {/* </div> */}
      <div>
        <button>
          Submit
        </button>
      </div>      
    </div>
  );
}

export default App;