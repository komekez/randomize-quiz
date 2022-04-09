// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { getRequest,postRequest, showErrorToast } from '../src/utils/requests';
import  Popup  from './components/Popup'
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';



function App() {

  //Properties
  const [question, setQuestion] = useState([])
  const [popOpen, setpopOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [initialResponse, setInitialResponse] = useState({})
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [userId, setUserId] = useState(null)

  const togglePopup = () => {
    setpopOpen(!popOpen);
  }


function storeUserData() {
  let user_id = null;
    if(userName && userEmail) {
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
        postRequest('api/users/insert', {
          "name" : userName,
          "email" : userEmail,
        }, (response) => {
          setUserId(response.data?.data?.user_id)
        }) 
      } else {
        alert("Email Address is Invalid")
      }
    } else {
      alert("Name or Email Cannot be Empty")
    }
    return user_id
  }


  function storeUserResponseData() {
    console.log(userId)
    postRequest('api/user-response/insert', {
      "user_response" : {
        initialResponse,
        'user_id' : userId
      }
    }, (response) => {
      console.log(response)
      if(response.data?.data?.inserted) {
        alert("Your Response Successfully Inserted")
      } else {
        alert("Something Went Wrong")
      }
    }) 
  }


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
      {/* <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Multichoice Quiz</h1>
          <ExampleToast>
            We now have Toasts
            <span role="img" aria-label="tada">
              🎉
            </span>
          </ExampleToast>
        </Jumbotron>
      </Container> */}  

      <div>
        <h1>Multichoice Quiz</h1>
      </div>
      {
        question.map(
          d => (
            <div className="question-card">
            <label>
              <label className='question-text' value={d.question_id} onChange={(t)=>setCurrentQuestionId(d.question_id)}>{d.question}</label> <br></br>
              <div>
                <li>
                <label> <input type="radio"  name={d.question_id} value={d.option1} key={d.option1} onChange={(t) => initialResponse[d.question_id] = d.option1}/> {d.option1} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option2} key={d.option2} onChange={(t) => initialResponse[d.question_id] = d.option2}/> {d.option2} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option3} key={d.option3} onChange={(t) => initialResponse[d.question_id] = d.option3}/> {d.option3} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option4} key={d.option4} onChange={(t) => initialResponse[d.question_id] = d.option4}/> {d.option4} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option5} key={d.option5} onChange={(t) => initialResponse[d.question_id] = d.option5}/> {d.option5} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option6} key={d.option6} onChange={(t) => initialResponse[d.question_id] = d.option6}/> {d.option6} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option7} key={d.option7} onChange={(t) => initialResponse[d.question_id] = d.option7}/> {d.option7} </label> <br></br>
                </li>
              </div>
            </label>
            </div>
          )
        )
      }
        <button onClick={togglePopup}>
          Submit
        </button>
          {popOpen && <Popup
          content={<>
            <form action="/">
            <h2>Fill In your Details</h2>
            <div class="user-details">
              <input type="text" required name="name" placeholder="Full name" value={userName} onChange={(t)=>setUserName(t.target.value)} required/>
              <input type="email" required name="email" placeholder="Email" value={userEmail} onChange={(t)=>setUserEmail(t.target.value)} required/>
            </div>
            </form>
            <button onClick={function(event){
              storeUserData(); 
              storeUserResponseData()
            }}>Submit</button>
          </>}
        handleClose={togglePopup}
    />}
    </div>
  );
}

export default App;