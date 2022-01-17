import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
          <p style={{margin:"10px"}}>I am</p>
          <Link to="/admin" style={{margin:"10px"}}>Admin</Link>
          <Link to="/form">User</Link> 
        </div>
    )
}
