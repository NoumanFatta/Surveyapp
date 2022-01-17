import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function From() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const navigate = useNavigate()
  const goToSurvey = ()=>{
    if (name !== "" && email !== ""){
        localStorage.setItem("name" , name)
        localStorage.setItem("email" , email)
        navigate("/user")
    }else {
        alert("Please provide valid name & email")
    }
  }

  return (
    <div>
      <p>Enter Your Name</p>

      <input
        placeholder="Name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <p>Enter Your Email</p>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
<br/>
      <button onClick={goToSurvey}>Start Survey</button>
    </div>
  );
}
