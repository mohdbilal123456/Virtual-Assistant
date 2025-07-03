import React, { Children, useState } from 'react'
import { createContext } from 'react'
// import main from '../Gemini API/gemini';
import run from '../Gemini API/gemini';


export const dataContext = createContext()

export default function Context({children}) {

      let[speaking,setSpeaking] = useState(false);
      let [prompt,setPrompt] = useState("listening");
      let [response,setResponse] =useState(false)

      function speak(text)
      {
            let text_speak = new SpeechSynthesisUtterance(text)
            // let newText = text_speak.split('**') && text_speak.split('*') && text_speak.replace("google","Mohammad Bilal") &&  text_speak.replace("Google","Mohammad Bilal")
            text_speak.volume =1;
            text_speak.rate =1;
            text_speak.pitch =1;
            text_speak.lang = "hi-GB";
            
            // window.speechSynthesis.onvoiceschanged = () => {
            //       const voices = speechSynthesis.getVoices();
            //       console.log("Voices loaded:", voices);
            // };
            window.speechSynthesis.cancel(); // Stops any current speech
            window.speechSynthesis.speak(text_speak)
      }

      async function aiResponse(prompt){
            let text = await run(prompt)
            let newText = text.split('**') && text.split('*') && text.replace("google","Mohammad Bilal") &&  text.replace("Google","Mohammad Bilal") && text.replace(/\*\*/g, '')
            // console.log(text);
            setPrompt(newText)
            speak(newText)
            setResponse(true)
            setTimeout(()=>{
                  setSpeaking(false)
            },5000)
            
      }

      let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
      
      let recognition = new speechRecognition();
      recognition.onresult=(e)=>{
            let currentIndex = e.resultIndex
            let transcript = e.results[currentIndex][0].transcript
            console.log(transcript);
            setPrompt(transcript)
            // aiResponse(transcript)
            takeCommand(transcript.toLowerCase())
      }

      function takeCommand(command)
      {
            if(command.includes("open") && command.includes("youtube") ){
                  window.open("https://www.youtube.com/");
                  speak("Opening Youtube")
                  setPrompt("Opening Youtube...")
                  setTimeout(()=>{
                         setSpeaking(false)
                  },7000)
            }
            else if(command.includes("open") && command.includes("LinkedIn"))
            {
                  window.open("https://www.google.com/");
                  speak("Opening google")
                  setPrompt("Opening google...")
                  setTimeout(()=>{
                         setSpeaking(false)
                  },7000)
            }
            else 
            {
                  aiResponse(command)
            }
      }


      let value = {
           recognition,
           speaking,
           setSpeaking,prompt,
           setPrompt,response,setResponse
      }
  return (
    <>
      <dataContext.Provider value={value}>
            {children}
      </dataContext.Provider>
           
    </>
  )
}
