
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { getRequest,postRequest, showErrorToast } from '../src/utils/requests';
import  Popup  from './components/Popup'
import { CSVLink } from 'react-csv'

function App() {

  const csvLink = useRef()
  //Properties
  const [question, setQuestion] = useState([])
  const [popOpen, setpopOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [initialResponse, setInitialResponse] = useState({})
  const [questionNumber, setQuestionNumber] = useState([])
  const [csvData, setCsvData] = useState([])
  const [analyticsId, setAnalyticsId] = useState(0)

  const togglePopup = () => {
    setpopOpen(!popOpen);
  }


function storeUserData() {
  return new Promise((resolve, reject) => {
      if(userName && userEmail) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
          postRequest('api/users/insert', {
            "name" : userName,
            "email" : userEmail,
          }, (response) => {
            resolve(response.data?.data?.user_id)
          }) 
        } else {
          reject("Email Address is Invalid")
        }
      } else {
        reject("Name or Email Cannot be Empty")
      }
    }) 
  }


  function storeUserResponseData(userId) {
    postRequest('api/user-response/insert', {
      "user_response" : {
        initialResponse,
        'user_id' : userId
      }
    }, (response) => {
      if(response.data?.data?.inserted) {
        alert("Your Response Successfully Inserted")
        window.location.reload(true);
      } else {
        alert("Something Went Wrong")
      }
    }) 
  }

  function storeUserAnalytics() {
    postRequest('api/analytics/insert', {
      "analytics" : {
        start_time : Date().toLocaleString()
      }
    }, (response) => {
      if(response.data?.data?.inserted) {
        setAnalyticsId(response.data?.data?.analytic_id)
      }
    }) 
  }

  function updateUserAnalytics(userId) {
    postRequest('api/analytics/update', {
      "analytics" : {
        'user_id' : userId,
        'end_time' : Date().toLocaleString()
      },
      "analytics_id" : analyticsId
    }, (response) => {
      if(response.data?.data?.inserted) {
        console.log("Success")
      }
    })
  }

  function downloadCSV() {
    getRequest('api/analytics/user-response/csv', (response) => {
      if(response.status===200){
        setCsvData(response.data)
      }
    })
    csvLink.current.link.click()
    }

  useEffect(() => {
    getRequest('api/question/get-questions', (response) => {
      if(response.status===200){
        setQuestion(response.data?.data)
      }
    })
  }, [])
  return (
    <div className="App">
      <div>
        <h1>Multichoice Quiz</h1>
      </div>
      {
        question.map(
          d => (
            <div className="question-card">
            <label>
              <label className='question-text' name={d.question_id} value={d.question_id} onChange={(t)=>questionNumber.append([d.question_id])}>{d.question}</label> <br></br>
              <div>
                <li>
                <label> <input type="radio"  name={d.question_id} value={d.option1} key={d.option1} onChange={(t) => initialResponse[d.question_id] = d.option1} onClick={storeUserAnalytics}/> {d.option1} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option2} key={d.option2} onChange={(t) => initialResponse[d.question_id] = d.option2} onClick={storeUserAnalytics}/> {d.option2} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option3} key={d.option3} onChange={(t) => initialResponse[d.question_id] = d.option3} onClick={storeUserAnalytics}/> {d.option3} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option4} key={d.option4} onChange={(t) => initialResponse[d.question_id] = d.option4} onClick={storeUserAnalytics}/> {d.option4} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option5} key={d.option5} onChange={(t) => initialResponse[d.question_id] = d.option5} onClick={storeUserAnalytics}/> {d.option5} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option6} key={d.option6} onChange={(t) => initialResponse[d.question_id] = d.option6} onClick={storeUserAnalytics}/> {d.option6} </label> <br></br>
                <label> <input type="radio"  name={d.question_id} value={d.option7} key={d.option7} onChange={(t) => initialResponse[d.question_id] = d.option7} onClick={storeUserAnalytics}/> {d.option7} </label> <br></br>
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


        <button class = 'csv-button' onClick={downloadCSV}>Download Responses</button>
        <CSVLink
          data={csvData}
          filename='analytics.csv'
          className='hidden'
          ref={csvLink}
          target='_blank'
        />

          {popOpen && <Popup
          content={<>
            <form action="/">
            <h2>Fill In your Details</h2>
            <div class="user-details">
              <input type="text" required name="name" placeholder="Full name" value={userName} onChange={(t)=>setUserName(t.target.value)} required/>
              <input type="email" required name="email" placeholder="Email" value={userEmail} onChange={(t)=>setUserEmail(t.target.value)} required/>
            </div>
            </form>
            <button onClick={async function(event){
              try {
                let userId = await storeUserData(); 
                storeUserResponseData(userId)
                updateUserAnalytics(userId)
              } catch(e) {
                alert(e)
              }
            }}>Submit</button>
          </>}
        handleClose={togglePopup}
    />}
    </div>
  );
}

export default App;