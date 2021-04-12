import React from 'react'
import TypeWriter from 'typewriter-effect'


const Jumbotrons=({text})=>{

   return (<TypeWriter 
    options={{
        strings:text,
        autoStart:true,
        loop:true
    }}

    />)
}


export default Jumbotrons