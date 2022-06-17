import React, {useEffect, useState} from 'react'
import questions from '../questions.json'
const QuestionsScreen = () => {

    const tempArray =[]
    const [cleanData, setCleanData] = useState([])
    const [correctAns, setCorrectAns] = useState("")
    const [clickIndex, setClickIndex] = useState("")

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
    const handleAns = (item, index) => {
        const ans = cleanData[index].correct_answer
        setCorrectAns(ans)
    }
    useEffect(() => {
        getAllQuestions()
    }, [])
    
    console.log("cleanData", cleanData)
  return (
    <div style={{width: '100%',textAlign: 'center'}}>
        <div>
            {
                cleanData && cleanData.map((item, index) => (
                    <div>
                        <p style={{fontWeight: 'bold', fontSize: '20px'}}>{item.question}</p>
                        <p>
                            {
                                 item?.options.sort(() => Math.random() - 0.5).map((elem, index) => (
                                <div>
                                    {
                                        correctAns === elem ? <p style={{color: 'green', fontWeight: 'bold'}}>{elem}</p> : <p style={{color: 'red'}}>{elem}</p>
                                    }
                                    
                                </div>
                                ))
                            }
                        </p>
                        <button onClick={() => { handleAns(item, index); setClickIndex(index)}}>Show Answer</button>
                        {/* {
                            clickIndex === index && <p style={{fontWeight: 'bold', color: 'green'}}>{correctAns}</p>
                        } */}


                    </div>
                ))
            }

            {/* <p>The ANS is {correctAns}</p> */}
        </div>
    </div>
  )
}

export default QuestionsScreen