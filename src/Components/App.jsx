import React, { useContext, useEffect } from 'react'
import va from '../assets/Images/men2ai.png'
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from '../Context/Context';
import speakingImg from '../assets/Images/speak.gif';
import aigif from '../assets/Images/aiVoice.gif'


export default function App() {
    let {recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse} =  useContext(dataContext)
//     console.log("speak from context", speak)


  return (
    <>
      <div className="main">
           
              <img src={va} alt="" id="shifra"/>
            
            <span>I'm Tarzen, Your Advanced Virtual Assistance</span>
            {
              !speaking
              ?
              <button onClick={()=>{
            setSpeaking(true)
            setPrompt('listening...')
            setResponse(false)
            recognition.start()}}>Click Here <CiMicrophoneOn />
            </button>
            :
            <div className='response'>
              {
                !response
                ?
                <img src={speakingImg} alt="" id="speak" />
                :
                <img src={aigif} alt="" id='aigif' />

              }
             
              <p>{prompt}</p>
            </div>
            }
            
      </div>
    </>
  )
}
