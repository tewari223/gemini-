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
//  const delayPara =(index,nextWord) =>{}
 

    
    const onSent =  async(prompt) =>{
      setResultData("") 
      setLoading(true)
      setShowResult(true)
      setRecentPrompt(input)
       const response = await run(prompt)
         //  let responseArray = response.split("**")
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
 }
 return(
    <Context.Provider value ={contextValue}>{props .children}</Context.Provider>
 )
    
}
export default ContexProvider 