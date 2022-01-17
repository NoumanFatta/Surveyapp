import React, { useState, useRef } from 'react';
import { setDoc, doc, collection } from 'firebase/firestore'
import { db } from './firebase-config'

const SingleQuestion = (props) => {
    const dataQuestion = useRef(null);
    const [rightAnswer, setRightAnswer] = useState(null);
    const [isAnyQuestion, setIsAnyQuestion] = useState(true);
    const saveQuestion = async () => {
        if (rightAnswer) {
            try {
                const questionRef = doc(collection(db, "questions"));
                const questions = {
                    question: dataQuestion.current.value,
                    questionType: 'single',
                    options: ['true', 'false'],
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
                    <input type='text' ref={dataQuestion} />
                    <label>
                        True:
                        <input type='radio' onChange={(e) => setRightAnswer(e.target.value)} name={`single${props.questionCount}`} value='true' />
                    </label>
                    <label>
                        false:
                        <input type='radio' onChange={(e) => setRightAnswer(e.target.value)} name={`single${props.questionCount}`} value='false' />
                    </label>
                    <input type="button" value="save" onClick={saveQuestion} />
                    <input type="button" value="Delete" onClick={deleteQuestion} />
                    <br />
                    <br />
                </div>}
        </>
    )
}

export default SingleQuestion
