import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  startAfter,
  limit,
  addDoc,
  arrayUnion,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase-config";

export default function User() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [showQuestions, setShowQuestions] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [isAnyQuestion, setIsAnyQuestion] = useState(true);
  const [questionLength, setQuestionLength] = useState(0);
  const [ans, setAns] = useState("");
  const [docId, setDocId] = useState("");
  const [startQues, setStartQues] = useState(true);
  const btnRef = useRef(null);
  const [resultData , setResultData] = useState({})
  const [result , setResult] = useState(false)


  useEffect(() => {
    async function showData() {
      const docRef = collection(db, "questions");
      const snapshot = await getDocs(docRef);
      const count = snapshot.size;
      setQuestionLength(snapshot.size - 1);
      const first = query(collection(db, "questions"), limit(1));
      const documentSnapshots = await getDocs(first);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      setShowQuestions([lastVisible.data()]);
    }
    showData();
  }, []);



  const showNext = async () => {
    if (btnRef.current.innerText === "Submit"){
        onSnapshot(doc(db, "answeres", docId), (doc) => {
                if(doc.data().trueArr.length >= doc.data().falseArr.length ){
                    setResultData("Passed")
                }else {
                    setResultData("Failed")
                }
            setResult(true)
        });
      }
   else {
    let givenAns = false;
    if (showQuestions[0]?.rightAnswer === ans) {
      givenAns = true;
    } else if (showQuestions[0].questionType === "data") {
      givenAns = null;
    }
    let d = new Date();
    let timestamp = d.getTime();
    if (startQues) {
      let obj = {
        questionId: showQuestions[0].questionId,
        ans,
        givenAns,
      };

      const docAns = await addDoc(collection(db, "answeres"), {
        name,
        email,
        ansArr: [obj],
        falseArr: [],
        trueArr: [],
      });
      let ansDocID = docAns.id;
      setDocId(ansDocID);

      if (givenAns === true) {
        await updateDoc(doc(db, "answeres", ansDocID), {
          trueArr: arrayUnion(showQuestions[0].questionId),
        });
      } else if (givenAns === false) {
        await updateDoc(doc(db, "answeres", ansDocID), {
          falseArr: arrayUnion(showQuestions[0].questionId),
        });
      }
      setStartQues(false);
    } else {
      let obj = {
        questionId: showQuestions[0].questionId,
        ans,
        givenAns,
      };

      await updateDoc(doc(db, "answeres", docId), {
        ansArr: arrayUnion(obj),
      });
      if (givenAns === true) {
        await updateDoc(doc(db, "answeres", docId), {
          trueArr: arrayUnion(showQuestions[0].questionId),
        });
      } else if (givenAns === false) {
        await updateDoc(doc(db, "answeres", docId), {
          falseArr: arrayUnion(showQuestions[0].questionId),
        });
      }
    }
    const next = query(
      collection(db, "questions"),
      startAfter(lastDoc),
      limit(1)
    );
    const documentSnapshots = await getDocs(next);
    setQuestionLength(questionLength - 1);
    if (questionLength <= 1) {
      setIsAnyQuestion(false);

      if (isAnyQuestion) {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastDoc(lastVisible);
        setShowQuestions([lastVisible.data()]);
      }
    } else {
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      setShowQuestions([lastVisible.data()]);
    }

    setAllAnswers({});
   }
  };

  const [allAnswers, setAllAnswers] = useState({});
  const submitAnswer = () => {};
  return (
      <> 
      {result  ? (<p>{resultData}</p>) : ( <div>
      {showQuestions.map((val, ind) => (
        <div key={ind}>
          <p>
            {val.question}
            {val.questionType !== "data" ? (
              val.options.map((value, index) => (
                <label key={index}>
                  {value}:
                  <input
                    type="radio"
                    value={value}
                    name={val.questionId}
                    onChange={(e) => {
                      setAns(e.target.value);
                    }}
                  />
                </label>
              ))
            ) : (
              <input
                type="text"
                onChange={(e) => {
                  setAns(e.target.value);
                }}
                name={val.questionId}
              />
            )}
          </p>
        </div>
      ))}
      {showQuestions[0] && (
        <button ref={btnRef} onClick={showNext}>{!isAnyQuestion ? "Submit" : "Next"}</button>
      )}
    </div>)}
     </>
    
  );
}
