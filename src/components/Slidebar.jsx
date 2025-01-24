import  {useContext, useState} from "react";
import { IoMenu } from "react-icons/io5";
 import { FaHistory, FaPlus, FaQuestion } from "react-icons/fa";
 import { FaMessage } from "react-icons/fa6";
 import { IoIosSettings } from "react-icons/io";
import { Context } from "../context/Context";



const Slidebar = () => {
    const[extended,setExtended]=useState(false)
    const{onSent,prevPrompt,setRecentPrompt,newchat} =useContext(Context)
    const loadPrompt = async(prompt)=>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    }
  return (
    <div className="min-h-screen inline-flex flex-col justify-between bg-[#e4e7eb] px-[15px] py-[25px]">
      <div className="text-2xl block cursor-pointer">
        <IoMenu onClick={()=>setExtended(!extended)}/>
        <div  onclick={()=>newchat()}className="mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] text-gray-500  bg-gray-300 rounded-full">
          <FaPlus className="text-2xl"/>
          {extended &&<p>New Chat</p>}
        </div>
       {extended && (<div className="mt-5">
           <p> Recent </p>
           {prevPrompt?.map((item,index)=>{
            return(
              <div  onClick ={()=> loadPrompt(item)}  className="flex item-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
              <FaMessage className="text-2xl mt-2"/>
              <p>{item.slice(0,18)}...     </p>
  
              </div> 
            )
           })}
           
            </div>

)} 
      </div>  
      <div className="flex flex-col">
      <div className="flex item-center gap-4 p-2  rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
      <FaQuestion className="text-2xl" />
{    extended &&  <p>Help</p>}
      </div>

      <div className="flex item-center gap-4 p-2  rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
      <FaHistory className="text-2xl"/>

      {extended &&<p>History</p>}
      </div>

      <div className="flex item-center gap-4 p-2  rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
      <IoIosSettings className="text-3xl" />
      {extended &&<p>Settings</p>}
      </div>

      </div>

    </div>
  );
};

export default Slidebar;
