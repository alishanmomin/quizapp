import React, {useEffect, useState} from 'react'
import questions from '../questions.json'
const QuestionsScreen = () => {

    const tempArray =[]
    const [cleanData, setCleanData] = useState([])
    const [correctAns, setCorrectAns] = useState(false)
    const [clickYes, setClickYes] = useState(false)
    const [clickIndex, setClickIndex] = useState(0)
    const [btnIndex, setBtnIndex] = useState(-1)
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
    console.log("ans", ans)
    console.log("elem", elem)
        
        if(elem === ans) {
            setCorrectAns(true)
        } else {
            setCorrectAns(false)
        }
    }
    useEffect(() => {
        getAllQuestions()
    }, [])
    
/*     console.log("cleanData", cleanData)
 */  return (
    <div className='main'>
        <p className='heading'>The Quiz Game</p>
        <div className='box'>
                <p className='question'>{cleanData[clickIndex]?.question}</p>
                <div className='options'>
                {/* sort(() => Math.random() - 0.5) */}
                {
                    cleanData[clickIndex]?.options.map((elem, index) => (
/*                         <div onClick={() => { handleAns(clickIndex)}}>
                            {
                            correctAns === elem ? <button className='btn'>{elem}</button> : <button className='btn'>{elem}</button>
                        }                        
                    </div> */
                        <div>
                            <button
                                 onClick={() => {handleAns(clickIndex, elem); setBtnIndex(index); setClickYes(true)}} 
                                 className={btnIndex === index ? correctAns ? 'btn-correct' : "btn-wrong" : "btn"}
                                 disabled ={clickYes}
                                 >
                                    {elem}

                            </button> 
                        </div>
                    ))
                }
                </div>
                <div className='bottom'>
                    <i className="fas fa-caret-left" onClick={() => {setClickIndex(clickIndex - 1); setBtnIndex(-1); setClickYes(false)}}></i>
                    <p className='number'><span>{clickIndex+1}</span>/20</p>
                    <i className="fas fa-caret-right" onClick={() => {setClickIndex(clickIndex+1); setBtnIndex(-1); setClickYes(false)}}></i>
                </div>
                
        </div>
    </div>
  )
}

export default QuestionsScreen