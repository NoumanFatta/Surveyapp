import React, { useState, useEffect } from 'react';
import SingleQuestion from './components/SingleQuestion';
import MultipleQuestion from './components/MultipleQuestion';
import DataQuestion from './components/DataQuestion';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './components/firebase-config';
// import { writeBatch, doc, collection } from "firebase/firestore";
function User() {
  const [showQuestions, setShowQuestions] = useState([])
  useEffect(() => {
    const q = collection(db, "questions");
    onSnapshot(q, (querySnapshot) =>
      setShowQuestions(querySnapshot.docs.map((doc) => doc.data()))
    )
  }, [])

  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(null);
  const [count, setCount] = useState(0);
  const addQuestion = () => {
    if (questionType === 'single') {
      setCount(count + 1)
      setQuestions((prev) => [...prev, <SingleQuestion key={count} questionCount={count} />])
    }
    else if (questionType === 'multiple') {
      setCount(count + 1)
      setQuestions((prev) => [...prev, <MultipleQuestion questionCount={count} key={count} />])
    }
    else if (questionType === 'data') {
      setCount(count + 1)
      setQuestions((prev) => [...prev, <DataQuestion key={count} />])
    }
  }
  // const saveQuestions = () => {
  // const array = [
  //   {
  //     question: 'a'
  //   }, {
  //     name: 'b'
  //   }
  // ]
  // const batch = writeBatch(db);
  // array.forEach((docs) => {
  //   const docRef = doc(collection(db, "questions")); //automatically generate unique id
  //   batch.set(docRef, docs);
  // });
  // const nycRef = doc(db, "cities", "NYC");
  // Set the value of 'NYC'
  // batch.set(nycRef, { name: "New York City" });

  // Update the population of 'SF'
  // const sfRef = doc(db, "cities", "SF");
  // batch.update(sfRef, { "population": 1000000 });

  // Delete the city 'LA'
  // const laRef = doc(db, "cities", "LA");
  // batch.delete(laRef);

  // Commit the batch
  // batch.commit().then(() => {
  //   console.log('success')
  // });
  // }

  return (
    <>
      <label htmlFor="multiple"> MULTIPLE </label>
      <input type="radio" onChange={(e) => setQuestionType(e.target.value)} name="chooseQuestionType" id="multiple" value="multiple" />
      <label htmlFor="single" > SINGLE </label>
      <input type="radio" onChange={(e) => setQuestionType(e.target.value)} name="chooseQuestionType" id="single" value="single" />
      <label htmlFor="data" > DATA </label>
      <input type="radio" onChange={(e) => setQuestionType(e.target.value)} name="chooseQuestionType" id="data" value="data" />
      <br />
      <br />
      <button onClick={addQuestion} >
        ADD A QUESTION
      </button>
      {
        questions.map((val) => {
          return (
            val
          )
        })
      }
      {showQuestions.map((val, ind) => {
        return (
          <div key={ind} >
            <p> {val.question} {val.rightAnswer && <span>, Right Answer: {val.rightAnswer} </span>}, Question Type: {val.questionType} </p>
          </div>
        )
      })}
    </>
  );
}

export default User;
