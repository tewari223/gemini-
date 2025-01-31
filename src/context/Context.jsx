import { createContext, useState } from "react";
import run from "../components/config/gemini";

export const Context =createContext()

const ContexProvider = (props) => {
 const [input,setInput] =useState("")
 const [recentPrompt,setRecentPrompt] =useState("")
 const [prevPrompt,setPrevPrompt] =useState([])
 const [showResult,setShowResult] =useState(false)
 const [loading,setLoading] =useState(false)
 const [result,setResultData] =useState("")
//   const delayPara =(index,nextWord) =>{}
 
const newchat =()=>{
   setLoading(false) 
setShowResult(false)}
    
    const onSent =  async(prompt) =>{
      setResultData("") 
      setLoading(true)
      setShowResult(true)
      setRecentPrompt(input) 
      setPrevPrompt((prev)=>[...prev,input])
       const response = await run(input) 
         //   let responseArray = response.split("**")
       setResultData(response) 
       setLoading(false)
       setInput("") 
    }

 const contextValue ={
    input,
    setInput,
    recentPrompt,
    setRecentPrompt, 
    prevPrompt,
    setPrevPrompt, 
    showResult,
    loading,
   result, 
   onSent,
   newchat,
 }
 return(
    <Context.Provider value ={contextValue}>{props.children}</Context.Provider>
 )
    
}
export default ContexProvider   