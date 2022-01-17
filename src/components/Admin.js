import React from 'react'
import DataQuestion from './DataQuestion'
import MultipleQuestion from './MultipleQuestion'
import SingleQuestion from './SingleQuestion'

export default function Admin() {
    return (
        <div>
           <DataQuestion/> 
           <SingleQuestion/> 
           <MultipleQuestion/> 
        </div>
    )
}