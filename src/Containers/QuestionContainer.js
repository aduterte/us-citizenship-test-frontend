import React, {useState, useEffect} from "react"
import {questAtom} from "../Atom"
import {useRecoilState} from "recoil"

export default function QuestionContainer(){

    const [questions, setQuestions] = useRecoilState(questAtom),
        [q, setQ] = useState(null),
        [showAnswer, setShowAnswer] = useState(false)

    // const getQuestion = () => {
    //     const randomQ = questions[Math.floor(Math.random() * questions.length)]
    //     setQuestions([...questions.filter(x=> x !== randomQ)])
    //     setQ(randomQ)
    //     }
    // eslint-disable-next-line
    useEffect(()=>{
        const randomQ = questions[Math.floor(Math.random() * questions.length)]
        setQuestions([...questions.filter(x=> x !== randomQ)])
        setQ(randomQ)
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    },[])

    
    // function getQuestion(){
    //     const q = questions[Math.floor(Math.random() * questions.length)]
    //     return q.question
    // }
    return (
        <div className="questions-container">
            <div className="question">
                {q && q.question}
            </div>
            <div className="answer">
                {showAnswer ? <ul>
                    {q && q.answers.map((x,i)=> <li key={i}>{x}</li> )}
                </ul> :
                <div onClick={()=>setShowAnswer(!showAnswer)}>Show Answer</div>
                }
                
            </div>
            
        </div>
    )
}