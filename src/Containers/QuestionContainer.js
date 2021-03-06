import React, {useState, useEffect} from "react"
import {questAtom, userAtom} from "../Atom"
import {useRecoilState, useRecoilValue} from "recoil"

export default function QuestionContainer(){

    const [questions, setQuestions] = useRecoilState(questAtom),
        userInfo = useRecoilValue(userAtom),
        [q, setQ] = useState(null),
        [showAnswer, setShowAnswer] = useState(false),
        [count, setCount] = useState(1)

    const capitals = {AL: "Montgomery", AK: "Juneau", AZ: "Pheonix", AR: "Little Rock", CA: "Sacremento", CO: "Denver", CT: "Hartford", DE: "Dover",FL: "Tallahassee", GA: "Atlanta", HI: "Honolulu", ID: "Boise", IL: "Springfield", IN: "Indianaoplis",IA: "Des Moines", KS: "Topeka", KY: "Frankfort", LA: "Baton Rouge", ME: "Augusta", MD: "Annapolis", MA: "Boston", MI: "Lansing", MN: "St. Paul", MS: "Jackson", MO: "Jefferson City", MT: "Helena", NE: "Lincoln", NV: "Carson City", NH: "Concord", NJ: "Trenton", NM: "Santa Fe", NY: "Albany", NC: "Raleigh", ND: "Bismarck", OH: "Columbus", OK: "Oklahoma City:", OR: "Salem", PA: "Harrisburg", RI: "Providence", SC: "Columbia", SD: "Pierre", TN: "Nashville", TX: "Austin", UT: "Salt Lake City", VT: "Montpelier", VA:"Ricmond", WA: "Olympia", WV: "Charleston", WI: "Madison", WY: "Cheyenne" }

    useEffect(()=>{
        // const randomQ = questions[Math.floor(Math.random() * questions.length)]
        // setQuestions([...questions.filter(x=> x !== randomQ)])
        getQuestion()
        // setQ(randomQ)
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    },[])

    
    function getQuestion(){
        let i = count + 1
        setCount(i)
        const randomQ = questions[Math.floor(Math.random() * questions.length)]
        setQuestions([...questions.filter(x=> x !== randomQ)])
        setShowAnswer(false)
        checkExternal(randomQ)
    }

    function checkExternal(randomQ){
        const capitals = {AL: "Montgomery", AK: "Juneau", AZ: "Pheonix", AR: "Little Rock", CA: "Sacremento", CO: "Denver", CT: "Hartford", DE: "Dover",FL: "Tallahassee", GA: "Atlanta", HI: "Honolulu", ID: "Boise", IL: "Springfield", IN: "Indianaoplis",IA: "Des Moines", KS: "Topeka", KY: "Frankfort", LA: "Baton Rouge", ME: "Augusta", MD: "Annapolis", MA: "Boston", MI: "Lansing", MN: "St. Paul", MS: "Jackson", MO: "Jefferson City", MT: "Helena", NE: "Lincoln", NV: "Carson City", NH: "Concord", NJ: "Trenton", NM: "Santa Fe", NY: "Albany", NC: "Raleigh", ND: "Bismarck", OH: "Columbus", OK: "Oklahoma City:", OR: "Salem", PA: "Harrisburg", RI: "Providence", SC: "Columbia", SD: "Pierre", TN: "Nashville", TX: "Austin", UT: "Salt Lake City", VT: "Montpelier", VA:"Ricmond", WA: "Olympia", WV: "Charleston", WI: "Madison", WY: "Cheyenne" }
        console.log(count)
        if (randomQ.external === true){
            // console.log(userInfo)
            // debugger
            if (randomQ.question.includes("President") && !randomQ.question.includes("Vice") && !randomQ.question.includes("party")){
                const que = {question: randomQ.question, answers: [userInfo.potus]}
                setQ(que)
            } else if (randomQ.question.includes("Vice")){
                const que  = {question: randomQ.question, answers: [userInfo.vice]}
                setQ(que)
                // randomQ.answers = [userInfo.vice]
            } else if (randomQ.question.includes("Senators")){
                
                const que  = {question: randomQ.question, answers: userInfo.senators}
                setQ(que)
                // randomQ.answers = 
            } else if (randomQ.question.includes("Representative")){
                const que  = {question: randomQ.question, answers: [userInfo.house]}
                setQ(que)
                // randomQ.answers = [userInfo.house]
            } else if (randomQ.question.includes("Governor")){
                const que  = {question: randomQ.question, answers: [userInfo.gov]}
                setQ(que)
                // randomQ.answers = [userInfo.gov]
            } else if (randomQ.question.includes("party")){
                // debugger
                const que = {question: randomQ.question, answers: [userInfo.potusParty]}
                setQ(que)
            } else if (randomQ.question.includes("capital of your state")){
                debugger
                const que = {question: randomQ.question, answers: [capitals[userInfo.state]]}
                setQ(que)
            } else if (randomQ.question.includes("Chief Justice")){
                const que = {question: randomQ.question, answers: ["John Roberts"]}
                setQ(que)
            }
            
            // console.log(q)
        } else {
            setQ(randomQ)
        }
    }

    return (
        <div className="questions-container">
            <div className="question">
                {q && q.question}
            </div>
            <div className="answer">
                {showAnswer ? <ul>
                    {q && q.answers.map((x,i)=> <li key={i}>{x}</li> )}
                </ul> :
                <div className="show-answer-button" onClick={()=>setShowAnswer(!showAnswer)}>Show Answer</div>
                }    
            </div>
            {count <= 100 &&
            <div onClick={()=>getQuestion()}className="bottom-nav">
                <div className="next-question">
                    Next Question
                </div>
            </div>
            }       
        </div>
    )
}