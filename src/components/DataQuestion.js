import React, { useRef,useState } from 'react'
import { setDoc, doc, collection } from 'firebase/firestore'
import { db } from './firebase-config'
const DataQuestion = () => {
    const dataQuestion = useRef(null);
    const [isAnyQuestion, setIsAnyQuestion] = useState(true)
    const saveQuestion = async () => {
        try {

            const questionRef = doc(collection(db, "questions"));
            const questions = {
                question: dataQuestion.current.value,
                questionType: 'data',
                questionId: questionRef.id
            }
            // later...
            await setDoc(questionRef, questions);
            setIsAnyQuestion(false)
        } catch (err) {
            alert(err)
        }
    }
    const deleteQuestion = () => {
        setIsAnyQuestion(false);
    }
    return (
        <>

            {isAnyQuestion &&
                <div>
                    <input type="text" ref={dataQuestion} />
                    <input type="button" value="save" onClick={saveQuestion} />
                    <input type="button" value="Delete" onClick={deleteQuestion} />
                    <br />
                    <br />
                </div>
            }
        </>
    )
}

export default DataQuestion
