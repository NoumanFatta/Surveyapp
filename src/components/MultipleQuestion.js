import React, { useState, useRef } from 'react';
import { setDoc, doc, collection } from 'firebase/firestore'
import { db } from './firebase-config';

const MultipleQuestion = (props) => {
    const [options, setOptions] = useState([])
    const dataQuestion = useRef(null);
    const [radio, setRadio] = useState([]);
    const [rightAnswer, setRightAnswer] = useState(null);
    const [questionValue, setQuestionValue] = useState('');
    const [isOptionAdded, setIsOptionAdded] = useState(false);
    const [isAnyQuestion, setIsAnyQuestion] = useState(true);
    const [optionCount, setOptionCount] = useState(0);

    const addOptions = () => {
        setIsOptionAdded(true);
        setOptionCount(optionCount + 1)
        const optionValue = prompt("Enter your option");
        setOptions((prev) => [...prev, optionValue])
        let opt = <label key={`${optionCount}${props.questionCount}`} > {optionValue} <input type="radio" name={`multiple${props.questionCount}`} value={optionValue} onChange={(e) => setRightAnswer(e.target.value)} /> </label>
        setRadio((prev) => [...prev, opt])
    }
    const saveQuestion = async () => {
        if (rightAnswer) {
            try {
                const questionRef = doc(collection(db, "questions"));
                const questions = {
                    question: dataQuestion.current.value,
                    questionType: 'multiple',
                    options,
                    rightAnswer,
                    questionId: questionRef.id
                }
                // later...
                await setDoc(questionRef, questions);
                setIsAnyQuestion(false);
            } catch (err) {
                alert(err)
            }
        }
    }
    const deleteQuestion = () => {
        setIsAnyQuestion(false);
    }

    return (
        <>
            {isAnyQuestion &&
                <div>
                    <input type="text" ref={dataQuestion} onChange={(e) => setQuestionValue(e.target.value)} value={questionValue} />
                    {radio}
                    <input type="button" value="add options" onClick={addOptions} />
                    <input type="button" value="Save" disabled={!isOptionAdded} onClick={saveQuestion} />
                    <input type="button" value="Delete" onClick={deleteQuestion} />
                    <br />
                    <br />
                </div>
            }
        </>
    )
}

export default MultipleQuestion
