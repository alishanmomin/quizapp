import React, {useEffect, useState} from 'react'
import questions from '../questions.json'
import {ProgressBar} from "react-bootstrap"


const QuestionsScreen = () => {

    const tempArray =[]
    const [cleanData, setCleanData] = useState([])
    const [correctAns, setCorrectAns] = useState("")
    const [clickYes, setClickYes] = useState(false)
    const [clickIndex, setClickIndex] = useState(0)
    const [score, setScore] = useState(0)
   /*  console.log("co", correctAns) */
    const getAllQuestions = () => {
        questions.forEach((item, index) => {
            const tempIncorrect =[]
            let obj = {}
           
            obj.category = item.category.replace(/(%20|%27|%3F|%3A)/g, ' ')
            obj.type = item.type
            obj.difficulty = item.difficulty
            obj.question = item.question.replace(/(%20|%27|%3F|%22|%3A|%2)/g, ' ')
            obj.correct_answer = item.correct_answer.replace(/(%20|%27|%2|%3F|%3A)/g, ' ')
            item.incorrect_answers.forEach((elem, ind) => {
                    let iObj = {}
                    iObj = elem.replace(/(%20|%27|%3F|%3A|%2C|%2)/g, ' ')
                    tempIncorrect.push(iObj)
                })
            obj.options = [...tempIncorrect, obj.correct_answer]
            tempArray.push(obj)
            setCleanData(tempArray)
        })
    }
    const handleAns = (index, elem) => {
        const ans = cleanData[index].correct_answer
        setCorrectAns(ans)

        if(elem === ans) {
            setScore(score + 1);
        }
    
    }
    useEffect(() => {
        getAllQuestions()
    }, [])
    console.log("click index", clickIndex)    
  return (
    <div className='main'>
        <p className='heading'>The Quiz Game</p>

        {
            clickIndex === 19 ? 
            <div className='result' onClick={() => {setClickIndex(0); setScore(0)}}>You scored {score} points </div> : 
            <div className='box'>
                {/* <ProgressBar variant="success" now={60} label={60}/> */}
                <p className='question'>{cleanData[clickIndex]?.question}</p>
                <div className='options'>
                {/* sort(() => Math.random() - 0.5) */}
                {
                    cleanData[clickIndex]?.options.sort(() => Math.random() - 0.5).map((elem, index) => (
/*                         <div onClick={() => { handleAns(clickIndex)}}>
                            {
                            correctAns === elem ? <button className='btn'>{elem}</button> : <button className='btn'>{elem}</button>
                        }                        
                    </div> */
                        <div>
                            <button
                                 onClick={() => {handleAns(clickIndex, elem); setClickYes(true)}} 
                                 className={clickYes ? correctAns === elem ? 'btn-correct' : "btn-wrong" : "btn"}
                                 disabled ={clickYes}
                                 >
                                    {elem}

                            </button> 
                            
                        </div>
                    ))
                }
                </div>
                <div className='bottom'>
                   {
                    clickIndex > 0 && 
                    <i className="fas fa-caret-left" onClick={() => {setClickIndex(clickIndex - 1); setClickYes(false)}}></i>
                   }
                    <p className='number'><span>{clickIndex+1}</span>/20</p>
                    {
                        clickIndex !== 19 &&
                        <i className="fas fa-caret-right" onClick={() => {setClickIndex(clickIndex+1); setClickYes(false)}}></i>
                    }
                </div>
                
        </div>
        }
    </div>
  )
}

export default QuestionsScreen