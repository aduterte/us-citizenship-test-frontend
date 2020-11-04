import React, {useEffect} from "react"
import {questAtom, userAtom} from "./Atom"
import {useRecoilState, useRecoilValue} from "recoil"
import './App.css';
import QuestionContainer from "./Containers/QuestionContainer";
import UserInfo from "./Components/UserInfo"

function App() {
  console.log(process.env.REACT_APP_GOOGLE_API_KEY)
  const [questions, setQuestions] = useRecoilState(questAtom),
    info = useRecoilValue(userAtom)
  useEffect(()=>{
    fetch("https://enigmatic-forest-15161.herokuapp.com/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  },[setQuestions])

  return (
    <div className="App">
      {!info ? <UserInfo/> : questions && <QuestionContainer/>}
      
    </div>
  );
}

export default App;
