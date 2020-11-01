import React, {useEffect} from "react"
import {questAtom} from "./Atom"
import {useRecoilState} from "recoil"
import './App.css';
import QuestionContainer from "./Containers/QuestionContainer";

function App() {

  const [questions, setQuestions] = useRecoilState(questAtom)
  useEffect(()=>{
    fetch("https://enigmatic-forest-15161.herokuapp.com/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  },[setQuestions])

  return (
    <div className="App">
      {questions && <QuestionContainer/>}
    </div>
  );
}

export default App;
