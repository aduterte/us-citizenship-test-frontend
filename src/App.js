import React, {useEffect} from "react"
import {questAtom} from "./Atom"
import {useSetRecoilState} from "recoil"
import './App.css';
import QuestionContainer from "./Containers/QuestionContainer";

function App() {

  const setQuestions = useSetRecoilState(questAtom)
  useEffect(()=>{
    fetch("http://localhost:3000/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  },[])

  return (
    <div className="App">
      <QuestionContainer/>
    </div>
  );
}

export default App;
